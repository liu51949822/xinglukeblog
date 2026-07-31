/**
 * SynData 网页端加密模块（crypto-js 浏览器版）
 * 
 * 与桌面端 / 安卓端算法完全一致：
 * 密钥派生：PBKDF2-SHA256(roomCode, salt='syndate', 100000, 256bit)
 * 加密：AES-256-CBC + 随机 IV
 * 保证跨端互通解密。
 */

import CryptoJS from 'crypto-js';

const SALT = 'syndate';
const ITERATIONS = 100000;
const KEY_LEN = 32;

function deriveKey(roomCode) {
  return CryptoJS.PBKDF2(roomCode, SALT, {
    keySize: KEY_LEN / 4,
    iterations: ITERATIONS,
    hasher: CryptoJS.algo.SHA256,
  });
}

export function encryptText(plaintext, roomCode) {
  const key = deriveKey(roomCode);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return {
    content: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: iv.toString(CryptoJS.enc.Base64),
  };
}

export function decryptText(data, roomCode) {
  try {
    const key = deriveKey(roomCode);
    const iv = CryptoJS.enc.Base64.parse(data.iv);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(data.content) },
      key,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    const text = decrypted.toString(CryptoJS.enc.Utf8);
    return text || null;
  } catch (e) {
    return null;
  }
}

// 文件加密：输入/输出均为 base64 字符串（浏览器环境处理方便）
export function encryptBase64(b64Input, roomCode) {
  const key = deriveKey(roomCode);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(b64Input, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return {
    content: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    iv: iv.toString(CryptoJS.enc.Base64),
  };
}

export function decryptBase64(encB64, ivB64, roomCode) {
  try {
    const key = deriveKey(roomCode);
    const iv = CryptoJS.enc.Base64.parse(ivB64);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(encB64) },
      key,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    const text = decrypted.toString(CryptoJS.enc.Base64);
    return text || null;
  } catch (e) {
    return null;
  }
}

export { CryptoJS };
