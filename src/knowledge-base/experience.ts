/**
 * 求职知识库 - 工作经历 / 项目经历（自动生成）
 *
 * 经历与项目知识块从 src/config/resume.ts 自动生成，
 * 服务端读取代码配置，更新配置并重新构建部署后生效。
 * /resume-admin 的浏览器 localStorage 修改不会更新服务端知识库。
 */

import { resumeConfig } from '@/config/resume';

import type { KnowledgeChunk } from './profile';

/** 每条经历的关键词（从内容提取 + 补充行业词） */
const EXPERIENCE_KEYWORDS: Record<string, string[]> = {
    '2026.01–2026.10': [
        'Zingage',
        'Agent',
        '语音',
        'planner/executor',
        '评估',
        '后端',
        '远程',
        '纽约',
        'NYC',
        'remote',
    ],
    '2024.01–2026.01': [
        'Titan',
        '云端工程师',
        'Go',
        'MCP',
        '运维巡检',
        '企业知识库',
        'ETL',
        '车云通信',
        '实时数据',
    ],
    '2020.03–2024.01': [
        '中科大脑',
        'Zhongke Danao',
        '技术经理',
        '智慧城市',
        '飞控',
        '权限',
        '数据隔离',
        '实时日志',
        '工程质量',
        '团队',
        '客户交付',
    ],
    '2017.01–2020.03': [
        '杰克集团',
        'Jack Group',
        'Java',
        'MES',
        '生产管理',
        '客户化开发',
        '信息化',
        '数字化',
    ],
    '2017': [
        '苏州大学应用技术学院',
        'Soochow University',
        '自动化',
        '本科',
        '学历',
        '教育',
        '毕业',
    ],
};

/**
 * 从简历配置自动生成经历知识块
 */
function buildExperienceChunks(): KnowledgeChunk[] {
    return resumeConfig.experiences.map((exp, index) => ({
        id: `exp-auto-${index}`,
        tags: [exp.time, '经历', '工作', ...(EXPERIENCE_KEYWORDS[exp.time] || [])],
        content: `${exp.time}：${exp.content.zh}\n${exp.content.en}`,
    }));
}

/**
 * 从简历配置自动生成项目知识块
 */
function buildProjectChunks(): KnowledgeChunk[] {
    return resumeConfig.projects.map((project, index) => {
        const content = [
            `${project.title.zh} / ${project.title.en}`,
            `描述：${project.desc.zh}\n${project.desc.en}`,
            `技术栈：${project.tech.join('、')}`,
            ...(project.responsibility
                ? [`职责：${project.responsibility.zh}\n${project.responsibility.en}`]
                : []),
            ...project.highlights.map((item) => `亮点与成果：${item.zh}\n${item.en}`),
        ].join('\n');
        const keywords = content.match(/[A-Z][A-Z0-9.+/-]*|[\u4E00-\u9FFF]{2,}/gi) || [];

        return {
            id: `project-auto-${index}`,
            tags: [
                ...new Set([
                    project.title.zh,
                    project.title.en,
                    '项目',
                    '作品',
                    '案例',
                    '项目经历',
                    ...project.tech,
                    ...keywords,
                ]),
            ],
            content,
        };
    });
}

/**
 * 固定知识块（无法从配置自动生成的补充信息）
 */
const staticKnowledge: KnowledgeChunk[] = [
    {
        id: 'exp-freelance',
        tags: ['兼职', '远程', 'remote', '纽约', 'NYC', '跨时区', 'cross-timezone', '合作方式'],
        content:
            '接受全职、远程或兼职合作，有跨时区协作经验，曾在 Zingage 远程参与纽约团队研发。' +
            'Open to full-time, remote or freelance work, with cross-timezone experience working remotely with a New York City team at Zingage.',
    },
];

/** 自动生成的全部经历/项目知识块 */
export const experienceKnowledge: KnowledgeChunk[] = [
    ...buildExperienceChunks(),
    ...buildProjectChunks(),
    ...staticKnowledge,
];
