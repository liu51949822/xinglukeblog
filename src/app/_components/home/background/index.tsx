'use client';

import { useEffect, useState } from 'react';
import { InteractiveGridPattern } from '@/app/_components/shadcn/ui/interactive-grid-pattern';

/**
 * 🪶 HomeBackground
 * - 自适应页面高度
 * - 支持响应式网格密度
 * - 渐变 & 动态 pulse 效果
 * - 不干扰内容交互
 */
export const HomeBackground = () => {
  const [size, setSize] = useState(60);

  // ✅ 响应式调整网格密度
  useEffect(() => {
    const setResponsiveSize = () => {
      if (window.innerWidth < 640) setSize(30);
      else if (window.innerWidth < 1024) setSize(50);
      else setSize(70);
    };
    setResponsiveSize();
    window.addEventListener('resize', setResponsiveSize);
    return () => window.removeEventListener('resize', setResponsiveSize);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full min-h-full -z-10 pointer-events-none overflow-hidden"
      style={{
        willChange: 'contents',
        height: '100%', // 让背景自动匹配内容高度
      }}
    >
      {/* === 主背景层 === */}
      <div className="absolute inset-0 bg-gray-950" />

      {/* === 渐变叠加层 === */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/30 to-gray-950/90" />

      {/* === 响应式动态网格 === */}
      <InteractiveGridPattern
        width={size}
        height={size}
        stroke="#ffffff22"
        radius={1}
        className="animate-pulse opacity-60"
      />

      {/* === 上下渐隐遮罩（滚动时柔和收边） === */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-950 via-gray-950/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
    </div>
  );
};
