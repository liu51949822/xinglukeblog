'use client';

import type { FC } from 'react';
import { Skeleton } from '../shadcn/ui/skeleton';

/**
 * 📦 Weblink 矩阵骨架加载组件
 * - 模拟多个类型分组
 * - 每组展示标题和若干卡片骨架
 */
export const HomeWeblinkMatrixSkeleton: FC = () => {
  const groupCount = 3; // 模拟 3 组类型
  const cardsPerGroup = 4;

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-16 tw-py-10">
      {Array.from({ length: groupCount }).map((_, i) => (
        <section key={i} className="tw-flex tw-flex-col tw-gap-6">
          {/* 标题骨架 */}
          <div className="tw-space-y-2">
            <Skeleton className="tw-h-6 tw-w-40 tw-rounded-md" />
            <Skeleton className="tw-h-4 tw-w-28 tw-rounded-md" />
          </div>

          {/* 卡片矩阵骨架 */}
          <div className="tw-grid tw-gap-5 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4">
            {Array.from({ length: cardsPerGroup }).map((_, j) => (
              <div
                key={j}
                className="tw-rounded-2xl tw-border tw-border-border tw-bg-card tw-p-5 tw-flex tw-flex-col tw-gap-3"
              >
                <div className="tw-flex tw-items-center tw-gap-3">
                  <Skeleton className="tw-h-8 tw-w-8 tw-rounded-lg" />
                  <Skeleton className="tw-h-5 tw-w-24 tw-rounded-md" />
                </div>
                <Skeleton className="tw-h-3 tw-w-full tw-rounded-md" />
                <Skeleton className="tw-h-3 tw-w-3/4 tw-rounded-md" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomeWeblinkMatrixSkeleton;
