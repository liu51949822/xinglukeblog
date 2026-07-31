# SynData 数据同步工具

> 跨设备端到端加密的数据同步小工具：剪贴板 + 文件。服务器仅做中转，只存密文。

## 特点

- 🔒 **端到端加密**：AES-256-GCM，房间码派生密钥，**服务器无法解密任何数据**
- 📋 **剪贴板同步**：手机 ⇆ 电脑，复制粘贴即同步
- 📁 **文件传输**：跨设备传文件，加密上传/解密下载
- ⏱️ **TTL 自动清理**：数据 24 小时后自动删除
- 🚫 **无用户体系**：房间码隔离，即连即用
- 🌐 **任意网络**：公网服务器中转，多端随时同步

## 架构

```
┌────────────┐         ┌──────────────────────┐         ┌────────────┐
│  安卓端 RN   │         │   服务器 (Node 中转)   │         │  桌面端      │
│            │◄───────►│  只存 AES 密文 + TTL  │◄───────►│  Electron   │
│ 传文件/粘贴  │  轮询    │  无解密能力            │  轮询    │  传文件/粘贴  │
└────────────┘         └──────────────────────┘         └────────────┘
      ▲                                                   ▲
      └─────────────── 同一房间码 = 同一密钥 ───────────────┘
```

## 目录结构

```
syndate/
├── server/          # 中转服务器（Node + Express）
│   └── src/index.js
├── desktop/         # 桌面端（Electron + 原生 HTML/JS）
│   ├── main.js
│   ├── preload.js
│   └── renderer/
├── android/         # 安卓端（React Native + Expo）
│   ├── App.js
│   └── crypto.js
├── shared/
│   └── crypto.js    # 共享加密模块（Node/Electron 用）
└── docs/
    └── crypto-spec.md  # 加密规范
```

## 快速开始

### 1. 部署服务器

```bash
cd server
npm install
npm start   # 监听 0.0.0.0:8787
```

放到你的公网服务器（或 docker 运行），记下地址 `http://<服务器IP>:8787`。

### 2. 桌面端

```bash
cd desktop
npm install
npm start   # 启动 Electron
```

设置中填写服务器地址 + 房间码（如 `Ab12Cd`），连接后即可同步剪贴板和传文件。

### 3. 安卓端

```bash
cd android
npm install
npx expo start
```

用 Expo Go 扫码运行，填写相同的服务器地址 + 房间码。

> **房间码即加密密钥**：两端必须使用相同房间码才能解密；建议 6 位以上含大小写数字。

## 使用场景

| 场景 | 操作 |
|------|------|
| 手机上复制文本 → 电脑粘贴 | 手机「推送剪贴板」→ 电脑自动/手动「拉取」 |
| 电脑复制 → 手机粘贴 | 电脑「推送」→ 手机 2 秒内自动同步 |
| 手机传文件给电脑 | 手机「选择文件上传」→ 电脑列表「下载」 |
| 电脑传文件给手机 | 电脑「选择文件上传」→ 手机点文件下载/分享 |

## 安全说明

- 房间码即 AES 密钥，选强一点的房间码
- 服务器只存密文 + 无法解密；即便服务器被入侵也看不到内容
- 所有数据 24h 自动清理
- 单文件上限 500MB

## CI/CD 自动化

项目提供 3 条 GitHub Actions 工作流（触发条件为 push 到 `syndate/` 目录）：

| 工作流 | 触发 | 产物 |
|--------|------|------|
| `syndate-server-deploy.yml` | push 服务器代码 | 自动部署到服务器 |
| `syndate-desktop-build.yml` | push 桌面端代码 + 打 tag | 桌面安装包 (exe/dmg/AppImage) |
| `syndate-android-build.yml` | push 安卓端代码 + 打 tag | 安卓 APK |

### 服务器自动部署（Secrets 配置）

仓库 `Settings → Secrets and variables → Actions` 添加：

| Secret | 说明 |
|--------|------|
| `SERVER_HOST` | 服务器公网 IP |
| `SERVER_USER` | SSH 用户名 |
| `SERVER_PASSWORD` | SSH 密码 |
| `SERVER_PORT` | SSH 端口（默认 22） |

push 服务器代码后自动执行：SSH 连接服务器 → 拉取/同步代码 → 安装依赖 → 重启服务。

### 客户端打包（Tag 触发）

打 tag 触发打包，例如：

```bash
git tag v1.0.0 && git push origin v1.0.0
```

构建产物可在 Actions 页面 Artifacts 中下载：
- **桌面端**：Windows `.exe`、macOS `.dmg`、Linux `.AppImage`
- **安卓端**：`syndate.apk`

## 文档

- [加密规范](docs/crypto-spec.md) — AES-256-GCM 密钥派生与数据格式
- [服务器 API](server/README.md) — 中转服务 API 与部署
- [CI/CD 工作流说明](docs/ci-cd.md) — 自动化部署与打包详情
