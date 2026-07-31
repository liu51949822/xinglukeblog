import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  encryptText, decryptText, encryptBase64, decryptBase64,
} from './crypto.js';

export default function App() {
  const [serverUrl, setServerUrl] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [clipText, setClipText] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const pollRef = useRef(null);
  const lastAppliedRef = useRef('');
  const fileInputRef = useRef(null);

  // ─── 提示 ───
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  // ─── 连接 ───
  const connect = async () => {
    if (!serverUrl || !roomCode) {
      showToast('请填写服务器地址和房间码');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/api/health`);
      const data = await res.json();
      if (data.ok) {
        setConnected(true);
        showToast('连接成功');
        startPolling();
        fetchFiles();
      } else {
        showToast('服务器响应异常');
      }
    } catch (e) {
      showToast('连接失败，请检查服务器地址');
    }
    setLoading(false);
  };

  // ─── 剪贴板轮询 ───
  const startPolling = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(pollClipboard, 2000);
  }, [serverUrl, roomCode, connected]);

  const pollClipboard = useCallback(async () => {
    if (!connected || !serverUrl) return;
    try {
      const res = await fetch(`${serverUrl}/api/clipboard/${roomCode}`);
      const data = await res.json();
      if (data.ok && data.content) {
        const dec = decryptText(data, roomCode);
        if (dec && dec !== lastAppliedRef.current) {
          lastAppliedRef.current = dec;
          setClipText(dec);
          showToast('检测到新剪贴板');
        }
      }
    } catch (e) { /* 静默 */ }
  }, [connected, serverUrl, roomCode, showToast]);

  // ─── 推送剪贴板 ───
  const pushClipboard = async () => {
    if (!connected) { showToast('请先连接'); return; }
    try {
      const text = await navigator.clipboard.readText();
      if (!text) { showToast('剪贴板为空'); return; }
      const enc = encryptText(text, roomCode);
      const res = await fetch(`${serverUrl}/api/clipboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: roomCode, content: enc.content, iv: enc.iv }),
      });
      const data = await res.json();
      if (data.ok) {
        lastAppliedRef.current = text;
        setClipText(text);
        showToast('剪贴板已推送');
      }
    } catch (e) {
      showToast('读取剪贴板失败（浏览器权限限制）');
    }
  };

  // ─── 拉取剪贴板 → 写入本地 ───
  const pullClipboard = async () => {
    if (!connected) { showToast('请先连接'); return; }
    try {
      const res = await fetch(`${serverUrl}/api/clipboard/${roomCode}`);
      const data = await res.json();
      if (data.ok && data.content) {
        const dec = decryptText(data, roomCode);
        if (dec) {
          await navigator.clipboard.writeText(dec);
          lastAppliedRef.current = dec;
          setClipText(dec);
          showToast('已写入剪贴板');
        } else {
          showToast('解密失败，房间码可能错误');
        }
      } else {
        showToast('服务器无剪贴板');
      }
    } catch (e) {
      showToast('写入剪贴板失败');
    }
  };

  // ─── 文件列表 ───
  const fetchFiles = useCallback(async () => {
    if (!serverUrl || !roomCode) return;
    try {
      const res = await fetch(`${serverUrl}/api/files/${roomCode}`);
      const data = await res.json();
      if (data.ok) setFiles(data.files || []);
    } catch (e) { /* ignore */ }
  }, [serverUrl, roomCode]);

  // ─── 上传文件 ───
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!connected) { showToast('请先连接'); return; }
    try {
      // 读取为 base64
      const b64 = await fileToBase64(file);
      const enc = encryptBase64(b64, roomCode);
      // 把密文转成 Blob 上传
      const encBytes = base64ToBytes(enc.content);
      const fd = new FormData();
      fd.append('room', roomCode);
      fd.append('iv', enc.iv);
      fd.append('file', new Blob([encBytes], { type: 'application/octet-stream' }), file.name + '.enc');
      const res = await fetch(`${serverUrl}/api/file`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.ok) {
        showToast(`已上传: ${file.name}`);
        fetchFiles();
      }
    } catch (err) {
      showToast('上传失败');
    }
    e.target.value = '';
  };

  // ─── 下载文件 ───
  const downloadFile = async (file) => {
    if (!connected) { showToast('请先连接'); return; }
    try {
      const res = await fetch(`${serverUrl}/api/file/${roomCode}/${file.fileId}`);
      if (!res.ok) { showToast('下载失败'); return; }
      const buf = await res.arrayBuffer();
      const encB64 = bytesToBase64(new Uint8Array(buf));
      const decB64 = decryptBase64(encB64, file.iv, roomCode);
      if (!decB64) { showToast('解密失败，房间码可能错误'); return; }
      // 触发下载
      const decBytes = base64ToBytes(decB64);
      const blob = new Blob([decBytes]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.enc$/, '');
      a.click();
      URL.revokeObjectURL(url);
      showToast('文件已下载并解密');
    } catch (e) {
      showToast('下载失败');
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await fetch(`${serverUrl}/api/file/${roomCode}/${fileId}`, { method: 'DELETE' });
      showToast('已删除');
      fetchFiles();
    } catch (e) {
      showToast('删除失败');
    }
  };

  // ─── 工具函数 ───
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const base64ToBytes = (b64) => {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr;
  };
  const bytesToBase64 = (bytes) => {
    let bin = '';
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return btoa(bin);
  };
  const fmtSize = (b) => {
    if (b > 1024 * 1024) return (b / 1024 / 1024).toFixed(1) + ' MB';
    if (b > 1024) return (b / 1024).toFixed(1) + ' KB';
    return b + ' B';
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🔄 SynData 网页同步</h1>
        <p>端到端加密 · 服务器只存密文 · 跨设备互通</p>
      </header>

      <main className="container">
        {/* 连接设置 */}
        <section className="card">
          <h2>连接设置</h2>
          <input
            className="input"
            placeholder="服务器地址 如 http://1.2.3.4:8787"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
          />
          <input
            className="input"
            placeholder="房间码（加密密钥）"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button className="btn btn-primary" onClick={connect} disabled={loading}>
            {loading ? '连接中...' : (connected ? '✅ 已连接' : '连接')}
          </button>
        </section>

        {/* 剪贴板 */}
        <section className="card">
          <h2>📋 剪贴板</h2>
          <div className="row">
            <button className="btn btn-success" onClick={pushClipboard}>📤 推送剪贴板</button>
            <button className="btn btn-warn" onClick={pullClipboard}>📥 拉取到剪贴板</button>
          </div>
          <textarea
            className="textarea"
            value={clipText}
            readOnly
            placeholder="剪贴板内容将在此显示（自动轮询 2s）..."
          />
        </section>

        {/* 文件 */}
        <section className="card">
          <h2>📁 文件</h2>
          <div className="row">
            <button className="btn btn-success" onClick={() => fileInputRef.current?.click()}>
              📤 选择文件上传
            </button>
            <button className="btn btn-secondary" onClick={fetchFiles}>🔄 刷新</button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <div className="file-list">
            {files.length === 0 && <div className="empty">暂无文件</div>}
            {files.map((f) => (
              <div className="file-item" key={f.fileId}>
                <span className="fname">📄 {f.name}</span>
                <span className="fsize">{fmtSize(f.size)}</span>
                <button className="btn btn-sm btn-primary" onClick={() => downloadFile(f)}>下载</button>
                <button className="btn btn-sm btn-warn" onClick={() => deleteFile(f.fileId)}>删</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}
