import React from 'react';
import type { Metadata } from 'next';
import { AboutMe } from '@/app/_components/aboutme/index';

export const metadata: Metadata = {
    title: '关于刘仁杰 Liu Renjie | Senior AI Agent / Applied AI Engineer',
    description:
        '了解刘仁杰 / Liu Renjie：Senior AI Agent / Applied AI Engineer，专注 Agent Platform & Backend，9 年后端与平台经验，聚焦生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
    openGraph: {
        title: '关于刘仁杰 Liu Renjie | Senior AI Agent / Applied AI Engineer',
        description:
            '9 年后端与平台经验，专注 Agent Platform & Backend、生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
        type: 'profile',
        locale: 'zh_CN',
        siteName: '行路客的小站',
    },
};

const AboutPage = () => <AboutMe />;
export default AboutPage;
