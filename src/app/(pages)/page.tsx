import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { ResumeHome } from '../_components/home/ResumeHome';

export const generateMetadata = async (
    _metadata: Record<string, any>,
    parent: ResolvingMetadata,
): Promise<Metadata> => ({
    title: `全栈工程师简历 | 行路客（Java/Spring/React/Next.js）`,
    description:
        '行路客 · 全栈软件工程师。Java 为核心，AI Coding 全语言胜任。MES 生产系统服务全球最大缝制设备商 7 家工厂（500~20000人）、无人驾驶数据处理、智慧城市 UAV 监控。接受远程工作。',
    keywords: [
        '全栈工程师', 'Java开发', 'Spring Boot', 'React', 'Next.js',
        'MES生产系统', '无人驾驶数据处理', '智慧城市', '远程工作', 'Java工程师求职',
    ],
});

// 简历结构化数据（schema.org Person），提升搜索引擎识别
const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '行路客',
    jobTitle: '全栈软件工程师',
    email: 'mailto:1240332437@qq.com',
    knowsAbout: [
        'Java', 'Spring Boot', 'Spring Cloud', 'React', 'Next.js',
        'TypeScript', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes',
    ],
    hasCredential: '软件工程师（全栈，Java 核心）',
    sameAs: [
        'https://blog.csdn.net/weixin_45530192',
        'https://github.com/liu51949822',
    ],
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
