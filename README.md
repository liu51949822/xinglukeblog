# XinglukeBlog 行路客博客

> 一个现代、美观、功能丰富的个人博客系统 | A modern, beautiful and feature-rich personal blog system

[![Deploy to Server](https://github.com/liu51949822/xinglukeblog/workflows/Deploy%20to%20Server/badge.svg)](https://github.com/liu51949822/xinglukeblog/actions)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![Prisma](https://img.shields.io/badge/Prisma-6-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## 📖 项目简介 | Introduction

**中文**：XinglukeBlog 是一个基于 Next.js 15 构建的现代化个人博客系统。它集成了博客写作、DeepSeek AI 智能对话、留言板、个人主页、Web 导航等多种功能，采用响应式设计，支持暗黑模式，提供流畅的动画效果与极致的用户体验。

**English**: XinglukeBlog is a modern personal blog system built with Next.js 15. It integrates blog writing, DeepSeek AI chat, message board, personal profile, web navigation and more. With responsive design, dark mode support, smooth animations and excellent user experience.

---

## ✨ 功能特性 | Features

### 博客系统 | Blog
- 📝 文章创建、编辑、删除 | Post CRUD
- 🗂️ 分类树与标签系统 | Category tree & tag system
- 🔍 文章搜索与分页 | Search & pagination
- 📖 MDX 富文本渲染 | MDX rich text rendering
- 📑 目录导航 (TOC) | Table of contents

### AI 对话 | AI Chat
- 🤖 DeepSeek AI 智能问答 | DeepSeek AI chat
- 💬 流式响应 | Streaming responses
- 🎯 自定义系统提示词 | Custom system prompts

### 互动功能 | Interactive
- 💌 留言板（持久化存储） | Message board (persistent)
- 👤 用户认证（JWT + Passport） | Auth (JWT + Passport)
- 🎨 暗黑/亮色主题切换 | Dark/light theme
- 🌊 动态背景与动画效果 | Dynamic backgrounds & animations

### 其他 | Others
- 🧭 Web 导航页 | Web navigation
- 📊 个人时间线与技能展示 | Personal timeline & skills

---

## 🛠️ 技术栈 | Tech Stack

| 领域 | 技术 |
|------|------|
| 前端框架 | Next.js 15 (App Router) + React 19 |
| 语言 | TypeScript 5 |
| UI 组件 | Ant Design 5 + Tailwind CSS + shadcn/ui |
| ORM | Prisma 6 (PostgreSQL) |
| 缓存 | Redis 7 |
| API | Hono 4 + OpenAPI |
| 认证 | JWT + Passport |
| AI | DeepSeek + Vercel AI SDK |
| 动效 | Motion + React Spring + Three.js |

---

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites
- Node.js ≥ 18
- pnpm ≥ 9
- PostgreSQL ≥ 14
- Redis ≥ 6

### 安装 | Install

```bash
# 克隆仓库 | Clone repository
git clone https://github.com/liu51949822/xinglukeblog.git
cd xinglukeblog

# 安装依赖 | Install dependencies
pnpm install

# 配置环境变量 | Configure environment variables
cp env.example .env
# 编辑 .env 填写数据库和密钥 | Fill in DB & secrets

# 初始化数据库 | Initialize database
pnpm dbp        # push schema
pnpm dbs        # seed data

# 启动开发服务器 | Start dev server
pnpm dev
```

访问 | Visit: **http://localhost:3000**

### 环境变量 | Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/xinglukeblog
AUTH_JWT_SECRET=your-jwt-secret
DEEPSEEK_API_KEY=sk-your-deepseek-key
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_API_PATH=/api
```

---

## 🏗️ 项目结构 | Project Structure

```
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (pages)/        # 页面路由 | Page routes
│   │   ├── _components/    # 组件 | Components
│   │   └── api/            # Hono API 路由
│   ├── api/                # 客户端 API 封装
│   ├── config/             # 配置 | Config
│   ├── database/           # Prisma schema & migrations
│   ├── libs/               # 工具库 | Utilities
│   └── server/             # 服务端逻辑 | Server logic
├── public/                 # 静态资源 | Static assets
├── docs/                   # 文档 | Documentation
└── .github/workflows/      # CI/CD
```

---

## 🤖 CI/CD 部署 | Deployment

项目已配置 GitHub Actions 自动部署。每次 push 到 `main` 分支，将自动完成：

1. **云端构建**：在 GitHub Actions 中安装依赖、生成 Prisma client、构建 Next.js
2. **打包上传**：将构建产物通过 SCP 上传到服务器
3. **自动部署**：服务器脚本解压并重启 Docker 容器

详细说明见：[docs/CI-CD-部署指南.md](./docs/CI-CD-部署指南.md)

### 手动部署 | Manual Deploy

```bash
pnpm install --ignore-scripts
pnpm dbg        # 生成 Prisma client
pnpm build      # 构建

tar czf deploy.tar.gz .next/standalone .next/static .next/BUILD_ID \
  .next/*.json public package.json src/database

scp deploy.tar.gz root@<服务器IP>:/tmp/
ssh root@<服务器IP> "bash /opt/xinglukeblog/deploy.sh"
```

---

## 🧰 常用命令 | Common Commands

```bash
pnpm dev        # 开发 | Development
pnpm build      # 构建 | Production build
pnpm start      # 启动 | Start production
pnpm lint       # 代码检查 | Lint
pnpm dbg        # 生成 Prisma client
pnpm dbp        # 推送数据库 schema
pnpm dbmd       # 部署数据库迁移
pnpm dbmrs      # 重置数据库并填充种子
pnpm dbo        # 打开 Prisma Studio
```

---

## 📧 联系 | Contact

- GitHub: [@liu51949822](https://github.com/liu51949822)
- 博客: [www.xingluke.cn](https://www.xingluke.cn)
