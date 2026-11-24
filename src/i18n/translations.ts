import type { Locale } from './store';

/**
 * 核心页面中英文文案字典
 * 覆盖：导航栏、简历式首页、知识库模块、知识问答页
 * 文案尽量口语化、去 AI 味
 */
export const translations = {
    zh: {
        // 导航
        nav: {
            home: '首页',
            about: '关于我',
            webnav: '导航',
            message: '留言',
            knowledge: '知识问答',
            blog: '博客',
        },
        // 语言切换按钮
        langBtn: 'EN',
        langTitle: 'English',
        // 简历式首页
        home: {
            name: '刘仁杰',
            role: '高级 AI Agent / 应用 AI 工程师 · Agent 平台与后端',
            brief: '9 年后端、平台与复杂系统经验，专注生产级 AI Agent，曾远程参与纽约团队研发。',
            emailLabel: '联系我',
            contactTitle: '📮 联系方式',
            wechatLabel: '微信',
            githubLabel: 'GitHub',
            copyTip: '已复制',
            radarTitle: '📊 能力雷达',
            prefTitle: '📍 求职意向',
            prefCity: '期望城市',
            prefSalary: '期望薪资',
            prefAvailable: '到岗时间',
            prefType: '工作性质',
            aboutBtn: '关于我',
            askBtn: '💼 知识问答',
            projectsBtn: '我的项目',
            exportBtn: '📄 导出简历',
            skillsTitle: '🛠 技能栈',
            ai: 'AI Agent',
            data: '数据与检索',
            platform: '平台工程',
            web: 'Web / 自动化',
            frontend: '前端',
            backend: '后端',
            database: '数据库/中间件',
            devops: '运维/DevOps',
            remoteCollaboration: '远程协作工具',
            aiCodingTitle: '🤖 生产级 Agent 工程',
            aiCodingDesc:
                '以 Go / TypeScript 后端能力交付生产级 Agent，覆盖 OpenAI Agents SDK、planner/executor 编排、Temporal 工作流、MCP 工具、RAG 与记忆，并结合评估、可观测性和人工确认保障可靠性。',
            aiAgentTitle: '🔄 Agent 项目作品集',
            aiAgentDesc:
                '从 Zingage 生产级语音 Agent、Titan MCP 运维巡检与企业知识库，到多智能体咨询辅助系统，展示编排、检索、工具调用与端到端交付实践。',
            aiAgentBtn: '查看详情',
            projectsTitle: '📦 项目经历',
            projects: [
                {
                    title: 'Zingage 生产级语音 Agent',
                    desc: '实时语音链路、planner/executor 编排、Temporal 工作流与评估，远程协作纽约团队',
                },
                {
                    title: 'Titan MCP 运维巡检与企业知识库',
                    desc: 'Go MCP 工具与告警链路，多源 ETL、Milvus 检索与 RAG',
                },
                {
                    title: '多智能体咨询辅助系统',
                    desc: '任务拆解、RAG、记忆与 SSE 流式输出，结合人工确认；仅作咨询辅助，不替代专业医疗建议',
                },
            ],
            viewProject: '查看项目',
            experienceTitle: '📈 工作经历',
            experiences: [
                '2026.01 - 2026.10：Zingage · Agent 软件工程师，远程协作纽约团队，交付语音 Agent、编排与评估',
                '2024.01 - 2026.01：Titan · 云端工程师，负责 MCP 运维巡检、知识库 ETL、通信网关与实时数据平台',
                '2020.03 - 2024.01：中科大脑 · 技术经理，负责核心后端、飞控平台、数据隔离与工程质量，协调团队和客户交付',
                '2017.01 - 2020.03：杰克集团 · Java 工程师，参与生产管理系统核心模块与客户化交付',
                '2017：苏州大学应用技术学院 · 自动化专业，本科毕业',
            ],
        },
        // 知识库介绍模块（5W：Who / What / How well / Why / For whom）
        kb: {
            badge: '💼 个人能力知识库',
            title: '关于本人的简要档案',
            subtitle: '将个人技能与经历整理为可交互问答的知识库',
            // 5W
            whoTitle: '我是谁',
            whoDesc:
                '刘仁杰（Liu Renjie），网名行路客。高级 AI Agent / 应用 AI 工程师，专注 Agent 平台与后端，拥有 9 年后端、平台与复杂系统经验。',
            whatTitle: '能做什么',
            whatDesc:
                '交付生产级语音 Agent、MCP 工具、RAG 与多智能体系统，覆盖 Go / TypeScript 后端、工作流编排、数据链路、评估及上线运维。',
            howWellTitle: '能力水平',
            howWellDesc:
                '在 Zingage 交付生产级语音 Agent，在 Titan 落地 MCP 运维巡检与企业知识库；具备从需求到上线的交付能力，以及技术管理和客户协作经验。',
            whyTitle: '能力来源',
            whyDesc:
                '9 年后端、平台与复杂系统实践，涵盖实时通信、数据平台和生产级 Agent；将业务理解、系统可靠性与可评估的 AI 工程结合。',
            forWhomTitle: '适用对象',
            forWhomDesc:
                '需要生产级 AI Agent、Agent 平台与后端交付的团队；支持远程协作，具备纽约团队研发经验。',
            // 技术说明
            techTitle: '🧩 知识库技术说明',
            techItems: [
                '将简历中的技能、经历与项目整理为结构化知识块',
                '采用中文分词与关键词权重打分实现内容检索',
                '将检索结果交由 DeepSeek 生成回答',
            ],
            limitTitle: '当前局限',
            limitItems: [
                '目前为轻量 md 知识库 + 关键词检索，未引入 embedding 语义向量，长尾问题命中率有限',
                '复杂问题的回答完整性有待提升',
                '知识库主要依赖简历配置中的既有信息',
            ],
            planTitle: '可改进方向',
            planItems: [
                '引入 embedding 语义向量检索，提升对同义、抽象问题的理解',
                '知识内容自动同步自简历配置',
                '支持多轮追问，提升回答准确性',
            ],
            exampleTitle: '💡 示例问题',
            examples: [
                '刘仁杰在 Zingage 如何交付语音 Agent？',
                'Titan 的 MCP 运维巡检与 RAG 项目做了什么？',
                '多智能体项目如何编排任务并引入人工确认？',
            ],
            cta: '🚀 进入知识问答',
            ctaDesc: '点击进入问答页面，基于上述知识库回答',
        },
        // 知识问答页
        chat: {
            title: '💼 个人知识问答',
            subtitle: '基于个人档案回答关于技能、经历、项目与求职方向的问题',
            placeholder: '请输入问题',
            emptyTitle: '💡 可尝试以下问题：',
            thinking: '检索知识库并生成回答中...',
            inputPlaceholder: '输入你的问题...',
            send: '发送',
            sendIcon: '发送',
        },
        // 简历导出
        resumeExport: {
            pageTitle: '📄 导出简历 PDF',
            langLabel: '简历语言：',
            zhResume: '中文简历',
            enResume: 'English Resume',
            wechatLabel: '微信',
            sectionLabel: '选择导出章节：',
            skill: '技能',
            project: '项目',
            experience: '经历',
            exportBtn: '🖨️ 导出 PDF',
            back: '← 返回首页',
            prefCity: '期望城市',
            prefSalary: '期望薪资',
            prefAvailable: '到岗时间',
            prefType: '工作性质',
            // 中文简历内容
            zh: {
                name: '刘仁杰',
                role: '高级 AI Agent / 应用 AI 工程师 · Agent 平台与后端',
                emailLabel: '邮箱',
                skillsTitle: '技能',
                ai: 'AI Agent',
                data: '数据与检索',
                platform: '平台工程',
                web: 'Web / 自动化',
                frontend: '前端',
                backend: '后端',
                database: '数据库/中间件',
                devops: '运维/DevOps',
                remoteCollaboration: '远程协作工具',
                projectsTitle: '项目经历',
                experienceTitle: '工作经历',
                aiCodingTitle: '生产级 Agent 工程',
                aiCodingDesc:
                    '9 年后端、平台与复杂系统经验，曾远程协作纽约团队。交付 Zingage 语音 Agent、Titan MCP 运维巡检与 RAG，并实践多智能体编排；覆盖 Go / TypeScript、Temporal 工作流、工具调用、记忆、评估与可观测性。',
            },
            // 英文简历内容
            en: {
                name: 'Liu Renjie',
                role: 'Senior AI Agent / Applied AI Engineer · Agent Platform & Backend',
                emailLabel: 'Email',
                skillsTitle: 'Skills',
                ai: 'AI Agent',
                data: 'Data & Retrieval',
                platform: 'Platform Engineering',
                web: 'Web / Automation',
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'DB / Middleware',
                devops: 'DevOps',
                remoteCollaboration: 'Remote Collaboration Tools',
                projectsTitle: 'Projects',
                experienceTitle: 'Experience',
                aiCodingTitle: 'Production Agent Engineering',
                aiCodingDesc:
                    '9 years in backend, platforms and complex systems, including remote NYC collaboration. Delivered Zingage voice agents, Titan MCP operations monitoring and RAG, with multi-agent orchestration practice spanning Go / TypeScript, Temporal workflows, tool calling, memory, evaluation and observability.',
            },
        },
    },
    en: {
        // Nav
        nav: {
            home: 'Home',
            about: 'About',
            webnav: 'Links',
            message: 'Message',
            knowledge: 'Q&A',
            blog: 'Blog',
        },
        langBtn: '中',
        langTitle: '中文',
        // Resume home
        home: {
            name: 'Liu Renjie',
            role: 'Senior AI Agent / Applied AI Engineer · Agent Platform & Backend',
            brief: '9 years in backend, platforms and complex systems. Focused on production AI agents, with remote NYC team experience.',
            emailLabel: 'Contact',
            contactTitle: '📮 Contact',
            wechatLabel: 'WeChat',
            githubLabel: 'GitHub',
            copyTip: 'Copied',
            radarTitle: '📊 Skill Radar',
            prefTitle: '📍 Job Preference',
            prefCity: 'Expected City',
            prefSalary: 'Expected Salary',
            prefAvailable: 'Availability',
            prefType: 'Work Type',
            aboutBtn: 'About',
            askBtn: '💼 Knowledge Q&A',
            projectsBtn: 'Projects',
            exportBtn: '📄 Export Resume',
            skillsTitle: '🛠 Skills',
            ai: 'AI Agent',
            data: 'Data & Retrieval',
            platform: 'Platform Engineering',
            web: 'Web / Automation',
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'DB / Middleware',
            devops: 'DevOps',
            remoteCollaboration: 'Remote Collaboration Tools',
            aiCodingTitle: '🤖 Production Agent Engineering',
            aiCodingDesc:
                'Builds production agents on Go / TypeScript backends with OpenAI Agents SDK, planner/executor orchestration, Temporal workflows, MCP tools, RAG and memory. Uses evaluation, observability and human review to support reliability.',
            aiAgentTitle: '🔄 Agent Project Portfolio',
            aiAgentDesc:
                'Zingage production voice agents, Titan MCP operations monitoring and enterprise knowledge retrieval, and multi-agent consultation support demonstrate orchestration, retrieval, tool calling and end-to-end delivery.',
            aiAgentBtn: 'View',
            projectsTitle: '📦 Projects',
            projects: [
                {
                    title: 'Zingage Production Voice Agents',
                    desc: 'Real-time voice, planner/executor orchestration, Temporal workflows and evaluation, delivered remotely with a NYC team',
                },
                {
                    title: 'Titan MCP Operations & Enterprise Knowledge',
                    desc: 'Go MCP tools and alerting, multi-source ETL, Milvus retrieval and RAG',
                },
                {
                    title: 'Multi-Agent Consultation Support',
                    desc: 'Task decomposition, RAG, memory and SSE streaming with human review; consultation support only, not a substitute for professional medical advice',
                },
            ],
            viewProject: 'View Project',
            experienceTitle: '📈 Experience',
            experiences: [
                '2026.01 - 2026.10: Zingage · Agent Software Engineer, remote NYC collaboration on voice agents, orchestration and evaluation',
                '2024.01 - 2026.01: Titan · Cloud Engineer, MCP operations monitoring, knowledge ETL, communication gateways and real-time data platforms',
                '2020.03 - 2024.01: Zhongke Danao · Technical Manager, core backend, flight-control platforms, data isolation, engineering quality and team/client delivery',
                '2017.01 - 2020.03: Jack Group · Java Engineer, core production-management modules and client delivery',
                "2017: Applied Technology College of Soochow University · Bachelor's degree in Automation",
            ],
        },
        // Knowledge base module (5W)
        kb: {
            badge: '💼 Personal Knowledge Base',
            title: 'A Brief Profile',
            subtitle:
                'Personal skills and experience organized into an interactive Q&A knowledge base',
            whoTitle: 'Who I Am',
            whoDesc:
                'Liu Renjie (刘仁杰), also known as Xingluke (行路客). Senior AI Agent / Applied AI Engineer focused on Agent Platform & Backend, with 9 years in backend, platforms and complex systems.',
            whatTitle: 'What I Can Do',
            whatDesc:
                'Delivers production voice agents, MCP tools, RAG and multi-agent systems, spanning Go / TypeScript backends, workflow orchestration, data pipelines, evaluation and operations.',
            howWellTitle: 'Competency',
            howWellDesc:
                'Delivered production voice agents at Zingage and MCP operations monitoring and enterprise knowledge retrieval at Titan. Brings requirements-to-launch delivery, technical management and client collaboration experience.',
            whyTitle: 'Foundation',
            whyDesc:
                '9 years of backend, platform and complex-systems work across real-time communications, data platforms and production agents, combining business understanding, system reliability and evaluable AI engineering.',
            forWhomTitle: 'Who It Serves',
            forWhomDesc:
                'Teams building production AI agents, agent platforms and backend systems. Open to remote collaboration, with experience working with a New York City engineering team.',
            techTitle: '🧩 Knowledge Base Technical Notes',
            techItems: [
                'Resume skills, experience and projects organized into structured knowledge chunks',
                'Chinese tokenization and keyword-weighted scoring for content retrieval',
                'Retrieved context handed to DeepSeek for answer generation',
            ],
            limitTitle: 'Current Limitations',
            limitItems: [
                'Currently a lightweight md knowledge base with keyword retrieval, without embedding-based semantic vectors, limiting long-tail query accuracy',
                'Answer completeness for complex questions needs improvement',
                'Knowledge base relies mainly on information already in the resume config',
            ],
            planTitle: 'Improvement Directions',
            planItems: [
                'Introduce embedding semantic vector retrieval for better understanding of synonyms and abstract questions',
                'Auto-sync knowledge from resume configuration',
                'Support multi-turn follow-ups for better accuracy',
            ],
            exampleTitle: '💡 Example Questions',
            examples: [
                'How did Liu Renjie deliver voice agents at Zingage?',
                'What did he build for Titan MCP operations monitoring and RAG?',
                'How does the multi-agent project orchestrate tasks and include human review?',
            ],
            cta: '🚀 Enter Knowledge Q&A',
            ctaDesc: 'Click to enter the Q&A page, answers based on the knowledge base above',
        },
        // Chat page
        chat: {
            title: '💼 Personal Knowledge Q&A',
            subtitle:
                'Answers about skills, experience, projects, and job direction based on the profile',
            placeholder: 'Enter a question',
            emptyTitle: '💡 Try these:',
            thinking: 'Searching knowledge base and generating answer...',
            inputPlaceholder: 'Type your question...',
            send: 'Send',
            sendIcon: 'Send',
        },
        // Resume export
        resumeExport: {
            pageTitle: '📄 Export Resume PDF',
            langLabel: 'Language:',
            zhResume: '中文简历',
            enResume: 'English Resume',
            wechatLabel: 'WeChat',
            sectionLabel: 'Select sections:',
            skill: 'Skills',
            project: 'Projects',
            experience: 'Experience',
            exportBtn: '🖨️ Export PDF',
            prefCity: 'City',
            prefSalary: 'Salary',
            prefAvailable: 'Availability',
            prefType: 'Type',
            back: '← Back',
            zh: {
                name: '刘仁杰',
                role: '高级 AI Agent / 应用 AI 工程师 · Agent 平台与后端',
                emailLabel: '邮箱',
                skillsTitle: '技能',
                ai: 'AI Agent',
                data: '数据与检索',
                platform: '平台工程',
                web: 'Web / 自动化',
                frontend: '前端',
                backend: '后端',
                database: '数据库/中间件',
                devops: '运维/DevOps',
                remoteCollaboration: '远程协作工具',
                projectsTitle: '项目经历',
                experienceTitle: '工作经历',
                aiCodingTitle: '生产级 Agent 工程',
                aiCodingDesc:
                    '9 年后端、平台与复杂系统经验，曾远程协作纽约团队。交付 Zingage 语音 Agent、Titan MCP 运维巡检与 RAG，并实践多智能体编排；覆盖 Go / TypeScript、Temporal 工作流、工具调用、记忆、评估与可观测性。',
            },
            en: {
                name: 'Liu Renjie',
                role: 'Senior AI Agent / Applied AI Engineer · Agent Platform & Backend',
                emailLabel: 'Email',
                skillsTitle: 'Skills',
                ai: 'AI Agent',
                data: 'Data & Retrieval',
                platform: 'Platform Engineering',
                web: 'Web / Automation',
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'DB / Middleware',
                devops: 'DevOps',
                remoteCollaboration: 'Remote Collaboration Tools',
                projectsTitle: 'Projects',
                experienceTitle: 'Experience',
                aiCodingTitle: 'Production Agent Engineering',
                aiCodingDesc:
                    '9 years in backend, platforms and complex systems, including remote NYC collaboration. Delivered Zingage voice agents, Titan MCP operations monitoring and RAG, with multi-agent orchestration practice spanning Go / TypeScript, Temporal workflows, tool calling, memory, evaluation and observability.',
            },
        },
    },
} as const;

type WidenTranslation<T> = T extends string
    ? string
    : T extends readonly (infer Item)[]
      ? readonly WidenTranslation<Item>[]
      : { [Key in keyof T]: WidenTranslation<T[Key]> };

export type Translation = WidenTranslation<typeof translations.zh>;
export type TranslationKey = keyof Translation;

/**
 * 获取指定语言的文案
 */
export function getTranslation(locale: Locale): Translation {
    return translations[locale];
}
