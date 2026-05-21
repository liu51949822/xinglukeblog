import type { Metadata, Viewport } from 'next';

import './styles/index.css';

import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
    title: {
        default: '行路客的小站',
        template: '%s | 行路客的小站',
    },
    description:
        '行路客的小站 — 记录技术文档和分享生活点滴的个人博客，专注于全栈开发、编程语言、数据库、云计算等技术领域。',
    keywords: ['博客', '技术博客', '全栈开发', '前端开发', '后端开发', '行路客'],
    authors: [{ name: '行路客' }],
    openGraph: {
        type: 'website',
        locale: 'zh_CN',
        siteName: '行路客的小站',
        title: '行路客的小站',
        description:
            '记录技术文档和分享生活点滴的个人博客，专注于全栈开发、编程语言、数据库、云计算等技术领域。',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="zh-CN">
        <body>{children}</body>
    </html>
);

export default RootLayout;
