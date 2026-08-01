import type { FC } from 'react';

import Link from 'next/link';

const NotFoundPage: FC = () => (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-50 dark:tw-bg-gray-950 tw-px-4">
        <div className="tw-text-center tw-space-y-4">
            <div className="tw-text-8xl tw-font-bold tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-bg-clip-text tw-text-transparent">
                404
            </div>
            <h2 className="tw-text-2xl tw-font-semibold tw-text-gray-800 dark:tw-text-gray-200">
                页面不存在
            </h2>
            <p className="tw-text-gray-500 dark:tw-text-gray-400">
                您访问的页面不存在或已被移动
            </p>
            <div className="tw-pt-2">
                <Link
                    href="/"
                    className="tw-inline-block tw-px-6 tw-py-2.5 tw-rounded-lg tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 tw-transition-colors"
                >
                    ← 返回首页
                </Link>
            </div>
        </div>
    </div>
);

export default NotFoundPage;
