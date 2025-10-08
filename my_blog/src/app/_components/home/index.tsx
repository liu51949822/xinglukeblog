import type { FC } from 'react';

import { homeConfig } from '@/config/home';
import { Suspense } from 'react';

import { FadeInMotion } from '../motion/fadeIn';
import { TypedText } from '../text/typed';
// import { FadeInMotion } from '../motion/fadeIn';
// import { TypedText } from '../text/typed';
import { HomeBackground } from './background';
import { HomeListCard } from './cards/list';
import { HomeVideoCard } from './cards/video';
import { HomeWelcomeCard } from './cards/welcome';
import { HomeBlock, HomeContainer } from './container';
import { HomeSeketon } from './skeleton';
import $styles from './style.module.css';
import { HomeTimeline } from './timeline';
const { welcome, video, list, typed, timeline } = homeConfig;
export const Home: FC = () => (
    <>
        <HomeBackground />
        <Suspense fallback={<HomeSeketon />}>
            <div className={$styles.home}>
                {(welcome || video) && (
                    <HomeContainer>
                        {welcome && (
                            <HomeBlock>
                                <FadeInMotion>
                                    <HomeWelcomeCard {...welcome} />
                                </FadeInMotion>
                            </HomeBlock>
                        )}
                        {video && (
                            <HomeBlock>
                                <FadeInMotion
                                    className="tw-flex tw-h-auto tw-w-full"
                                    side="top-right"
                                >
                                    <HomeVideoCard {...video} />
                                </FadeInMotion>
                            </HomeBlock>
                        )}
                    </HomeContainer>
                )}
                {typed && (
                    <HomeContainer className="tw-items-center tw-justify-center tw-space-y-2 md:tw-flex-col">
                        <TypedText
                            className="tw-flex tw-w-full tw-items-center tw-justify-center tw-font-lxgw tw-text-xl"
                            data={typed}
                        />
                    </HomeContainer>
                )}
                {list && (
                    <HomeContainer>
                        <HomeBlock className="lg:tw-px-5">
                            <FadeInMotion className="tw-h-full tw-w-full" side="left">
                                <HomeListCard {...list.first} />
                            </FadeInMotion>
                        </HomeBlock>
                        <HomeBlock className="lg:tw-px-5">
                            <FadeInMotion className="tw-h-full tw-w-full" side="right">
                                <HomeListCard {...list.second} />
                            </FadeInMotion>
                        </HomeBlock>
                    </HomeContainer>
                )}
                {timeline && (
                    <HomeContainer>
                        <div className="tw-h-full tw-w-full">
                            <HomeTimeline data={timeline} />
                        </div>
                    </HomeContainer>
                )}
            </div>
        </Suspense>
    </>
);
