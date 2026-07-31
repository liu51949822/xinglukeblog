/**
 * SynData 桌面端 - Electron 主进程
 * 
 * 职责：
 *  - 创建窗口
 *  - 剪贴板读写（IPC）
 *  - 加密/解密（Node crypto，复用 shared/crypto.js）
 *  - 文件对话框 + 保存
 */

const { app, BrowserWindow, ipcMain, clipboard, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Store = require('electron-store');

const store = new Store();
const cryptoUtil = require('../shared/crypto.js');

let mainWindow = null;

// ─── 读取剪贴板文本 ───
ipcMain.handle('clipboard:read', () => {
  return clipboard.readText();
});

// ─── 写入剪贴板 ───
ipcMain.handle('clipboard:write', (event, text) => {
  clipboard.writeText(String(text));
  return true;
});

// ─── 读取本地剪贴板（内部调用） ───
ipcMain.handle('clipboard:localRead', () => clipboard.readText());

// ─── 加密文本 ───
ipcMain.handle('crypto:encrypt', (event, plaintext, room) => {
  return cryptoUtil.encryptText(plaintext, room);
});

// ─── 解密文本 ───
ipcMain.handle('crypto:decrypt', (event, data, room) => {
  try {
    return { ok: true, text: cryptoUtil.decryptText(data, room) };
  } catch (e) {
    return { ok: false, error: '解密失败，房间码可能不正确' };
  }
});

// ─── 选择文件并加密（返回加密字节 + 元数据） ───
ipcMain.handle('file:pickEncrypt', async (event, room) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
  });
  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true };
  }
  const filePath = result.filePaths[0];
  const buf = fs.readFileSync(filePath);
  const enc = cryptoUtil.encryptBuffer(buf, room);
  const name = path.basename(filePath);
  return {
    canceled: false,
    name,
    size: buf.length,
    data: enc.buf.toString('base64'),
    iv: enc.iv.toString('base64'),
    tag: enc.tag.toString('base64'),
  };
});

// ─── 解密文件并保存 ───
ipcMain.handle('file:decryptSave', async (event, encData, ivB64, tagB64, room, defaultName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName || 'download.bin',
  });
  if (result.canceled || !result.filePath) {
    return { canceled: true };
  }
  try {
    const dec = cryptoUtil.decryptBuffer(
      Buffer.from(encData, 'base64'),
      Buffer.from(ivB64, 'base64'),
      Buffer.from(tagB64, 'base64'),
      room
    );
    fs.writeFileSync(result.filePath, dec);
    return { canceled: false, saved: result.filePath };
  } catch (e) {
    return { canceled: false, error: '解密失败，房间码可能不正确' };
  }
});

// ─── 持久化设置 ───
ipcMain.handle('settings:get', () => ({
  serverUrl: store.get('serverUrl', ''),
  roomCode: store.get('roomCode', ''),
}));
ipcMain.handle('settings:set', (event, { serverUrl, roomCode }) => {
  if (serverUrl) store.set('serverUrl', serverUrl);
  if (roomCode) store.set('roomCode', roomCode);
  return true;
});

// ─── 创建窗口 ───
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 680,
    title: 'SynData 数据同步',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
