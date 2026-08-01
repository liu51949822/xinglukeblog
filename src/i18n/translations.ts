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
      role: '全栈软件工程师 · 以 Java 为主 · AI 辅助跨语言开发',
      brief: 'Java 全栈方向 | 项目方向：MES 生产系统、无人驾驶数据处理、智慧城市',
      emailLabel: '联系我',
      aboutBtn: '关于我',
      askBtn: '💼 知识问答',
      projectsBtn: '我的项目',
      exportBtn: '📄 导出简历',
      skillsTitle: '🛠 技能栈',
      frontend: '前端',
      backend: '后端',
      database: '数据库/中间件',
      devops: '运维/DevOps',
      aiCodingTitle: '🤖 AI 辅助编程',
      aiCodingDesc: '日常大量使用 AI 辅助编程，覆盖 Java、前端与脚本等方向，显著提升开发效率。',
      aiAgentTitle: '🔄 AI 云开发库',
      aiAgentDesc: '在 Gitee 维护个人云端开发库，将常用开发方法与流程整理为 Markdown 文档（SOP），供 AI Agent 协同使用，并随使用持续演进。',
      aiAgentBtn: '查看详情',
      projectsTitle: '📦 项目经历',
      projects: [
        { title: 'IMPS MES 生产管理系统', desc: 'Jack（全球最大缝制设备商）配套软件，服务 7 家工厂（500~20000 人）' },
        { title: '无人驾驶数据处理', desc: '大规模无人设备数据的清洗、过滤与筛查，向下游输出有效数据' },
        { title: '博客 / 开源', desc: 'CSDN 技术博客 + Next.js 全栈博客 + Gitee AI 开发库' },
      ],
      viewProject: '查看项目',
      experienceTitle: '📈 工作经历',
      experiences: [
        '2024.01 - 至今：Titan · 无人驾驶数据接入与处理，兼远程合作',
        '2022.10 - 2023.12：中科大脑 · 智慧城市研发，UAV 集群监控项目负责人（团队 3 人）',
        '2021.02 - 2022.03：江北某研究所 · 3 个月晋升加薪，管理 9 人团队',
        '2018.07 起：MES 生产系统 · 工厂数字化核心项目，后续项目多由其演进',
        '2018.04：由机械工程师转岗物联网研发，正式进入软件行业',
      ],
    },
    // 知识库介绍模块（5W：Who / What / How well / Why / For whom）
    kb: {
      badge: '💼 个人能力知识库',
      title: '关于本人的简要档案',
      subtitle: '将个人技能与经历整理为可交互问答的知识库',
      // 5W
      whoTitle: '我是谁',
      whoDesc: '以 Java 为主的全栈软件工程师。曾参与无人驾驶数据处理、智慧城市、MES 生产系统等项目，具备团队管理经验。',
      whatTitle: '能做什么',
      whatDesc: '可独立完成从需求分析到上线部署的完整流程：后端（Spring）、前端（React/Next.js）、数据库与消息队列、Docker 部署与 CI/CD。',
      howWellTitle: '能力水平',
      howWellDesc: '独立交付过完整项目，曾获阿里巴巴 P6 岗位 offer，带过 3 至 9 人的团队。借助 AI 可快速掌握新语言。',
      whyTitle: '能力来源',
      whyDesc: '机械专业出身，转行软件 7 年，兼顾业务理解与工程实现。日常借助 AI 编程，效率显著高于传统方式。',
      forWhomTitle: '适用对象',
      forWhomDesc: '需要全栈工程师的团队、需要独立交付能力的远程协作方，以及需要同时具备编码与业务理解能力的企业。',
      // 技术说明
      techTitle: '🧩 知识库技术说明',
      techItems: [
        '将技能、经历、项目拆分为 19 条结构化知识块',
        '采用中文分词与关键词权重打分实现内容检索',
        '将检索结果交由 DeepSeek 生成回答',
      ],
      limitTitle: '当前局限',
      limitItems: [
        '未引入向量库，仅依赖关键词检索，长尾问题命中率有限',
        '知识块为手工维护，更新需手动同步',
        '复杂问题的回答完整性有待提升',
      ],
      planTitle: '可改进方向',
      planItems: [
        '引入 embedding 向量检索以提升理解能力',
        '知识内容自动同步自简历配置',
        '支持多轮追问，提升回答准确性',
      ],
      exampleTitle: '💡 示例问题',
      examples: ['他掌握哪些技术？', '有哪些项目经历？', '是否适合远程协作？'],
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
      sectionLabel: '选择导出章节：',
      skill: '技能',
      project: '项目',
      experience: '经历',
      exportBtn: '🖨️ 导出 PDF',
      back: '← 返回首页',
      // 中文简历内容
      zh: {
        name: '行路客',
        role: '全栈软件工程师 · 以 Java 为主 · AI 辅助跨语言开发',
        emailLabel: '邮箱',
        skillsTitle: '技能',
        frontend: '前端',
        backend: '后端',
        database: '数据库/中间件',
        devops: '运维/DevOps',
        projectsTitle: '项目经历',
        experienceTitle: '工作经历',
        aiCodingTitle: 'AI 辅助编程',
        aiCodingDesc: '日常大量使用 AI 辅助编程，覆盖 Java、前端与脚本等方向，显著提升开发效率。',
      },
      // 英文简历内容
      en: {
        name: 'Xingluke',
        role: 'Full-stack Software Engineer · Java-focused · AI-assisted across languages',
        emailLabel: 'Email',
        skillsTitle: 'Skills',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'DB / Middleware',
        devops: 'DevOps',
        projectsTitle: 'Projects',
        experienceTitle: 'Experience',
        aiCodingTitle: 'AI-assisted Coding',
        aiCodingDesc: 'Heavy daily use of AI-assisted programming across Java, frontend, and scripting, significantly improving development efficiency.',
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
      name: 'Xingluke',
      role: 'Full-stack Software Engineer · Java-focused · AI-assisted across languages',
      brief: 'Java full-stack focus | MES systems, autonomous-driving data, smart city',
      emailLabel: 'Contact',
      aboutBtn: 'About',
      askBtn: '💼 Knowledge Q&A',
      projectsBtn: 'Projects',
      exportBtn: '📄 Export Resume',
      skillsTitle: '🛠 Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'DB / Middleware',
      devops: 'DevOps',
      aiCodingTitle: '🤖 AI-assisted Programming',
      aiCodingDesc: 'Heavy daily use of AI-assisted programming across Java, frontend, and scripting, significantly improving development efficiency.',
      aiAgentTitle: '🔄 AI Cloud Dev Library',
      aiAgentDesc: 'Maintains a personal cloud dev library on Gitee, organizing common methods and workflows into Markdown SOPs for AI Agent collaboration, evolving continuously with usage.',
      aiAgentBtn: 'View',
      projectsTitle: '📦 Projects',
      projects: [
        { title: 'IMPS MES System', desc: 'Companion software for Jack (world\'s largest sewing-equipment maker), serving 7 factories of 500-20,000 workers' },
        { title: 'Autonomous-driving Data Processing', desc: 'Cleaning, filtering and screening large-scale device data, feeding valid data downstream' },
        { title: 'Blog / Open Source', desc: 'CSDN tech blog + Next.js full-stack blog + Gitee AI dev library' },
      ],
      viewProject: 'View Project',
      experienceTitle: '📈 Experience',
      experiences: [
        '2024.01 - now: Titan · autonomous-driving data ingestion & processing, plus remote collaboration',
        '2022.10 - 2023.12: Smart city R&D · led UAV cluster monitoring (team of 3)',
        '2021.02 - 2022.03: Research institute · promoted in 3 months, managed a team of 9',
        'Since 2018.07: MES production system · core factory digitalization, many projects evolved from it',
        '2018.04: Transferred from mechanical to IoT R&D, formally entering the software industry',
      ],
    },
    // Knowledge base module (5W)
    kb: {
      badge: '💼 Personal Knowledge Base',
      title: 'A Brief Profile',
      subtitle: 'Personal skills and experience organized into an interactive Q&A knowledge base',
      whoTitle: 'Who I Am',
      whoDesc: 'A full-stack software engineer focused on Java, with experience in autonomous-driving data processing, smart city, and MES production systems, as well as team management.',
      whatTitle: 'What I Can Do',
      whatDesc: 'Capable of delivering end-to-end from requirements to deployment: Spring backend, React/Next.js frontend, databases and message queues, Docker deployment and CI/CD.',
      howWellTitle: 'Competency',
      howWellDesc: 'Delivered complete projects independently, received an Alibaba P6 offer, and led teams of 3 to 9. Quickly adopts new languages with AI assistance.',
      whyTitle: 'Foundation',
      whyDesc: 'Mechanical background with 7 years in software, balancing business understanding and engineering implementation. Daily AI-assisted programming yields significantly higher efficiency.',
      forWhomTitle: 'Who It Serves',
      forWhomDesc: 'Teams needing full-stack engineers, remote collaboration partners requiring independent delivery, and companies needing both coding and business understanding.',
      techTitle: '🧩 Knowledge Base Technical Notes',
      techItems: [
        'Skills, experience, and projects split into 19 structured chunks',
        'Chinese tokenization and keyword-weighted scoring for content retrieval',
        'Retrieved context handed to DeepSeek for answer generation',
      ],
      limitTitle: 'Current Limitations',
      limitItems: [
        'No vector store; keyword-based retrieval limits long-tail query accuracy',
        'Chunks are manually maintained; updates require manual sync',
        'Answer completeness for complex questions needs improvement',
      ],
      planTitle: 'Improvement Directions',
      planItems: [
        'Introduce embedding vector search for better understanding',
        'Auto-sync knowledge from resume configuration',
        'Support multi-turn follow-ups for better accuracy',
      ],
      exampleTitle: '💡 Example Questions',
      examples: ['What technologies does he know?', 'What project experience does he have?', 'Is he suitable for remote work?'],
      cta: '🚀 Enter Knowledge Q&A',
      ctaDesc: 'Click to enter the Q&A page, answers based on the knowledge base above',
    },
    // Chat page
    chat: {
      title: '💼 Personal Knowledge Q&A',
      subtitle: 'Answers about skills, experience, projects, and job direction based on the profile',
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
      sectionLabel: 'Select sections:',
      skill: 'Skills',
      project: 'Projects',
      experience: 'Experience',
      exportBtn: '🖨️ Export PDF',
      back: '← Back',
      zh: {
        name: '行路客',
        role: '全栈软件工程师 · 以 Java 为主 · AI 辅助跨语言开发',
        emailLabel: '邮箱',
        skillsTitle: '技能',
        frontend: '前端',
        backend: '后端',
        database: '数据库/中间件',
        devops: '运维/DevOps',
        projectsTitle: '项目经历',
        experienceTitle: '工作经历',
        aiCodingTitle: 'AI 辅助编程',
        aiCodingDesc: '日常大量使用 AI 辅助编程，覆盖 Java、前端与脚本等方向，显著提升开发效率。',
      },
      en: {
        name: 'Xingluke',
        role: 'Full-stack Software Engineer · Java-focused · AI-assisted across languages',
        emailLabel: 'Email',
        skillsTitle: 'Skills',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'DB / Middleware',
        devops: 'DevOps',
        projectsTitle: 'Projects',
        experienceTitle: 'Experience',
        aiCodingTitle: 'AI-assisted Coding',
        aiCodingDesc: 'Heavy daily use of AI-assisted programming across Java, frontend, and scripting, significantly improving development efficiency.',
      },
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
