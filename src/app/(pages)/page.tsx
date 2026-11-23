import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { ResumeHome } from '../_components/home/ResumeHome';

export const generateMetadata = async (
    _metadata: Record<string, any>,
    parent: ResolvingMetadata,
): Promise<Metadata> => ({
    title: '刘仁杰 Liu Renjie | Senior AI Agent / Applied AI Engineer',
    description:
        '刘仁杰 / Liu Renjie，Senior AI Agent / Applied AI Engineer，专注 Agent Platform & Backend。9 年后端与平台经验，聚焦生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
    keywords: [
        '刘仁杰',
        'Liu Renjie',
        'Senior AI Agent Engineer',
        'Applied AI Engineer',
        'Agent Platform & Backend',
        'Production Agent',
        'Voice AI',
        'MCP',
        'RAG',
        'Multi-Agent',
        'Cross-timezone Remote',
        '远程工作',
    ],
    openGraph: {
        title: '刘仁杰 Liu Renjie | Senior AI Agent / Applied AI Engineer',
        description:
            'Agent Platform & Backend，9 年后端与平台经验，专注生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
        type: 'website',
        locale: 'zh_CN',
        siteName: '行路客的小站',
    },
});

// 简历结构化数据（schema.org Person），提升搜索引擎识别
const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '刘仁杰',
    alternateName: 'Liu Renjie',
    jobTitle: 'Senior AI Agent / Applied AI Engineer',
    description:
        'Agent Platform & Backend，9 年后端与平台经验，专注生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
    email: 'mailto:1240332437@qq.com',
    knowsAbout: [
        'Agent Platform & Backend',
        'Production AI Agents',
        'Voice AI',
        'Model Context Protocol (MCP)',
        'Retrieval-Augmented Generation (RAG)',
        'Multi-Agent Systems',
        'Backend Engineering',
        'Platform Engineering',
        'Java',
        'Spring Boot',
        'PostgreSQL',
        'Redis',
        'Kafka',
        'Docker',
        'Kubernetes',
    ],
    sameAs: ['https://blog.csdn.net/weixin_45530192', 'https://github.com/liu51949822'],
};

const HomePage: FC = async () => (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ResumeHome />
    </>
);

export default HomePage;
