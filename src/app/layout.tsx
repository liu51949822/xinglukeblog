import type { Metadata } from 'next';

import './styles/index.css';

import type { FC, PropsWithChildren } from 'react';

import { Analytics } from './_components/analytics/Analytics';

export const metadata: Metadata = {
    title: {
        default: '行路客 · 全栈工程师简历 | Java/Spring/React/Next.js',
        template: '%s | 行路客',
    },
    description:
        '行路客，全栈软件工程师，Java 为核心、AI Coding 全语言胜任。多年经验：MES 生产系统（服务全球最大缝制设备商 7 家工厂）、无人驾驶数据处理、智慧城市。提供 Java/Spring、React/Next.js、Docker/CI/CD 全栈开发与远程合作。',
    keywords: [
        '全栈工程师',
        'Java开发',
        'Spring Boot',
        'React',
        'Next.js',
        'MES 生产系统',
        '无人驾驶数据',
        '智慧城市',
        '远程工作',
        '软件工程师简历',
        '程序员求职',
    ],
    authors: [{ name: '行路客' }],
    openGraph: {
        title: '行路客 · 全栈工程师简历',
        description:
            'Java 为核心的全栈工程师，做过 MES 生产系统、无人驾驶数据、智慧城市，会 AI Coding 全语言开发。',
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
        <body>
            {children}
            {/* 访问统计埋点（百度 + Google） */}
            <Analytics />
        </body>
    </html>
);

export default RootLayout;
