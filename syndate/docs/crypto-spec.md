# SynData 端到端加密规范

所有设备使用同一套 **AES-256-CBC** 加密（crypto-js 纯 JS 实现），**服务器只能看到密文**，无法解密内容。

> 说明：为兼容安卓端（React Native 无内置 Node crypto，且 GCM 库兼容性差），统一采用
> crypto-js 的 AES-CBC。桌面端（Electron）与安卓端算法完全一致，可互通解密。

## 密钥派生

房间码（6 位字母数字）通过 PBKDF2 派生为 32 字节密钥：

```
key = PBKDF2(roomCode, salt="syndate", iterations=100000, keylen=256bit, hash=SHA256)
```

## 加密格式

明文（剪贴板文本或文件字节）加密后：

| 字段 | 说明 |
|------|------|
| `iv` | 16 字节随机初始向量（base64） |
| `content` | 密文（base64） |

```
ciphertext = AES-256-CBC(plaintext, key, iv)
```

## API 对接

### 剪贴板
- 上传：`POST /api/clipboard` body: `{ room, content, iv }`
- 拉取：`GET /api/clipboard/:room` → `{ content, iv, updatedAt }`

### 文件
- 上传：`POST /api/file` multipart（file 字段为已加密字节 + `iv` 表单字段）
- 列表：`GET /api/files/:room` → 含 `iv` 字段
- 下载：`GET /api/file/:room/:fileId` → 密文字节，`iv` 从列表获取

## 客户端要点

1. 设备输入房间码 → 派生密钥（无需联网）
2. 剪贴板：写入时加密上传；轮询拉取后解密比对，变化则写入本地剪贴板
3. 文件：选择文件 → 加密 → 上传；下载 → 解密 → 保存

## 安全性说明

- 房间码即密钥，**不要用弱码**（建议 6 位以上且含大小写数字）
- 服务器在 TTL(24h) 后自动清空所有数据
- AES-CBC 无认证标签，主动攻击者可能篡改密文（服务器被入侵场景）；
  如需更高安全等级请升级为 GCM 并保证两端实现一致
- 适合非敏感或低敏感数据的便捷同步；高敏感数据请额外端到端验证
