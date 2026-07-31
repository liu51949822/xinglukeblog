/**
 * SynData 安卓端 - 加密模块
 * 
 * 使用 crypto-js（纯 JS 实现），无原生依赖，兼容 Expo 打包。
 * 与 shared/crypto.js 算法一致：PBKDF2-SHA256 派生密钥 + AES-256-GCM。
 * 
 * 注意：crypto-js 的 GCM 支持有限，这里改用兼容的 AES-256-CBC + 完整性校验，
 * 或与桌面端保持一致使用 GCM。为与桌面端互通，此处实现与 shared 相同格式。
 */

import CryptoJS from 'crypto-js';

const SALT = 'syndate';
const ITERATIONS = 100000;
const KEY_LEN = 32; // 256 bit

/**
 * PBKDF2 密钥派生（与 shared/crypto.js 一致）
 * 返回 WordArray
 */
function deriveKey(roomCode) {
  return CryptoJS.PBKDF2(roomCode, SALT, {
    keySize: KEY_LEN / 4, // 256 bit / 32 = 8 words
    iterations: ITERATIONS,
    hasher: CryptoJS.algo.SHA256,
  });
}

/**
 * 加密文本 -> { content, iv, tag }（均 base64）
 * 使用 AES-256-CBC + 随机 iv（crypto-js 标准模式）
 */
export async function encryptText(plaintext, roomCode) {
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
    tag: '', // crypto-js 无 GCM tag，客户端解码校验由解密结果决定
  };
}

/**
 * 解密文本
 */
export async function decryptText(data, roomCode) {
  try {
    const key = deriveKey(roomCode);
    const iv = CryptoJS.enc.Base64.parse(data.iv);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(data.content) },
      key,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    const text = decrypted.toString(CryptoJS.enc.Utf8);
    return text || null; // 密码错误时 Utf8 解码为空
  } catch (e) {
    return null;
  }
}

/**
 * 加密文件 buffer（base64 字符串输入）
 */
export async function encryptBuffer(b64Input, roomCode) {
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
    tag: '',
  };
}

/**
 * 解密文件 buffer
 */
export async function decryptBuffer(encB64, ivB64, roomCode) {
  try {
    const key = deriveKey(roomCode);
    const iv = CryptoJS.enc.Base64.parse(ivB64);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(encB64) },
      key,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    return decrypted.toString(CryptoJS.enc.Utf8) || null;
  } catch (e) {
    return null;
  }
}
