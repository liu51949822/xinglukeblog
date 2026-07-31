 'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { WeblinkConfig, WeblinkType } from '@/libs/weblink';
import { Globe } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  data: {
    url: string;
    shortName: string;
    desc: string;
    logo: string;
    type?: WeblinkType;
  }[];
}

export const HomeWeblinkMatrix: FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  /** ✅ 按类型分组（memo 缓存提升性能） */
  const grouped = useMemo(
    () =>
      Object.entries(
        data.reduce((acc, item) => {
          const type = item.type ?? 0;
          if (!acc[type]) acc[type] = [];
          acc[type].push(item);
          return acc;
        }, {} as Record<number, WeblinkConfig[]>)
      ),
    [data]
  );

  /** ✅ 渲染 */
  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-16 tw-py-10">
      {grouped.map(([type, items], idx) => {
        const title = WeblinkType[Number(type) as WeblinkType] || '其他资源';
        return (
          <section
            key={`section-${idx}-${type}`}
            className="tw-flex tw-flex-col tw-gap-6 tw-relative tw-pb-8 tw-border-b tw-border-border/40 last:tw-border-none"
          >
            {/* ✅ 居中标题部分 */}
            <header className="tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center">
              <h2 className="tw-text-xl tw-font-bold tw-text-foreground">
                {title}
              </h2>
              <p className="tw-text-sm tw-text-muted-foreground tw-mt-1">
                共 {items.length} 个链接
              </p>
            </header>

            {/* ✅ 卡片矩阵部分 */}
            <div className="tw-grid tw-gap-5 sm:tw-grid-cols-2 md:tw-grid-cols-3 xl:tw-grid-cols-4">
              {items.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    tw-group tw-rounded-2xl tw-border tw-border-border
                    tw-bg-card tw-p-5 tw-flex tw-flex-col tw-gap-3 tw-items-start
                    tw-transition-all tw-duration-300
                    hover:tw-shadow-lg hover:tw-scale-[1.02] hover:tw-border-primary
                  `}
                >
                  {/* Logo + 名称 */}
                  <div className="tw-flex tw-items-center tw-gap-3">
                    {link.logo ? (
                      <img
                        src={link.logo}
                        alt={link.shortName}
                        width={32}
                        height={32}
                        loading="lazy"
                        className="tw-rounded-lg tw-object-contain tw-bg-white tw-p-1 tw-transition-opacity tw-duration-500 group-hover:tw-opacity-90"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fallback = document.createElement('span');
                            fallback.innerHTML =
                              '<svg xmlns="http://www.w3.org/2000/svg" class="tw-w-7 tw-h-7 tw-text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <Globe className="tw-w-7 tw-h-7 tw-text-muted-foreground" />
                    )}

                    <span className="tw-font-semibold tw-text-base group-hover:tw-text-primary tw-transition-colors">
                      {link.shortName}
                    </span>
                  </div>

                  {/* 描述 */}
                  {link.desc && (
                    <p className="tw-text-sm tw-text-muted-foreground tw-line-clamp-2 tw-leading-relaxed">
                      {link.desc}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default HomeWeblinkMatrix;
