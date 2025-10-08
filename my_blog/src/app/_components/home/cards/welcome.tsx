'use client';
import type { FC } from 'react';

import Link from 'next/link';

import { RainbowButton } from '../../magicui/rainbow-button';
import { TextAnimate } from '../../text/animate';
import { SparklesText } from '../../text/sparkles';
import $styles from './welcome.module.css';
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
                {title}
                <SparklesText
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
                </RainbowButton>
            </div>
        </div>
    );
};
