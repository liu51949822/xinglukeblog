'use client';

import { Suspense } from 'react';
import { HomeWeblinkMatrix } from '@/app/_components/web_nav/NavGridCards';
import  Background  from '../background/background';
import { HomeWeblinkMatrixSkeleton } from './navSkeleton';
import { weblinkConfig } from '@/config/web';
import type { WeblinkConfig } from '@/libs/weblink';

interface DaohangPageProps {
  links?: WeblinkConfig[];
}

/**
 * 🧭 导航页面
 * - 背景 + 链接矩阵
 * - 使用 Suspense 加载骨架屏
 */
const DaohangPage = ({ links = weblinkConfig }: DaohangPageProps) => {
  return (
    <>
      <Background />
      <Suspense fallback={<HomeWeblinkMatrixSkeleton />}>
        <HomeWeblinkMatrix data={links} />
      </Suspense>
    </>
  );
};

export default DaohangPage;
