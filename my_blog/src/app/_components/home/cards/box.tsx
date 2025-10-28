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
  title: string;
  data?: Item[];
  className?: string;
  alt?: string;
}

/**
 * 随机抽取指定数量数据
 */
const getRandomBatch = (arr: Item[], size: number): Item[] => {
  if (arr.length <= size) return arr;
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, size);
};

export const BoxCard: FC<Props> = ({ className, title, data = [] }) => {
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);

  // 初始化显示
  useEffect(() => {
    setVisibleItems(getRandomBatch(data, 10));
  }, [data]);

  // 模拟异步滚动（每3秒滚动一条）
  useEffect(() => {
    if (!data.length) return;

    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % data.length);
      const newBatch = data.slice(offset, offset + 10);
      if (newBatch.length < 10) {
        // 拼接循环头部
        setVisibleItems([...newBatch, ...data.slice(0, 10 - newBatch.length)]);
      } else {
        setVisibleItems(newBatch);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [data, offset]);

  return (
    <ShineCard className="tw-h-full tw-w-full tw-overflow-hidden" borderRadius="0.75rem">
      <div className={cn($styles.container, className)}>
        {title && <div className={$styles.title}>{title}</div>}

        {/* 滚动区域 */}
        <div className="tw-overflow-hidden tw-h-[300px]">
          <ul
            className="tw-animate-scroll-up tw-space-y-2 tw-transition-all tw-duration-500"
          >
            {visibleItems.map((item, i) => (
              <li
                key={i}
                className="tw-text-base tw-font-lxgw tw-text-gray-800 dark:tw-text-gray-200 tw-transition-all tw-duration-300 tw-pl-3"
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ShineCard>
  );
};
