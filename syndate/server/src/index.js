/**
 * SynData 中转服务器
 * 
 * 职责：
 *  - 接收各端上传的「加密剪贴板」和「加密文件」
 *  - 临时存储（TTL 24h 自动清理）
 *  - 供其他设备轮询/拉取
 * 
 * 设计原则：
 *  - 无用户体系，纯中转
 *  - 不关心数据内容（端到端加密，服务器只存密文）
 *  - 内存存储（重启即清空），适合轻量同步
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 8787;
const TTL_MS = 24 * 60 * 60 * 1000; // 24 小时过期
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 单文件上限 500MB
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 每 10 分钟清理过期数据

// ─── 存储（内存 Map：roomCode -> { clipboard, files }） ───
// 结构：
//   rooms.set(code, {
//     clipboard: { content, iv, tag, updatedAt },  // 最新一条剪贴板（密文）
//     files: Map(fileId, { buffer, name, size, iv, tag, createdAt }),  // 文件列表
//   })
const rooms = new Map();

// ─── 文件上传（内存存储） ───
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});

app.use(express.json({ limit: '10mb' }));

// ─── 辅助函数 ───
function ensureRoom(code) {
  if (!rooms.has(code)) {
    rooms.set(code, { clipboard: null, files: new Map() });
  }
  return rooms.get(code);
}

function genFileId() {
  return crypto.randomBytes(8).toString('hex');
}

// ─── API ───

/**
 * 健康检查
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: Date.now(), rooms: rooms.size });
});

/**
 * 上传剪贴板（密文）
 * POST /api/clipboard
 * body: { room, content(base64密文), iv, tag }
 * 服务器存最新一条
 */
app.post('/api/clipboard', (req, res) => {
  const { room, content, iv, tag } = req.body || {};
  if (!room || !content || !iv || !tag) {
    return res.status(400).json({ error: '缺少必填字段' });
  }
  const r = ensureRoom(room);
  r.clipboard = { content, iv, tag, updatedAt: Date.now() };
  res.json({ ok: true, time: Date.now() });
});

/**
 * 拉取剪贴板（轮询）
 * GET /api/clipboard/:room
 * 返回最新一条密文；无则返回 null
 */
app.get('/api/clipboard/:room', (req, res) => {
  const r = rooms.get(req.params.room);
  if (!r || !r.clipboard) {
    return res.json({ ok: true, content: null });
  }
  res.json({
    ok: true,
    content: r.clipboard.content,
    iv: r.clipboard.iv,
    tag: r.clipboard.tag,
    updatedAt: r.clipboard.updatedAt,
  });
});

/**
 * 上传文件（密文）
 * POST /api/file
 * multipart/form-data: room, iv, tag, file(任意文件，内容为密文)
 * 返回 fileId
 */
app.post('/api/file', upload.single('file'), (req, res) => {
  const room = req.body.room;
  if (!room || !req.file) {
    return res.status(400).json({ error: '缺少 room 或文件' });
  }
  const r = ensureRoom(room);
  const fileId = genFileId();
  r.files.set(fileId, {
    buffer: req.file.buffer,
    name: req.file.originalname,
    iv: req.body.iv || '',
    tag: req.body.tag || '',
    size: req.file.size,
    createdAt: Date.now(),
  });
  res.json({ ok: true, fileId, name: req.file.originalname, size: req.file.size });
});

/**
 * 获取文件列表
 * GET /api/files/:room
 */
app.get('/api/files/:room', (req, res) => {
  const r = rooms.get(req.params.room);
  if (!r) {
    return res.json({ ok: true, files: [] });
  }
  const files = [...r.files.entries()].map(([id, f]) => ({
    fileId: id,
    name: f.name,
    size: f.size,
    iv: f.iv,
    tag: f.tag,
    createdAt: f.createdAt,
  }));
  res.json({ ok: true, files });
});

/**
 * 下载文件
 * GET /api/file/:room/:fileId
 * 返回密文文件
 */
app.get('/api/file/:room/:fileId', (req, res) => {
  const r = rooms.get(req.params.room);
  if (!r) {
    return res.status(404).json({ error: '房间不存在' });
  }
  const f = r.files.get(req.params.fileId);
  if (!f) {
    return res.status(404).json({ error: '文件不存在' });
  }
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(f.name)}`);
  res.setHeader('X-File-Name', encodeURIComponent(f.name));
  res.send(f.buffer);
});

/**
 * 删除文件（拉取后可选清理）
 * DELETE /api/file/:room/:fileId
 */
app.delete('/api/file/:room/:fileId', (req, res) => {
  const r = rooms.get(req.params.room);
  if (r) {
    r.files.delete(req.params.fileId);
  }
  res.json({ ok: true });
});

// ─── TTL 清理任务 ───
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms.entries()) {
    let expired = false;
    // 剪贴板 TTL
    if (room.clipboard && now - room.clipboard.updatedAt > TTL_MS) {
      room.clipboard = null;
      expired = true;
    }
    // 文件 TTL
    for (const [id, f] of room.files.entries()) {
      if (now - f.createdAt > TTL_MS) {
        room.files.delete(id);
        expired = true;
      }
    }
    // 空房间删除
    if (!room.clipboard && room.files.size === 0) {
      rooms.delete(code);
    }
  }
}, CLEANUP_INTERVAL);

// ─── 启动 ───
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SynData] 中转服务已启动: http://0.0.0.0:${PORT}`);
  console.log(`[SynData] TTL: 24h | 内存存储 | 端到端加密(服务器只存密文)`);
});
