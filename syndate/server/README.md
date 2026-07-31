# SynData 服务器

端到端加密数据同步中转服务。**服务器只存密文**，无法解密任何数据。

## 快速启动

```bash
cd server
npm install
npm start
```

默认监听 `0.0.0.0:8787`，可通过环境变量 `PORT` 修改。

## 部署到你的服务器（Docker 方式）

```bash
# 1. 拉取 node 镜像并运行（简单方式）
docker run -d --name syndate \
  -p 8787:8787 \
  --restart unless-stopped \
  -e PORT=8787 \
  -v $(pwd)/server:/app \
  -w /app \
  node:22-alpine sh -c "npm install --omit=dev && npm start"
```

或使用 Dockerfile（见下方）：

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY src ./src
EXPOSE 8787
CMD ["npm", "start"]
```

```bash
docker build -t syndate-server .
docker run -d --name syndate -p 8787:8787 --restart unless-stopped syndate-server
```

## API 一览

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| POST | `/api/clipboard` | 上传剪贴板密文 |
| GET | `/api/clipboard/:room` | 拉取剪贴板密文 |
| POST | `/api/file` | 上传加密文件 |
| GET | `/api/files/:room` | 文件列表 |
| GET | `/api/file/:room/:fileId` | 下载加密文件 |
| DELETE | `/api/file/:room/:fileId` | 删除文件 |

## 特性

- ✅ 无用户体系，房间码隔离
- ✅ 端到端加密（AES-256-GCM），服务器只存密文
- ✅ TTL 24 小时自动清理
- ✅ 内存存储，轻量零依赖（除 express/multer）
- ✅ 单文件上限 500MB
