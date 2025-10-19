import type { FC } from 'react';

import { Skeleton } from '../shadcn/ui/skeleton';
import { HomeContainer } from './container';
export const HomeSeketon: FC = () => (
    <div className="tw-flex tw-h-full tw-w-full tw-flex-col lg:tw-flex-row lg:tw-gap-8">
        {/* 左侧文字骨架 */}
        <div className="tw-flex tw-flex-1 tw-flex-col">
            <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl lg:tw-justify-start lg:tw-text-left lg:tw-text-5xl">
                <Skeleton className="tw-h-10 tw-w-3/4 tw-bg-gray-200" />
            </div>
            <div className="tw-mt-5 tw-flex-auto tw-py-3">
                <Skeleton className="tw-h-6 tw-w-full tw-bg-gray-200" />
                <Skeleton className="tw-mt-2 tw-h-6 tw-w-5/6 tw-bg-gray-200" />
            </div>
            <div className="tw-flex tw-w-full tw-items-center tw-justify-center tw-py-3 lg:tw-justify-start lg:tw-py-1">
                <Skeleton className="tw-h-12 tw-w-48 tw-rounded-full tw-bg-gray-200" />
            </div>
        </div>

        {/* 右侧卡片骨架 */}
        <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-transition-transform hover:tw-scale-105">
            <Skeleton className="tw-h-64 tw-w-full tw-rounded-lg tw-bg-gray-200" />
        </div>
    </div>
);
