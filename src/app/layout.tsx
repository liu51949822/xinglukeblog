import type { Metadata } from 'next';

import './styles/index.css';

import type { FC, PropsWithChildren } from 'react';

import { Analytics } from './_components/analytics/Analytics';

export const metadata: Metadata = {
    title: {
        default: '刘仁杰 Liu Renjie | Senior AI Agent / Applied AI Engineer',
        template: '%s | 行路客',
    },
    description:
        '刘仁杰 / Liu Renjie，Senior AI Agent / Applied AI Engineer，专注 Agent Platform & Backend。9 年后端与平台经验，聚焦生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。行路客为个人博客品牌。',
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
        '行路客',
    ],
    authors: [{ name: '刘仁杰 / Liu Renjie' }],
    openGraph: {
        title: '刘仁杰 Liu Renjie | Senior AI Agent / Applied AI Engineer',
        description:
            'Agent Platform & Backend，9 年后端与平台经验，专注生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
        type: 'website',
        locale: 'zh_CN',
        siteName: '行路客的小站',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
        },
    },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="zh-CN">
        <head>
            {/* 百度站长平台验证 */}
            <meta name="baidu-site-verification" content="codeva-F0GpwAkA7F" />
        </head>
        <body>
            {children}
            {/* 访问统计埋点（百度 + Google） */}
            <Analytics />
        </body>
    </html>
);

export default RootLayout;
