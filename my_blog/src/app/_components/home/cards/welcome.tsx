'use client';
import type { FC } from 'react';

// import Link from 'next/link';

// import { RainbowButton } from '../../magicui/rainbow-button';
// import { TextAnimate } from '../../text/animate';
// import { SparklesText } from '../../text/sparkles';
// import $styles from './welcome.module.css';
export interface HomeWelcomeCardType {
    title: string;
    colorTitle?: string;
    content: string;
}

type Props = HomeWelcomeCardType;

export const HomeWelcomeCard: FC<Props> = ({ title, colorTitle, content }) => {
    return (
        <div className="tw-flex tw-h-full tw-w-full tw-flex-col">
            <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl lg:tw-justify-start lg:tw-text-left lg:tw-text-5xl">
                {/* <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-[url('/images/home_bg.png')] tw-bg-cover tw-bg-center tw-opacity-10 tw-flex tw-items-center tw-justify-center tw-text-center tw-text-2xl tw-text-gray-500 tw-px-4">
   🤝 欢迎来到行路客的小站！👋
   <br/>
    这里是记录技术思考与生活感悟的角落，每一篇文章都源于真实的探索与体验。
    <br/>
    无论是代码的乐趣、旅途的风景，还是生活的点滴，我都希望能与您分享。
    <br/>
    感谢您的停留，愿这里能为您带来一点灵感或温暖。
  </div> */}
                 {/* <SparklesText
                    as={
                        <span>
                            {colorTitle && <span className={$styles.colorTitle}>{colorTitle}</span>}
                        </span>
                    }
                />
            </div>
            <div className="tw-mt-5 tw-flex-auto tw-py-3 tw-font-lxgw tw-text-xl !tw-leading-8 lg:tw-pr-16">
                <TextAnimate animation="blurInUp" by="line" once delay={0.8}>
                    {content}
                </TextAnimate>
            </div>
            <div className="tw-flex tw-w-full tw-items-center tw-justify-center tw-py-3 lg:tw-justify-start lg:tw-py-1">
                <RainbowButton>
                    <Link href="https://3rcd.com/classroom/" target="_blank">
                        点此购买课程🤝
                    </Link>
                </RainbowButton> */}
            </div> 
        </div>
    );
};
