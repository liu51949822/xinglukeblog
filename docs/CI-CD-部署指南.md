# CI/CD 部署指南

使用 GitHub Actions 实现「代码推送即自动部署」。构建在 GitHub 云端完成，通过 SSH 推送到服务器并重启容器。

## 架构

```
push main 分支
    │
    ▼
GitHub Actions (ubuntu-latest)
    │  1. checkout 代码
    │  2. 安装依赖 (pnpm)
    │  3. prisma generate
    │  4. next build (standalone 模式)
    │  5. 打包 .next + public + src/database
    │
    ▼
SCP 上传 /tmp/deploy.tar.gz
    │
    ▼
SSH 执行 scripts/deploy.sh
    │  1. 停止旧容器
    │  2. 解压部署包到 /opt/xinglukeblog
    │  3. 修正 standalone 目录结构
    │  4. 启动新容器 (node:22-alpine)
    │  5. 健康检查 (HTTP 200)
    │
    ▼
部署完成 ✅
```

## 前置条件

### 1. 服务器已部署好基础环境

- 已安装 Docker
- PostgreSQL 容器 `xingkeblog-db`（端口 15432）
- Redis 容器 `xingkeblog-redis`（端口 16379）

### 2. 项目配置已就位

在源码根目录需要以下配置（已在仓库中）：

- `next.config.ts` — 已启用 `output: 'standalone'`
- `src/config/app.ts` — `baseUrl` 兜底已改为空字符串（避免前端请求 localhost）
- `src/database/schema/schema.prisma` — 已添加 `binaryTargets` 包含 `linux-musl-openssl-3.0.x`

### 3. 服务器部署脚本

将 `scripts/deploy.sh` 复制到服务器并赋权：

```bash
scp scripts/deploy.sh root@<服务器IP>:/opt/xinglukeblog/deploy.sh
ssh root@<服务器IP> "chmod +x /opt/xinglukeblog/deploy.sh"
```

> 首次手动部署后 `/opt/xinglukeblog` 目录已存在，脚本会复用。

## GitHub Secrets 配置

进入仓库 `Settings → Secrets and variables → Actions → New repository secret`，添加：

| Secret 名称 | 值 | 必填 |
|-------------|-----|------|
| `SERVER_HOST` | 服务器公网 IP（在阿里云控制台查看） | ✅ |
| `SERVER_USER` | SSH 用户名，如 `root` | ✅ |
| `SERVER_PASSWORD` | SSH 密码 | ✅ |
| `SERVER_PORT` | SSH 端口，默认 `22` | ✅ |
| `AUTH_JWT_SECRET` | JWT 签名密钥（32 位以上随机串） | ✅ |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | 可选 |

> 生成 JWT 密钥：`openssl rand -hex 32`

## 触发方式

| 触发条件 | 说明 |
|----------|------|
| push 到 `main` 分支 | 自动部署 |
| 手动触发 | 仓库 Actions 页面 → Run workflow |

## 查看部署状态

- GitHub 仓库 → **Actions** 标签 → 查看 `Deploy to Server` 运行记录
- 服务器日志：`docker logs xingkeblog --tail=50`

## 回滚

重新构建当前 `main` 分支即为最新版。如需回滚到旧版：

```bash
# 服务器上手动操作
docker rm -f xingkeblog
# 用之前的部署包重新解压启动
bash /opt/xinglukeblog/deploy.sh
```

## 常见问题

### 1. 构建失败（Actions 红色）
- 查看 Action 日志中 `Build Next.js` 步骤的具体报错
- 常见原因：依赖版本冲突、Prisma schema 变化

### 2. 部署后首页 500
- 服务器执行 `docker logs xingkeblog --tail=20` 查看
- 常见原因：Prisma 引擎不匹配、数据库连接失败

### 3. 健康检查失败（HTTP 非 200）
- 脚本会自动打印容器日志并退出
- 检查 PostgreSQL / Redis 容器是否正常：`docker ps`

## 手动部署（备用方案）

不通过 CI 时，可手动完成相同流程：

```bash
# 本地构建
pnpm install --ignore-scripts
pnpm dbg
pnpm build

# 打包
tar czf deploy.tar.gz .next/standalone .next/static .next/BUILD_ID \
  .next/*.json public package.json src/database

# 上传并执行部署脚本
scp deploy.tar.gz root@<IP>:/tmp/
ssh root@<IP> "bash /opt/xinglukeblog/deploy.sh"
```
