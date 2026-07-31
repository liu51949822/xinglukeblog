"use client";
import type { FC } from 'react';
import Link from 'next/link';
import { ContactWchat}  from './wchat';
import { useState } from 'react';

export const Footer: FC = () => {
  const [showWechat, setShowWechat] = useState(false);

  return (

    <footer className="
      tw-flex tw-w-full tw-flex-none 
      tw-justify-center tw-items-center 
      tw-border-t tw-border-gray-200/20 
      tw-bg-white/20 dark:tw-bg-black/20
      tw-py-4 tw-backdrop-blur-sm
      tw-text-sm tw-text-gray-700 dark:tw-text-gray-300
      tw-z-10
    ">

      <div className="tw-max-w-6xl tw-w-full tw-px-6 tw-flex tw-flex-col tw-items-center tw-space-y-3 lg:tw-flex-row lg:tw-justify-between lg:tw-space-y-0">

        {/* 左侧版权信息 */}
      <div className="tw-flex tw-flex-col tw-items-center tw-space-y-2 lg:tw-flex-row lg:tw-space-x-2 lg:tw-space-y-0 tw-text-gray-800 tw-dark:tw-text-gray-200 tw-bg-transparent tw-transition-colors tw-duration-300">
          <span>© {new Date().getFullYear()} 苏ICP备2025214959号</span>

          <Link
            href="/myself"
            className="tw-text-muted-foreground tw-transition-colors hover:tw-text-primary"
          >
            关于我
          </Link>

            <button
            onClick={() => setShowWechat(true)}
            className="tw-text-muted-foreground tw-transition-colors hover:tw-text-primary focus:outline-none"
            aria-label="微信联系方式"
          >
            联系我
          </button>
        </div>

        {/* 右侧 Powered by */}
        <div className="tw-text-center lg:tw-text-right">
          <span>
            Powered by{' '}
            <Link
              href="https://nextjs.org/"
              className="tw-font-semibold tw-transition-colors hover:tw-text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </Link>{' '}
            &{' '}
            <Link
              href="https://hono.dev/"
              className="tw-font-semibold tw-transition-colors hover:tw-text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hono
            </Link>
          </span>
        </div>
      </div>

       {/* 二维码弹窗 */}
      <ContactWchat
        visible={showWechat}
        onClose={() => setShowWechat(false)}
      />
    </footer>
  );
};
