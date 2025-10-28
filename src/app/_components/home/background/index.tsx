import type { FC } from 'react';
import { InteractiveGridPattern } from '@/app/_components/shadcn/ui/interactive-grid-pattern';

export const HomeBackground: FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gray-950">
      {/* 渐变叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-900/20 to-gray-950/50" />

      {/* 背景层：密集小点（远层） */}
      <InteractiveGridPattern
        width={20}
        height={20}
        stroke="#764e4eb5" 
        radius={50}
        className="opacity-40"
        squares={[100, 100]} // 使用数组来指定网格数量
      />

      {/* 前景层：较大网格 + 动效（近层） */}
      <InteractiveGridPattern
        width={60}
        height={60}
        stroke="#ffffff30"
        radius={1}
        className="animate-pulse [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-60"
        squares={[40, 20]} // 使用数组来指定网格数量
      />
    </div>
  );
};