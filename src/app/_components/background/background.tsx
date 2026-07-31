'use client';

import { useEffect, useState } from 'react';

// 背景组件：从 public/uploads/thumb 随机选一张图作为背景
export default function Background() {
  const [bgUrl, setBgUrl] = useState<string>('');

  useEffect(() => {
    // 图片文件名列表，按需补充
    const thumbs = [
      'bg-dark.png',
      'bg-light.png',
      'post-1.png',
      'post-2.png',
      'post-3.png',
      'post-4.png',
      'post-5.png',
      'post-6.png',
      'post-7.png',
      'post-8.png',
      'post-1.png'

    ];

    // 随机选一张
    const randomThumb = thumbs[Math.floor(Math.random() * thumbs.length)];
    setBgUrl(`/uploads/thumb/${randomThumb}`);
  }, []);

  if (!bgUrl) return null; // 未加载完不渲染，避免闪屏

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
      }}
    />
  );
}
