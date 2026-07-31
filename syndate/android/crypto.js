/**
 * SynData 安卓端 - 加密模块
 * 
 * 说明：React Native 无内置 Node crypto。
 * 生产环境应使用 react-native-quick-crypto（同步 API，兼容 Node crypto 接口）。
 * 本文件提供与 shared/crypto.js 兼容的接口封装。
 */

// 尝试加载原生加密；失败时降级
let crypto;
try {
  crypto = require('react-native-quick-crypto');
} catch (e) {
  // 降级：无原生模块时抛错提示安装
  crypto = null;
}

const SALT = 'syndate';
const ITERATIONS = 100000;
const KEY_LEN = 32;

/**
 * PBKDF2 密钥派生（基于 quick-crypto）
 */
function deriveKey(roomCode) {
  if (!crypto) {
    throw new Error('需要安装 react-native-quick-crypto');
  }
  return crypto.pbkdf2Sync(roomCode, SALT, ITERATIONS, KEY_LEN, 'sha256');
}

/**
 * 加密文本 -> { content, iv, tag }（均 base64）
 */
export async function encryptText(plaintext, roomCode) {
  const key = deriveKey(roomCode);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  return {
    content: enc.toString('base64'),
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
  };
}

/**
 * 解密文本
 */
export async function decryptText(data, roomCode) {
  try {
    const key = deriveKey(roomCode);
    const iv = Buffer.from(data.iv, 'base64');
    const tag = Buffer.from(data.tag, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const dec = Buffer.concat([decipher.update(Buffer.from(data.content, 'base64')), decipher.final()]);
    return dec.toString('utf8');
  } catch (e) {
    return null; // 解密失败（房间码错误等）
  }
}

/**
 * 加密文件 buffer（base64 字符串形式传入）
 */
export async function encryptBuffer(b64Input, roomCode) {
  const key = deriveKey(roomCode);
  const iv = crypto.randomBytes(12);
  const buf = Buffer.from(b64Input, 'base64');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(buf), cipher.final()]);
  return {
    content: enc.toString('base64'),
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
  };
}

/**
 * 解密文件 buffer
 */
export async function decryptBuffer(encB64, ivB64, tagB64, roomCode) {
  const key = deriveKey(roomCode);
  const iv = Buffer.from(ivB64, 'base64');
  const tag = Buffer.from(tagB64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(Buffer.from(encB64, 'base64')), decipher.final()]);
  return dec.toString('base64');
}
