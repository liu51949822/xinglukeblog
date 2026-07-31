'use client';

import type { FC } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { homeConfig } from '@/config/home';

import { HomeSeketon } from './skeleton';
import { FadeInMotion } from '../motion/fadeIn';
import { TypedText } from '../text/typed';
import { HomeBackground } from './background';
import { BoxCard } from './cards/box';
import { HomeBlock, HomeContainer } from './container';
import { HomeGridCards } from './cards/HomeGridCards';


import $styles from './style.module.css';

// 统一引入社交图标
// import { Github, Twitter, Linkedin, Mail, Rss } from 'lucide-react';

const { list, typed } = homeConfig;
const data = [
    {
      title: 'IMPS MES黑灯生产系统',
      url: 'http://mes.uchat.com.cn',
      // icon: <Github />,
    },
    {
      title: '智网智慧城市平台',
      url: 'http://huiqi.wxlxdsjzx.com',
      // icon: <Github />,
    },
    {
      title: '博客系统',
      url: 'https://github.com/liu51949822/xinglukeblog',
      // ❌ 没传 icon，会自动用默认的 Globe 图标
    },
  ];

export const Home: FC = () => {
  if (!list) return <HomeSeketon />;

  return (
    <>
        <div className="tw-fixed tw-inset-0 tw-z-0 tw-w-full tw-h-full">
        <HomeBackground     />
      </div>
      <Suspense fallback={<HomeSeketon />}>
        <div className={$styles.home}>

          {/* ✅ Section 1：打字动画 + 名人名言滚动 */}
          {list.first?.data && typed && (
            <HomeContainer className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-justify-between tw-gap-6">
              <TypedText
                className="tw-flex tw-w-full tw-items-center tw-justify-center tw-font-lxgw tw-text-xl"
                data={typed}
              />

              <HomeBlock className="lg:tw-px-5 tw-w-full lg:tw-w-1/2">
                <FadeInMotion className="tw-h-full tw-w-full" side="right">
                  <BoxCard
                    title="💬 名人名言"
                    data={list.first.data}
                    speed={0.6}
                  />
                </FadeInMotion>
              </HomeBlock>
            </HomeContainer>
          )}

          {/* ✅ Section 2：导航链接（关于我 / 博客 / 项目） */}
    <HomeContainer className="!tw-m-0 !tw-my-0 !tw-mx-0 !tw-bg-transparent !tw-shadow-none tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-justify-center tw-gap-6 tw-min-h-0 tw-h-auto" >
      <FadeInMotion side="bottom" delay={0.2}>
      <nav className="tw-w-full tw-flex tw-justify-center tw-items-center tw-gap-8 tw-py-6">
        {[
          { href: '/about', label: '关于我' },
          { href: '/projects', label: '我的项目' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            title={link.label}
            className="tw-text-gray-700 dark:tw-text-gray-300 tw-transition-transform tw-duration-300 hover:tw-text-primary hover:tw--translate-y-1"
          >
            {link.label}
          </Link>
        ))}
      </nav>
       </FadeInMotion>
    </HomeContainer>
  
  {data && (
  <HomeContainer>
    <div className="tw-w-full">
      <HomeGridCards data={data} columns={3} accent="tw-bg-primary" />
    </div>
  </HomeContainer>
)}


        </div>
      </Suspense>
    </>
  );
};