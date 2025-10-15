'use client';
import type { FC } from 'react';
import { useState, useEffect } from 'react';

export interface HomeWelcomeCardType {
    title: string;
    colorTitle?: string;
    content: string;
}

type Props = HomeWelcomeCardType;
const fullTetx = `🤝 欢迎来到行路客的小站！👋/n
这里是记录技术思考与生活感悟的角落，每一篇文章都源于真实的探索与体验。/n
无论是代码的乐趣、旅途的风景，还是生活的点滴，我都希望能与您分享。/n
感谢您的停留，愿这里能为您带来一点灵感或温暖。`;

export const HomeWelcomeCard: FC<Props> = ({ title, colorTitle, content }) => {
    return (
        <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
            <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl lg:tw-justify-start lg:tw-text-left lg:tw-text-5xl">
                <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-[url('/images/home_bg.png')] tw-bg-cover tw-bg-center tw-opacity-10 tw-flex tw-items-center tw-justify-center tw-text-center tw-text-2xl tw-text-gray-500 tw-px-4">
                {fullTetx}
                </div>
            </div> 
        </div>
    );
};
