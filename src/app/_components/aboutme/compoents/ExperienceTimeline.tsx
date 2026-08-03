'use client';

import type { FC } from 'react';

import { useResumeExperiences } from '@/store/resume';
import { useLocale } from '@/i18n/store';

import { AboutTimeline } from './timeLine';
import type { TimelineType } from './timeLine';

/**
 * 经历时间线（客户端组件）
 * 与首页共享同一数据源（resume store / 配置文件），
 * 在 /resume-admin 配置经历后，此处与首页同步更新。
 * 内容按当前语言取中/英文。
 */
export const ExperienceTimeline: FC = () => {
    const experiences = useResumeExperiences();
    const locale = useLocale();

    const data: TimelineType[] = experiences.map((item) => ({
        title: item.time,
        content: locale === 'en' ? item.content.en : item.content.zh,
    }));

    return <AboutTimeline data={data} />;
};
