/**
 * SynData 桌面端 - 渲染进程逻辑
 * 轮询剪贴板 + 文件传输 + 端到端加密
 */

const api = window.syndate;

let settings = { serverUrl: '', roomCode: '' };
let pollTimer = null;
let lastPushedContent = '';   // 最近推送的明文（避免回环）
let lastAppliedContent = '';  // 最近应用的明文（避免重复写剪贴板）

// ─── 工具 ───
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

async function init() {
  settings = await api.getSettings();
  document.getElementById('setServer').value = settings.serverUrl;
  document.getElementById('setRoom').value = settings.roomCode;
  if (settings.serverUrl && settings.roomCode) {
    await connect();
  }
}

function fmtSize(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  if (bytes > 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

// ─── 连接 ───
async function connect() {
  if (!settings.serverUrl || !settings.roomCode) {
    toast('请先在设置中配置服务器和房间码');
    return;
  }
  try {
    const res = await fetch(settings.serverUrl + '/api/health');
    const data = await res.json();
    if (data.ok) {
      document.getElementById('connStatus').textContent = '✅ 已连接';
      document.getElementById('connStatus').className = 'status ok';
      document.getElementById('connInfo').textContent = `服务器: ${settings.serverUrl} · 房间: ${settings.roomCode}`;
      toast('连接成功');
      startPolling();
      refreshFiles();
    } else {
      throw new Error('health failed');
    }
  } catch (e) {
    document.getElementById('connStatus').textContent = '❌ 连接失败';
    document.getElementById('connStatus').className = 'status err';
    toast('连接失败，请检查服务器地址');
  }
}

function startPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(pollClipboard, 2000); // 每 2 秒轮询
}

// ─── 剪贴板 ───
async function pushClipboard() {
  try {
    const text = await api.clipboardRead();
    if (!text) { toast('剪贴板为空'); return; }
    const enc = await api.encrypt(text, settings.roomCode);
    const res = await fetch(settings.serverUrl + '/api/clipboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room: settings.roomCode, content: enc.content, iv: enc.iv, tag: enc.tag }),
    });
    const data = await res.json();
    if (data.ok) {
      lastPushedContent = text;
      document.getElementById('clipPreview').value = text;
      document.getElementById('clipStatus').textContent = '✅ 已推送';
      document.getElementById('clipStatus').className = 'status ok';
      toast('剪贴板已推送');
    }
  } catch (e) {
    document.getElementById('clipStatus').textContent = '❌ 推送失败';
    document.getElementById('clipStatus').className = 'status err';
  }
}

async function pullClipboard() {
  const result = await applyLatestClipboard(true);
  return result;
}

async function pollClipboard() {
  await applyLatestClipboard(false);
}

async function applyLatestClipboard(manual) {
  if (!settings.serverUrl) return;
  try {
    const res = await fetch(settings.serverUrl + '/api/clipboard/' + settings.roomCode);
    const data = await res.json();
    if (data.ok && data.content) {
      const dec = await api.decrypt(data, settings.roomCode);
      if (dec.ok && dec.text && dec.text !== lastAppliedContent && dec.text !== lastPushedContent) {
        await api.clipboardWrite(dec.text);
        lastAppliedContent = dec.text;
        document.getElementById('clipPreview').value = dec.text;
        document.getElementById('clipStatus').textContent = manual ? '✅ 已拉取' : '🔄 检测到新剪贴板';
        document.getElementById('clipStatus').className = 'status ok';
        if (manual) toast('剪贴板已拉取');
      } else if (manual) {
        document.getElementById('clipStatus').textContent = 'ℹ️ 无新内容';
        document.getElementById('clipStatus').className = '';
      }
    } else if (manual) {
      document.getElementById('clipStatus').textContent = 'ℹ️ 服务器无剪贴板';
      document.getElementById('clipStatus').className = '';
    }
  } catch (e) {
    // 静默失败，轮询时忽略
  }
}

// ─── 文件 ───
async function uploadFile() {
  if (!settings.serverUrl || !settings.roomCode) { toast('请先连接'); return; }
  const result = await api.pickEncrypt(settings.roomCode);
  if (!result || result.canceled) return;
  if (result.error) { toast(result.error); return; }

  try {
    // 把密文作为文件上传，附带 iv/tag
    const encBytes = atob(result.data);
    const blob = new Blob([new Uint8Array(encBytes.length).map((_, i) => encBytes.charCodeAt(i))], { type: 'application/octet-stream' });
    const fd = new FormData();
    fd.append('room', settings.roomCode);
    fd.append('iv', result.iv);

    fd.append('file', blob, result.name + '.enc');
    const res = await fetch(settings.serverUrl + '/api/file', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.ok) {
      toast(`已上传: ${result.name}`);
      refreshFiles();
    }
  } catch (e) {
    toast('上传失败');
  }
}

async function refreshFiles() {
  if (!settings.serverUrl) return;
  try {
    const res = await fetch(settings.serverUrl + '/api/files/' + settings.roomCode);
    const data = await res.json();
    const list = document.getElementById('fileList');
    if (!data.files || data.files.length === 0) {
      list.innerHTML = '<div class="status">暂无文件</div>';
      return;
    }
    list.innerHTML = '';
    data.files.forEach(f => {
      const div = document.createElement('div');
      div.className = 'file-item';
      div.innerHTML = `
        <span class="fname">📄 ${escapeHtml(f.name)}</span>
        <span class="fsize">${fmtSize(f.size)}</span>
        <button class="btn btn-sm btn-primary" onclick="downloadFile('${f.fileId}','${escapeHtml(f.name)}','${f.iv}')">下载</button>
        <button class="btn btn-sm btn-warn" onclick="deleteFile('${f.fileId}')">删</button>
      `;
      list.appendChild(div);
    });
  } catch (e) { /* ignore */ }
}

async function downloadFile(fileId, name, iv) {
  try {
    const res = await fetch(settings.serverUrl + '/api/file/' + settings.roomCode + '/' + fileId);
    if (!res.ok) { toast('下载失败'); return; }
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    const encB64 = btoa(bin);

    const result = await api.decryptSave(encB64, iv, settings.roomCode, name.replace(/\.enc$/, ''));
    if (result.canceled) return;
    if (result.error) toast(result.error);
    else toast('已保存: ' + result.saved);
  } catch (e) {
    toast('下载失败');
  }
}

async function deleteFile(fileId) {
  try {
    await fetch(settings.serverUrl + '/api/file/' + settings.roomCode + '/' + fileId, { method: 'DELETE' });
    toast('已删除');
    refreshFiles();
  } catch (e) { toast('删除失败'); }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ─── 设置 ───
function openSettings() {
  document.getElementById('setServer').value = settings.serverUrl;
  document.getElementById('setRoom').value = settings.roomCode;
  document.getElementById('settingsDialog').classList.remove('hidden');
}
function closeSettings() {
  document.getElementById('settingsDialog').classList.add('hidden');
}
async function saveSettings() {
  settings.serverUrl = document.getElementById('setServer').value.trim();
  settings.roomCode = document.getElementById('setRoom').value.trim();
  await api.setSettings(settings);
  closeSettings();
  if (pollTimer) clearInterval(pollTimer);
  await connect();
}

init();
