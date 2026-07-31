# SynData 网页端

React + Vite 网页应用：剪贴板同步 + 文件传输。**无需安装，浏览器直接使用。**

## 本地开发

```bash
cd syndate/web
npm install
npm run dev
```

打开 http://localhost:5173

## 构建

```bash
npm run build
```

产物输出到 `dist/`。

## 部署

push `syndate/web/` 目录后，GitHub Actions 自动：
1. `vite build` 构建
2. 部署到 GitHub Pages

访问地址：`https://<用户名>.github.io/xinglukeblog/`

> 需在仓库 **Settings → Pages → Source** 选择 `GitHub Actions`。

## 与其他端互通

- 加密算法与桌面端/安卓端完全一致（AES-256-CBC + crypto-js）
- 输入相同的服务器地址 + 房间码即可互通
- 服务器已配置 CORS，支持任意来源跨域访问

## 浏览器剪贴板限制

浏览器安全策略限制剪贴板 API：
- 必须用户**点击按钮**才可读取/写入剪贴板
- 无法像桌面端那样后台自动轮询写入
- 网页端通过「推送」/「拉取」按钮手动操作，并自动轮询显示新内容

## 依赖

- react / react-dom
- vite / @vitejs/plugin-react
- crypto-js（加密）
