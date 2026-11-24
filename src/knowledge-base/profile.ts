/**
 * 求职知识库 - 个人信息与技能（技能部分自动生成）
 *
 * 技能类知识块从 src/config/me.ts 的 panels 自动生成，
 * 基本信息、求职方向、知识库说明为固定知识块。
 */

import { about } from '@/config/me';
import { resumeConfig } from '@/config/resume';

export interface KnowledgeChunk {
    /** 知识块唯一 id */
    id: string;
    /** 检索关键词 */
    tags: string[];
    /** 知识块内容 */
    content: string;
}

/**
 * 从 about.panels 自动生成技能知识块
 */
function buildSkillChunks(): KnowledgeChunk[] {
    const panels = about.panels;
    if (!panels) return [];

    const groups = [
        {
            id: 'ai-skills',
            title: panels.ai?.title || 'AI Agent 与应用 AI',
            tags: ['AI', 'Agent', '应用 AI', '智能体', '编排', '工具调用', '评估', 'RAG'],
            data: panels.ai?.data || [],
        },
        {
            id: 'frontend-skills',
            title: panels.front?.title || '前端与浏览器自动化',
            tags: ['前端', '浏览器自动化', '技能', '技术栈'],
            data: panels.front?.data || [],
        },
        {
            id: 'backend-skills',
            title: panels.back?.title || '后端与工作流',
            tags: ['后端', '工作流', '技能', '技术栈', '微服务'],
            data: panels.back?.data || [],
        },
        {
            id: 'database-middleware',
            title: panels.dataAndMiddleware?.title || '数据库与中间件',
            tags: ['数据库', '中间件', '实时数据', '时序存储'],
            data: panels.dataAndMiddleware?.data || [],
        },
        {
            id: 'devops-skills',
            title: panels.devOps?.title || '云原生交付与可观测性',
            tags: ['运维', 'DevOps', '云原生', '交付', '可观测性', 'CI/CD'],
            data: panels.devOps?.data || [],
        },
        {
            id: 'project-practice-skills',
            title: panels.doingSkill?.title || '项目实践',
            tags: ['项目实践', '语音', '记忆', '人工确认', 'Memory', 'HITL'],
            data: panels.doingSkill?.data || [],
        },
        {
            id: 'remote-collaboration-tools',
            title: panels.remoteCollaboration?.title || '远程协作工具',
            tags: ['远程', '协作', '工具', '技术栈', 'remote', 'collaboration', '跨时区', '异步'],
            data: panels.remoteCollaboration?.data || [],
        },
    ];

    return groups
        .filter((g) => g.data.length > 0)
        .map((g) => ({
            id: g.id,
            tags: [...new Set([...g.tags, ...g.data])],
            content: `${g.title}：${g.data.join('、')}。`,
        }));
}

/**
 * 固定知识块（无法从配置自动生成，需手工维护）
 */
const staticKnowledge: KnowledgeChunk[] = [
    {
        id: 'basic-info',
        tags: [
            '刘仁杰',
            'Liu Renjie',
            '行路客',
            'Xingluke',
            '姓名',
            '名字',
            '称呼',
            '基本信息',
            '联系方式',
            '邮箱',
            '性别',
            '我是谁',
            '你是谁',
            '这个人',
            '行路客是谁',
            '经验',
            '年限',
        ],
        content: `姓名：刘仁杰（Liu Renjie），网名行路客（Xingluke）；性别：${about.persion.sex}；邮箱：${resumeConfig.contact.email}。${
            resumeConfig.position.summary.zh
        }\n${resumeConfig.position.summary.en}`,
    },
    {
        id: 'career-position',
        tags: [
            '求职',
            '岗位',
            '职位',
            '定位',
            '方向',
            '目标',
            '找什么工作',
            'Senior',
            'Applied AI',
            'Agent',
            '远程',
            'remote',
            'NYC',
            '纽约',
            '薪资',
            '到岗',
        ],
        content:
            `求职定位：${resumeConfig.position.primary.zh}（${resumeConfig.position.primary.en}）。` +
            `方向：${resumeConfig.position.secondary.map((item) => item.zh).join('、')}。` +
            `核心能力：${resumeConfig.highlights.map((item) => item.zh).join('；')}。` +
            `期望城市：${resumeConfig.preference.city.zh}；工作性质：${resumeConfig.preference.type.zh}；` +
            `期望薪资：${resumeConfig.preference.salary.zh}；到岗时间：${resumeConfig.preference.availability.zh}。`,
    },
    {
        id: 'kb-intro',
        tags: [
            '你是谁',
            '我是谁',
            '这是谁',
            '这个网站',
            '知识库',
            '小档案',
            '系统介绍',
            '说明',
            '介绍',
            '你能干什么',
            '你是什么',
            '怎么实现的',
        ],
        content:
            '我是一个个人能力知识库问答助手，围绕高级 AI Agent / 应用 AI 工程师「刘仁杰（行路客）」整理的一份数字档案。' +
            '问任何关于他的技能、经历、项目、求职方向的问题，我都会基于档案内容回答。' +
            '这个知识库基于 Next.js 15 全栈博客构建，采用 RAG（检索增强生成）方案：' +
            '技能、经历、项目分别从简历配置（src/config）自动生成知识块，' +
            '服务端使用代码中的配置，配置更新并重新构建部署后生效；/resume-admin 的浏览器 localStorage 修改不会同步更新服务端知识库。' +
            '用中文 n-gram 分词 + 关键词权重打分检索最相关内容，再拼给 DeepSeek 大模型生成自然回答。' +
            '目前的程度：常见问题（技能、项目、求职）能答得不错，回答自然；' +
            '不足：没有向量库，只靠关键词召回，问得太偏或太抽象的问题可能答不准；' +
            '上下游：上游是简历配置（src/config/resume.ts、src/config/me.ts），下游是前端问答界面；' +
            '同类产品：类似 Airtable AI、Notion AI、各类基于知识库的智能问答机器人，' +
            '但这里是专为个人求职展示定制、代码开源的轻量实现。',
    },
    {
        id: 'ai-coding',
        tags: ['AI', 'Coding', 'SOP', '辅助编程', '智能编程', '协同开发'],
        content:
            'AI Coding 实践：使用 SOP/Markdown 文档驱动 AI Agent 协同开发，搭建 AI 云开发库与 Agent 协作流程；' +
            '结合 Go / TypeScript / Java / Python 后端能力进行工程交付。',
    },
    {
        id: 'ai-cloud-lib',
        tags: [
            'AI 云开发库',
            'gitee',
            '云端开发',
            'SOP',
            'Agent',
            '自我进化',
            '大模型应用',
            '开发文档',
        ],
        content:
            '大模型应用实践：在 Gitee 上维护 AI 云开发库，使用 SOP/Markdown 文档驱动 AI Agent 协同开发，' +
            '独立开发 Next.js 博客与 RAG 简历问答系统。',
    },
];

/** 个人信息与技能知识块（技能自动生成 + 固定知识块） */
export const profileKnowledge: KnowledgeChunk[] = [...buildSkillChunks(), ...staticKnowledge];
