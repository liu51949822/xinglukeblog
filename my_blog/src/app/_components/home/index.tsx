import type { FC } from 'react';
import { homeConfig } from '@/config/home';
import { Suspense } from 'react';
import { FadeInMotion } from '../motion/fadeIn';
import { TypedText } from '../text/typed';
import { HomeBackground } from './background';
import { HomeListCard } from './cards/list';
import { HomeWelcomeCard } from './cards/welcome';
import { HomeBlock, HomeContainer } from './container';
import { HomeSeketon } from './skeleton';
import $styles from './style.module.css';
import { HomeTimeline } from '../../(pages)/myself/timeline';
const { welcome, list, typed, timeline } = homeConfig;
export const Home: FC = () => (
    <>
    <HomeBackground />
   
        
    </>

);

<Suspense fallback={<HomeSeketon />}>
            <div className={$styles.home}>
                {(welcome ) && (
                    <HomeContainer>
                        {welcome && (
                            <HomeBlock>
                                <FadeInMotion>
                                    <HomeWelcomeCard {...welcome} />
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
