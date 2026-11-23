import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { AboutMe } from '@/app/_components/aboutme/index';

export const generateMetadata = async (
    _metadata: Record<string, any>,
    _parent: ResolvingMetadata,
): Promise<Metadata> => {
    return {
        title: '刘仁杰 Liu Renjie 个人简介 | Senior AI Agent / Applied AI Engineer',
        description:
            '刘仁杰 / Liu Renjie，Senior AI Agent / Applied AI Engineer，专注 Agent Platform & Backend。9 年后端与平台经验，聚焦生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
        openGraph: {
            title: '刘仁杰 Liu Renjie 个人简介 | Senior AI Agent / Applied AI Engineer',
            description:
                '9 年后端与平台经验，专注 Agent Platform & Backend、生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
            type: 'profile',
            locale: 'zh_CN',
            siteName: '行路客的小站',
        },
    };
};

const MyselfPage = async () => {
    return <AboutMe />;
};
export default MyselfPage;
