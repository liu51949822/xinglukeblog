/**
 * SynData 共享加密模块（AES-256-GCM）
 * 
 * 可被桌面端（Electron main 进程 / Node）和安卓端（通过加密模块封装）复用。
 * 浏览器/RN 环境请参照此逻辑用 WebCrypto 或 react-native-quick-crypto 实现。
 */

const crypto = require('crypto');

const SALT = 'syndate';
const ITERATIONS = 100000;
const KEY_LEN = 32;
const ALGO = 'aes-256-gcm';
const IV_LEN = 12;
const TAG_LEN = 16;

/**
 * 由房间码派生 32 字节密钥
 * @param {string} roomCode
 * @returns {Buffer}
 */
function deriveKey(roomCode) {
  return crypto.pbkdf2Sync(roomCode, SALT, ITERATIONS, KEY_LEN, 'sha256');
}

/**
 * 加密文本
 * @param {string} plaintext
 * @param {string} roomCode
 * @returns {{ content: string, iv: string, tag: string }} base64 密文/iv/tag
 */
function encryptText(plaintext, roomCode) {
  const key = deriveKey(roomCode);
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  return {
    content: enc.toString('base64'),
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
  };
}

/**
 * 解密文本
 * @param {{ content: string, iv: string, tag: string }} data
 * @param {string} roomCode
 * @returns {string} 明文
 */
function decryptText(data, roomCode) {
  const key = deriveKey(roomCode);
  const iv = Buffer.from(data.iv, 'base64');
  const tag = Buffer.from(data.tag, 'base64');
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(Buffer.from(data.content, 'base64')), decipher.final()]);
  return dec.toString('utf8');
}

/**
 * 加密 Buffer（文件）
 * @param {Buffer} buf
 * @param {string} roomCode
 * @returns {{ buf: Buffer, iv: Buffer, tag: Buffer }}
 */
function encryptBuffer(buf, roomCode) {
  const key = deriveKey(roomCode);
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(buf), cipher.final()]);
  return { buf: enc, iv, tag: cipher.getAuthTag() };
}

/**
 * 解密 Buffer（文件）
 * @param {Buffer} encBuf
 * @param {Buffer} iv
 * @param {Buffer} tag
 * @param {string} roomCode
 * @returns {Buffer}
 */
function decryptBuffer(encBuf, iv, tag, roomCode) {
  const key = deriveKey(roomCode);
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encBuf), decipher.final()]);
}

module.exports = {
  deriveKey,
  encryptText,
  decryptText,
  encryptBuffer,
  decryptBuffer,
};
