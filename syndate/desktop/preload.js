/**
 * SynData 桌面端 - Preload 脚本
 * 通过 contextBridge 暴露安全的 IPC 接口给渲染进程
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('syndate', {
  // 剪贴板
  clipboardRead: () => ipcRenderer.invoke('clipboard:read'),
  clipboardWrite: (text) => ipcRenderer.invoke('clipboard:write', text),

  // 加密
  encrypt: (text, room) => ipcRenderer.invoke('crypto:encrypt', text, room),
  decrypt: (data, room) => ipcRenderer.invoke('crypto:decrypt', data, room),

  // 文件
  pickEncrypt: (room) => ipcRenderer.invoke('file:pickEncrypt', room),
  decryptSave: (enc, iv, room, name) => ipcRenderer.invoke('file:decryptSave', enc, iv, room, name),

  // 设置
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (s) => ipcRenderer.invoke('settings:set', s),
});
