'use client';

import type { FC, JSX } from 'react';
import Link from 'next/link';
import { FadeInMotion } from '../../motion/fadeIn';
import { Globe } from 'lucide-react';

/** 卡片数据结构 */
export interface HomeCardType {
  title: string | JSX.Element;
  url: string;
  icon?: JSX.Element; // 可选图标
}

/** Props */
interface Props {
  data: HomeCardType[];
  accent?: string; // 主色调
  columns?: number; // 网格列数（默认 3）
  defaultIcon?: JSX.Element; // 默认图标
}

/**
 * 📦 卡片矩阵布局组件
 * - 自动响应式换行
 * - 支持动画、hover 提升、跳转链接
 * - icon 可选，没传时用默认图标
 */
export const HomeGridCards: FC<Props> = ({
  data,
  accent = 'tw-bg-primary',
  columns = 3,
  defaultIcon = <Globe className="tw-h-5 tw-w-5 tw-text-primary" />,
}) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="tw-w-full tw-py-12 tw-px-4 md:tw-px-8 tw-bg-transparent">
      <div
        className={`
          tw-grid tw-gap-8
          ${columns === 1 ? 'tw-grid-cols-1' : ''}
          ${columns === 2 ? 'sm:tw-grid-cols-2' : ''}
          ${columns === 3 ? 'sm:tw-grid-cols-2 lg:tw-grid-cols-3' : ''}
          ${columns === 4 ? 'sm:tw-grid-cols-2 lg:tw-grid-cols-4' : ''}
        `}
      >
        {data.map((item, idx) => (
          <FadeInMotion key={idx} side="bottom" delay={0.1 * idx}>
            <Link
  href={item.url}
  target="_blank"
  rel="noopener noreferrer"
  className={`
    tw-group tw-rounded-2xl tw-border tw-border-neutral-200 dark:tw-border-neutral-700
    tw-bg-white/60 dark:tw-bg-neutral-900/60
    tw-shadow-sm hover:tw-shadow-lg hover:tw-scale-[1.02]
    tw-transition-all tw-duration-300 tw-p-6
    tw-flex tw-flex-col tw-gap-3 tw-backdrop-blur-sm
  `}
>

              {/* 图标与标题 */}
              <div className="tw-flex tw-items-center tw-gap-3">
                <div className="tw-flex tw-items-center tw-justify-center tw-h-8 tw-w-8 tw-rounded-full tw-bg-neutral-100 dark:tw-bg-neutral-800">
                  {item.icon ? (
                    <span className="tw-text-primary tw-text-lg">{item.icon}</span>
                  ) : (
                    defaultIcon
                  )}
                </div>
                <h3 className="tw-text-base tw-font-semibold tw-text-foreground group-hover:tw-text-primary tw-transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* 下划线动画 */}
              <div
                className={`tw-h-[2px] tw-w-0 group-hover:tw-w-full tw-transition-all tw-duration-300 ${accent}`}
              />

              {/* 链接文字 */}
              {/* <div className="tw-text-sm tw-text-muted-foreground tw-break-all tw-mt-1">
                {item.url}
              </div> */}
            </Link>
          </FadeInMotion>
        ))}
      </div>
    </div>
  );
};
export default HomeGridCards;
