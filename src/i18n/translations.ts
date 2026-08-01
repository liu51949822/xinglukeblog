import type { Locale } from './store';

/**
 * 核心页面中英文文案字典
 * 覆盖：导航栏、简历式首页、知识库模块、知识问答页
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
      name: '行路客',
      role: '全栈软件工程师 · 以 Java 为核心 · AI Coding 全语言胜任',
      brief: '多年 Java 经验转型全栈 | 无人驾驶数据处理 | 智慧城市 | MES 生产系统',
      emailLabel: '联系我',
      aboutBtn: '关于我',
      askBtn: '💼 求职知识问答',
      projectsBtn: '我的项目',
      skillsTitle: '🛠 技能栈',
      frontend: '前端',
      backend: '后端',
      database: '数据库/中间件',
      devops: '运维/DevOps',
      aiCodingTitle: '🤖 AI Coding 能力',
      aiCodingDesc: '熟练运用 AI 辅助编程（vibing coding），可快速胜任 Java、前端、脚本等全语言开发，显著提升开发效率与跨语言适应能力。',
      projectsTitle: '📦 项目经历',
      projects: [
        { title: 'IMPS MES 黑灯生产系统', desc: '工厂黑灯生产管理系统，面向千人以上工厂的信息化数字化' },
        { title: '智网智慧城市平台', desc: '智慧城市数据平台，UAV 集群城市监控项目负责人' },
        { title: '博客系统', desc: '基于 Next.js 15 + React 19 + Prisma 的全栈博客' },
      ],
      viewProject: '查看项目',
      experienceTitle: '📈 关键经历',
      experiences: [
        '2024.01 - 至今：Titan 无人驾驶数据接入与处理，尝试远程兼职',
        '2022.10 - 2023.12：中科大脑智慧城市，UAV 集群城市监控项目负责人（管理 3 人团队）',
        '2021.02 - 2022.03：江北某研究所，3 个月升职加薪，管理 9 人团队',
        '2018.07 起：MES 生产系统，工厂信息化数字化核心项目',
        '2018.04：从机械工程师内部转岗物联网研发，开启软件生涯',
      ],
    },
    // 知识库介绍模块
    kb: {
      badge: '💼 求职知识库',
      title: '快速了解我',
      subtitle: 'AI 驱动的个人求职知识库，方便你在几秒内了解我的能力与经历',
      introTitle: '我是谁',
      introDesc: '一位以 Java 为核心的全栈软件工程师，多年后端经验，结合 AI Coding 可快速胜任全语言开发。做过无人驾驶数据处理、智慧城市、MES 生产系统等真实项目，既有技术深度也有团队管理经验。',
      skillsTitle: '核心能力',
      skills: ['Java / Spring 全家桶', 'React / Next.js 前端', 'MySQL / Redis / Kafka', 'Docker / K8s / CI-CD'],
      recommendTitle: '自我推荐',
      recommendDesc: '我既能独立完成从需求到上线的完整交付，也能快速学习并落地新技术。远程工作、团队协作、项目攻坚，都是我的强项。欢迎来知识库提问了解我！',
      techTitle: '🧩 知识库技术栈',
      techDesc: '本知识库采用「关键词检索 + 大模型生成」的 RAG 方案：',
      techItems: [
        '知识切块：将技能、经历、项目整理为 19 个结构化知识块',
        '中文检索：n-gram 分词 + 标签权重打分，精准定位相关问题',
        'RAG 增强：检索结果拼接为上下文，交由 DeepSeek 生成专业回答',
      ],
      whyTitle: '❓ 为什么这么做',
      whyItems: [
        '需求：让招聘方 / 访客快速了解求职者的真实能力',
        '难点：中文分词难、知识检索准确率、回答可信度',
        '现状问题：无向量库，靠关键词召回，长尾问题命中率有限',
        '可改进：引入 embedding 向量检索、知识自动更新、多轮追问',
      ],
      exampleTitle: '💡 试试这样问',
      examples: ['他的技术栈有哪些？', '有什么项目经验？', '求职方向是什么？'],
      cta: '🚀 去知识库提问',
      ctaDesc: '点击进入知识问答页面，基于知识库回答你的问题',
    },
    // 知识问答页
    chat: {
      title: '💼 求职知识库问答',
      subtitle: '基于知识库回答关于技能、经历、项目与求职方向的问题',
      placeholder: '问关于他的技能、经历、项目...',
      emptyTitle: '💡 试试问：',
      thinking: '正在检索知识库并回答...',
      inputPlaceholder: '输入你的问题...',
      send: '发送',
      sendIcon: '发送',
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
      name: 'Xingluke',
      role: 'Full-stack Engineer · Java-core · AI Coding across languages',
      brief: 'Java veteran turned full-stack | Autonomous driving data | Smart city | MES',
      emailLabel: 'Contact',
      aboutBtn: 'About Me',
      askBtn: '💼 Ask My Resume',
      projectsBtn: 'Projects',
      skillsTitle: '🛠 Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'DB / Middleware',
      devops: 'DevOps',
      aiCodingTitle: '🤖 AI Coding',
      aiCodingDesc: 'Proficient with AI-assisted coding (vibing coding), quickly handling Java, frontend, scripts and more — boosting efficiency and cross-language adaptability.',
      projectsTitle: '📦 Projects',
      projects: [
        { title: 'IMPS MES Lights-out System', desc: 'Factory lights-out production management for 1000+ workers' },
        { title: 'Smart City Platform', desc: 'Smart city data platform, led UAV cluster monitoring project' },
        { title: 'Blog System', desc: 'Full-stack blog built with Next.js 15 + React 19 + Prisma' },
      ],
      viewProject: 'View',
      experienceTitle: '📈 Highlights',
      experiences: [
        '2024.01 - now: Titan autonomous driving data ingestion & processing, remote freelancing',
        '2022.10 - 2023.12: Smart city R&D, led UAV cluster monitoring (managed 3)',
        '2021.02 - 2022.03: Research institute, promoted in 3 months, managed 9',
        'Since 2018.07: MES production system, factory digitalization core project',
        '2018.04: Transferred from mechanical to IoT R&D, starting software career',
      ],
    },
    // Knowledge base module
    kb: {
      badge: '💼 Resume Knowledge Base',
      title: 'Know Me in Seconds',
      subtitle: 'AI-powered resume knowledge base — understand my skills and experience quickly',
      introTitle: 'Who I Am',
      introDesc: 'A Java-core full-stack software engineer with years of backend experience. Using AI Coding, I can quickly adapt to any language. I have built real systems: autonomous driving data processing, smart city, and MES production systems — with both technical depth and team leadership.',
      skillsTitle: 'Core Skills',
      skills: ['Java / Spring ecosystem', 'React / Next.js frontend', 'MySQL / Redis / Kafka', 'Docker / K8s / CI-CD'],
      recommendTitle: 'Why Me',
      recommendDesc: 'I can deliver end-to-end, from requirements to production. I learn and adopt new tech fast. Remote work, collaboration, and tackling tough projects are my strengths. Ask the knowledge base to know more!',
      techTitle: '🧩 Tech Stack',
      techDesc: 'This knowledge base uses a "keyword retrieval + LLM generation" RAG approach:',
      techItems: [
        'Chunking: skills, experience, projects organized into 19 structured chunks',
        'Chinese retrieval: n-gram tokenization + tag-weighted scoring for accurate hits',
        'RAG generation: retrieved context fed to DeepSeek for professional answers',
      ],
      whyTitle: '❓ Design Notes',
      whyItems: [
        'Need: let recruiters/visitors quickly learn real capabilities',
        'Challenge: Chinese tokenization, retrieval accuracy, answer reliability',
        'Current limits: no vector store, keyword recall only, long-tail queries hit less',
        'Future: embedding vector search, auto knowledge refresh, multi-turn follow-up',
      ],
      exampleTitle: '💡 Try Asking',
      examples: ['What tech stack does he use?', 'What project experience?', 'What is his job target?'],
      cta: '🚀 Ask the Knowledge Base',
      ctaDesc: 'Go to the Q&A page — answers based on the knowledge base',
    },
    // Chat page
    chat: {
      title: '💼 Resume Knowledge Q&A',
      subtitle: 'Answers about skills, experience, projects and job direction from the knowledge base',
      placeholder: 'Ask about his skills, experience, projects...',
      emptyTitle: '💡 Try asking:',
      thinking: 'Searching knowledge base...',
      inputPlaceholder: 'Type your question...',
      send: 'Send',
      sendIcon: 'Send',
    },
  },
} as const;

export type Translation = typeof translations.zh;
export type TranslationKey = keyof Translation;

/**
 * 获取指定语言的文案
 */
export function getTranslation(locale: Locale): Translation {
  return translations[locale];
}
