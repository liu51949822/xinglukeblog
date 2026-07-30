import React from 'react';  
import type { Metadata, ResolvingMetadata } from 'next';
import {AboutMe} from '@/app/_components/aboutme/index';

export const generateMetadata = async(_metadata: Record<string, any>,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const parentTitle = (await parent).title?.absolute ?? 'XinglukeBlog';
  return {
    title: `个人简介、关于我 | ${parentTitle}`,
    description: '了解个人简介、技能和成长历程。',
  };
}; 

const MyselfPage = async () => {
    return <AboutMe />;
}
export default MyselfPage;

