import React from 'react';
import type { Metadata } from 'next';
import { AboutMe } from '@/app/_components/aboutme/index';

export const metadata: Metadata = {
  title: '关于我 | XinglukeBlog',
  description: '了解个人简介、技能和成长历程。',
};

const AboutPage = () => <AboutMe />;
export default AboutPage;
