import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // 不继承仓库根目录的 postcss/tailwind 配置（web 端使用独立 CSS）
  css: {
    postcss: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: true,
  },
});
