# SynData CI/CD 说明

仓库内置 3 条 GitHub Actions 工作流，分别处理服务器部署、桌面端打包、安卓端打包。

## 工作流清单

### 1. 服务器自动部署 (`syndate-server-deploy.yml`)

**触发**：push 到 `syndate/server/` 目录（synDate 分支）或手动触发

**流程**：
1. 在 GitHub 云端安装依赖
2. 打包 `package.json` + `src/` 为 tar.gz
3. SCP 上传到服务器 `/opt/syndate/`
4. SSH 解压 + `npm install` + 启动/重启 Docker 容器 `syndate`（端口 8787）

**依赖 Secrets**：

| Secret | 说明 |
|--------|------|
| `SERVER_HOST` | 服务器公网 IP |
| `SERVER_USER` | SSH 用户名 |
| `SERVER_PASSWORD` | SSH 密码 |
| `SERVER_PORT` | SSH 端口 |

### 2. 桌面端打包 (`syndate-desktop-build.yml`)

**触发**：push 到 `syndate/desktop/` 或 `syndate/shared/`，或手动触发

**产物**（三平台并行构建）：
- Windows: `dist/*.exe`（NSIS 安装包）
- macOS: `dist/*.dmg`
- Linux: `dist/*.AppImage`

**使用**：Actions 页面 → 对应运行 → Artifacts 下载

### 3. 安卓端打包 (`syndate-android-build.yml`)

**触发**：push 到 `syndate/android/` 或 `syndate/shared/`，或手动触发

**流程**：
1. 安装依赖
2. `expo prebuild` 生成原生 Android 工程
3. `gradlew assembleDebug` 构建 debug APK
4. 上传 APK 到 Artifacts

**使用**：Actions 页面 → 下载 `syndate-android-apk` → 安装到手机

## 打 Tag 发布正式版

需要正式版本时打 tag（桌面端/安卓端推荐）：

```bash
git tag v1.0.0
git push origin v1.0.0
```

> 当前工作流用 `workflow_dispatch`（手动触发）即可，如需 tag 触发可在 workflow 的 `on:` 中加入：
> ```yaml
> push:
>   tags: ['v*']
> ```

## 服务器首次部署

工作流假定服务器已具备：
1. 已安装 Docker
2. `/opt/syndate/` 目录可写

工作流会自动处理代码上传、依赖安装和容器启停。

## 常见问题

### 桌面端构建报错（Code signing）
本地开发可用 `--publish never` 跳过签名（工作流已配置）。

### 安卓 prebuild 失败
- 首次需联网下载 gradle 依赖，可能耗时较长
- 如 `EXPO_TOKEN` 未配置，使用本地 prebuild（工作流已做降级处理）

### 服务器健康检查失败
- 确认服务器已装 Docker：`docker --version`
- 确认端口 8787 未占用
