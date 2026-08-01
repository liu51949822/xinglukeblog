'use client';

import type { FC } from 'react';

import { useResumeExperiences } from '@/store/resume';

import { AboutTimeline } from './timeLine';
import type { TimelineType } from './timeLine';

/**
 * 经历时间线（客户端组件）
 * 与首页共享同一数据源（resume store / 配置文件），
 * 在 /resume-admin 上传经历文档后，此处与首页同步更新。
 * 映射：{ time, content } -> { title: time, content }
 */
export const ExperienceTimeline: FC = () => {
    const experiences = useResumeExperiences();

    const data: TimelineType[] = experiences.map((item) => ({
        title: item.time,
        content: item.content,
    }));

    return <AboutTimeline data={data} />;
};
