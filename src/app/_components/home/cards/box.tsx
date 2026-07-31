'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ShineCard } from '../../cards/shine';
import { cn } from '../../shadcn/utils';
import $styles from './list.module.css';

interface Item {
  text: string;
}

interface Props {
  title?: string;
  data?: Item[];
  className?: string;
  alt?: string;
  speed?: number; // 控制滚动速度
}

export const BoxCard: FC<Props> = ({ className, data = [], speed = 1 }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (data.length === 0) return;
    setItems(data);
  }, [data]);

  const duration = Math.max(items.length * 4 / speed, 20 / speed);

  return (
    <ShineCard className="tw-h-full tw-w-full tw-overflow-hidden" borderRadius="0.75rem">
      <div className={cn($styles.container, className)}>
        <div className="tw-relative tw-h-[300px] tw-overflow-hidden tw-w-full">
          {/* ✅ 无缝滚动内容 */}
          <ul
            className={cn(
              $styles['scroll-container'],
              'tw-flex tw-flex-col tw-space-y-2 tw-pl-3'
            )}
            style={{
              animationDuration: `${duration}s`,
            }}
          >
            {items.concat(items).map((item, i) => (
              <li
                key={`${item.text}-${i}`}
                className="tw-text-base tw-font-lxgw tw-text-gray-800 dark:tw-text-gray-200"
              >
                {item.text}
              </li>
            ))}
          </ul>

          {/* ✅ 渐隐遮罩层 */}
          <div className={$styles.fadeTop}></div>
          <div className={$styles.fadeBottom}></div>
        </div>
      </div>
    </ShineCard>
  );
};
