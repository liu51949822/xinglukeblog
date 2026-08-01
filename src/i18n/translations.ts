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
      name: '行路客',
      role: '全栈工程师 · Java 为主 · 会 AI 写代码，什么都能上手',
      brief: 'Java 出身转全栈 | 做过无人驾驶数据、智慧城市、MES 生产系统',
      emailLabel: '联系我',
      aboutBtn: '关于我',
      askBtn: '💼 问我',
      projectsBtn: '我的项目',
      exportBtn: '📄 导出简历',
      skillsTitle: '🛠 会点什么',
      frontend: '前端',
      backend: '后端',
      database: '数据库/中间件',
      devops: '运维/DevOps',
      aiCodingTitle: '🤖 关于 AI 写代码',
      aiCodingDesc: '平时重度用 AI 辅助写代码，Java、前端、脚本都能快速上手。不是吹，效率确实高很多。',
      projectsTitle: '📦 做过什么',
      projects: [
        { title: 'IMPS MES 黑灯生产系统', desc: '工厂黑灯生产管理系统，千人以上工厂在用' },
        { title: '智网智慧城市平台', desc: '智慧城市数据平台，无人机集群监控我带过' },
        { title: '这个博客', desc: 'Next.js 15 全栈博客，就是你现在看的这个' },
      ],
      viewProject: '去看看',
      experienceTitle: '📈 干过什么',
      experiences: [
        '2024.01 - 至今：Titan 无人驾驶数据接入与处理，顺带接远程活',
        '2022.10 - 2023.12：中科大脑智慧城市，UAV 集群监控项目负责人（带 3 人）',
        '2021.02 - 2022.03：江北某研究所，3 个月升职加薪，带 9 人团队',
        '2018.07 起：MES 生产系统，工厂数字化核心项目，后面很多项目都从它演化',
        '2018.04：从机械转岗物联网研发，正式开始写代码',
      ],
    },
    // 知识库介绍模块（5W 模式：我是谁 / 能干什么 / 做到怎样 / 凭什么 / 对谁有用）
    kb: {
      badge: '💼 关于我的小档案',
      title: '几秒了解我这个人',
      subtitle: '把简历做成了能问答的小知识库，问它就行',
      // 5W
      whoTitle: '我是谁',
      whoDesc: '一个以 Java 为核心的全栈工程师。写过无人驾驶数据、智慧城市、MES 生产系统，从机械工程师转行过来，也带过团队。',
      whatTitle: '能干什么',
      whatDesc: '从需求到上线能独立搞定：后端 Spring 一套、前端 React/Next.js、数据库缓存消息队列、Docker 部署 CI/CD，都能上手。',
      howWellTitle: '做得怎么样',
      howWellDesc: '独立交付过完整项目，做过 P6 级别 offer 验证过能力，带过 3~9 人的团队。AI 辅助下全语言开发上手很快。',
      whyTitle: '为什么能做到',
      whyDesc: '科班机械出身但转行做了 7 年软件，跨界经验让我既懂业务又懂工程。长期用 AI 写代码，效率比传统方式高不少。',
      forWhomTitle: '对谁有用',
      forWhomDesc: '需要全栈工程师的团队、想找能独立交付的远程开发者、以及需要有人既写代码又懂业务的公司。',
      // 技术说明
      techTitle: '🧩 这个小知识库怎么做的',
      techItems: [
        '把技能、经历、项目拆成 19 条小知识块',
        '用中文分词 + 关键词打分找到最相关的内容',
        '拼给 DeepSeek 生成口语化的回答',
      ],
      limitTitle: '目前还有哪些不足',
      limitItems: [
        '没有向量库，只靠关键词，问得太偏可能答不准',
        '知识块是手工维护的，更新要手动',
        '长尾问题命中率一般，复杂问题可能答不全',
      ],
      planTitle: '可以怎么改进',
      planItems: [
        '上 embedding 向量检索，理解更准',
        '知识自动从简历配置同步，不用手工改',
        '支持多轮追问，越问越准',
      ],
      exampleTitle: '💡 可以这样问它',
      examples: ['他会什么技术？', '做过什么项目？', '适合远程开发吗？'],
      cta: '🚀 去问它',
      ctaDesc: '点进去就能提问，基于上面的小档案回答',
    },
    // 知识问答页
    chat: {
      title: '💼 问问我',
      subtitle: '基于我的小档案回答，想问技能、经历、项目都行',
      placeholder: '想问点啥？',
      emptyTitle: '💡 可以这样问：',
      thinking: '翻档案回答中...',
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
      role: 'Full-stack · Java-first · AI-assisted, quick to pick up any language',
      brief: 'Java background turned full-stack | self-driving data, smart city, MES',
      emailLabel: 'Contact',
      aboutBtn: 'About',
      askBtn: '💼 Ask Me',
      projectsBtn: 'Projects',
      exportBtn: '📄 Export Resume',
      skillsTitle: '🛠 Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'DB / Middleware',
      devops: 'DevOps',
      aiCodingTitle: '🤖 About AI coding',
      aiCodingDesc: 'Heavy AI-assisted coding daily. Java, frontend, scripts — quick to pick up. Honestly, it makes me a lot more productive.',
      projectsTitle: '📦 Projects',
      projects: [
        { title: 'IMPS MES Lights-out System', desc: 'Factory lights-out production management, used by 1000+ workers' },
        { title: 'Smart City Platform', desc: 'Smart city data platform, led UAV cluster monitoring' },
        { title: 'This Blog', desc: 'Full-stack blog on Next.js 15 — the one you are reading now' },
      ],
      viewProject: 'View',
      experienceTitle: '📈 Experience',
      experiences: [
        '2024.01 - now: Titan self-driving data ingestion & processing, plus remote gigs',
        '2022.10 - 2023.12: Smart city R&D, led UAV cluster monitoring (managed 3)',
        '2021.02 - 2022.03: Research institute, promoted in 3 months, managed 9',
        'Since 2018.07: MES production system, core factory digitalization, many projects evolved from it',
        '2018.04: Switched from mechanical to IoT R&D, started writing code',
      ],
    },
    // Knowledge base module (5W: who / what / how well / why / for whom)
    kb: {
      badge: '💼 My little profile',
      title: 'Get to know me in seconds',
      subtitle: 'Turned my resume into a Q&A knowledge base — just ask',
      whoTitle: 'Who I am',
      whoDesc: 'A Java-core full-stack engineer. Built self-driving data, smart city, and MES systems. Started as a mechanical engineer, switched to software, and led teams along the way.',
      whatTitle: 'What I can do',
      whatDesc: 'End-to-end from requirements to launch: Spring backend, React/Next.js frontend, databases/cache/message queues, Docker deployment and CI/CD — all doable.',
      howWellTitle: 'How well',
      howWellDesc: 'Delivered complete projects independently, validated by a P6-level offer, led teams of 3 to 9. With AI assistance, I pick up new languages fast.',
      whyTitle: 'Why I can',
      whyDesc: 'Cross-domain background — mechanical to 7 years of software — means I understand both business and engineering. Long-time AI-assisted coding makes me far more efficient.',
      forWhomTitle: 'Who it helps',
      forWhomDesc: 'Teams needing a full-stack engineer, people looking for an independent remote developer, and companies that want someone who codes and understands business.',
      techTitle: '🧩 How this little KB works',
      techItems: [
        'Skills, experience, projects split into 19 small chunks',
        'Chinese n-gram tokenization + keyword scoring finds the most relevant bits',
        'Fed to DeepSeek to generate natural answers',
      ],
      limitTitle: 'Current limitations',
      limitItems: [
        'No vector store, keyword-only — obscure questions may miss',
        'Chunks are manually maintained, updates need manual work',
        'Long-tail questions hit less often',
      ],
      planTitle: 'How it can improve',
      planItems: [
        'Add embedding vector search for better understanding',
        'Auto-sync knowledge from resume config, no manual edits',
        'Support multi-turn follow-ups',
      ],
      exampleTitle: '💡 Try asking it',
      examples: ['What tech does he know?', 'What projects has he done?', 'Good for remote dev?'],
      cta: '🚀 Ask it',
      ctaDesc: 'Click in and ask — answers based on the little profile above',
    },
    // Chat page
    chat: {
      title: '💼 Ask Me',
      subtitle: 'Answers from my little profile — skills, experience, projects',
      placeholder: 'What do you want to know?',
      emptyTitle: '💡 Try asking:',
      thinking: 'Checking profile...',
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
