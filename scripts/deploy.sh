#!/bin/bash
# 服务器端部署脚本：解压 /tmp/deploy.tar.gz 并重启 xingkeblog 容器
# 由 GitHub Actions 在每次 push main 后自动调用
set -e

DEPLOY_TAR="/tmp/deploy.tar.gz"
APP_DIR="/opt/xinglukeblog"

echo "===== [1/5] 停止旧容器 ====="
docker rm -f xingkeblog 2>/dev/null || true

echo "===== [2/5] 解压部署包 ====="
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR"
tar xzf "$DEPLOY_TAR" -C "$APP_DIR"

echo "===== [3/5] 修正 standalone 目录结构 ====="
mkdir -p "$APP_DIR/.next/standalone/.next"
cp "$APP_DIR"/.next/*.json "$APP_DIR/.next/BUILD_ID" "$APP_DIR/.next/standalone/.next/" 2>/dev/null || true
cp -r "$APP_DIR/.next/static" "$APP_DIR/.next/standalone/.next/" 2>/dev/null || true
ln -sf /app/public "$APP_DIR/.next/standalone/public" 2>/dev/null || true

echo "===== [4/5] 启动新容器 ====="
# 读取 .env 配置
if [ -f "$APP_DIR/.env" ]; then
    set -a
    source "$APP_DIR/.env"
    set +a
fi

docker run -d --name xingkeblog --restart unless-stopped \
  -p 80:3000 \
  -v "$APP_DIR":/app -w /app \
  -e NODE_ENV=production \
  -e AUTH_JWT_SECRET="${AUTH_JWT_SECRET:-$(openssl rand -hex 32)}" \
  -e DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres123@172.17.0.1:15432/xinglukeblog}" \
  -e REDIS_URL="${REDIS_URL:-redis://172.17.0.1:16379}" \
  node:22-alpine node .next/standalone/server.js

echo "===== [5/5] 健康检查 ====="
sleep 5
HTTP_CODE=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:80/ || true)
echo "首页 HTTP 状态: $HTTP_CODE"
if [ "$HTTP_CODE" != "200" ]; then
    echo "!!! 健康检查失败，查看日志:"
    docker logs xingkeblog --tail=20
    exit 1
fi
echo "===== 部署完成 ====="
