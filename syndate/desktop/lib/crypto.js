/**
 * SynData 共享加密模块（AES-256-CBC，兼容桌面端/安卓端）
 * 
 * 使用 crypto-js（纯 JS），桌面端和安卓端算法完全一致。
 * 密钥派生：PBKDF2-SHA256(roomCode, salt='syndate', 100000)
 * 加密：AES-256-CBC + 随机 IV
 * 
 * 注意：crypto-js 不支持 GCM，故统一使用 CBC 以保证跨端互通。
 */

const CryptoJS = require('crypto-js');

const SALT = 'syndate';
const ITERATIONS = 100000;
const KEY_LEN = 32; // 256 bit

/**
 * 由房间码派生密钥
 */
function deriveKey(roomCode) {
  return CryptoJS.PBKDF2(roomCode, SALT, {
    keySize: KEY_LEN / 4,
    iterations: ITERATIONS,
    hasher: CryptoJS.algo.SHA256,
  });
}

/**
 * 加密文本 -> { content, iv, tag }（base64）
 */
function encryptText(plaintext, roomCode) {
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
    tag: '',
  };
}

/**
 * 解密文本
 */
function decryptText(data, roomCode) {
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

/**
 * 加密 Buffer（文件） -> { buf, iv }
 */
function encryptBuffer(buf, roomCode) {
  const key = deriveKey(roomCode);
  const iv = CryptoJS.lib.WordArray.random(16);
  const wordArray = CryptoJS.lib.WordArray.create(buf);
  const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return {
    buf: Buffer.from(encrypted.ciphertext.toString(CryptoJS.enc.Base64), 'base64'),
    iv: Buffer.from(iv.toString(CryptoJS.enc.Base64), 'base64'),
  };
}

/**
 * 解密 Buffer（文件）
 */
function decryptBuffer(encBuf, iv, roomCode) {
  try {
    const key = deriveKey(roomCode);
    const ivWA = CryptoJS.lib.WordArray.create(iv);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.lib.WordArray.create(encBuf) },
      key,
      { iv: ivWA, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    return Buffer.from(decrypted.toString(CryptoJS.enc.Base64), 'base64');
  } catch (e) {
    throw new Error('解密失败');
  }
}

module.exports = {
  deriveKey,
  encryptText,
  decryptText,
  encryptBuffer,
  decryptBuffer,
};
