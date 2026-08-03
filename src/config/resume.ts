/**
 * 简历配置（统一数据源，内容支持中英双语）
 * 首页所有主要内容都在这里配置，可在隐藏路由 /resume-admin 编辑。
 * 所有内容字段均为 { zh, en } 双语结构，按当前语言动态展示。
 */

/** 双语字符串 */
export interface BiText {
  zh: string;
  en: string;
}

export interface ResumeExperience {
  /** 时间（无需翻译） */
  time: string;
  /** 内容 */
  content: BiText;
}

export interface ResumeProject {
  /** 项目名 */
  title: BiText;
  /** 一句话描述 */
  desc: BiText;
  /** 技术栈（无需翻译） */
  tech: string[];
  /** 难点与成果（量化） */
  highlights: BiText[];
  /** 我的职责（角色 + 承担内容） */
  responsibility?: BiText;
  /** 链接 */
  url: string;
}

/** 求职意向（HR 筛选硬信息） */
export interface JobPreference {
  /** 期望城市 */
  city: BiText;
  /** 期望薪资 */
  salary: BiText;
  /** 到岗时间 */
  availability: BiText;
  /** 工作性质（全职/远程/兼职） */
  type: BiText;
}

/** 求职定位 */
export interface ResumePosition {
  /** 主标签 */
  primary: BiText;
  /** 副标签 */
  secondary: BiText[];
  /** 定位描述 */
  summary: BiText;
}

/** 价值陈述 */
export interface ValueProposition {
  /** 标题 */
  title: BiText;
  /** 要点 */
  points: BiText[];
}

export interface ResumeContact {
  email: string;
  wechat: string;
  github: string;
  csdn: string;
  gitee: string;
}

export interface ResumeStatus {
  /** 求职状态文案 */
  label: BiText;
  /** 徽标颜色 */
  color: string;
}

export interface RadarSkill {
  /** 维度名 */
  label: BiText;
  /** 熟练度 0-100 */
  value: number;
}

export interface ResumeConfig {
  position: ResumePosition;
  value: ValueProposition;
  /** 求职意向 */
  preference: JobPreference;
  /** 自我介绍（打字机，双语，每语言多条轮播） */
  introLines: BiText[];
  experiences: ResumeExperience[];
  projects: ResumeProject[];
  /** 核心能力标签 */
  highlights: BiText[];
  contact: ResumeContact;
  status: ResumeStatus;
  radar: RadarSkill[];
}

export const resumeConfig: ResumeConfig = {
  position: {
    primary: { zh: '全栈工程师', en: 'Full-stack Engineer' },
    secondary: [
      { zh: 'Java 后端为主', en: 'Java Backend Focus' },
      { zh: 'AI Coding', en: 'AI Coding' },
    ],
    summary: {
      zh: '前后端都能独立交付的全栈工程师，Java 后端为主，React/Next.js 前端、运维部署同样熟练；结合 AI Coding 跨语言快速上手，适合需要一人顶多岗的团队。',
      en: 'A full-stack engineer who delivers both frontend and backend independently. Java backend focus, proficient in React/Next.js frontend and DevOps. With AI Coding, adapts to new languages fast. Ideal for teams needing one engineer to cover multiple roles.',
    },
  },
  preference: {
    city: { zh: '南京（可远程）', en: 'Nanjing (Remote OK)' },
    salary: { zh: '面议', en: 'Negotiable' },
    availability: { zh: '随时到岗', en: 'Available immediately' },
    type: { zh: '全职 / 远程 / 兼职', en: 'Full-time / Remote / Freelance' },
  },
  value: {
    title: { zh: '我能帮团队解决什么', en: 'What I Can Bring to Your Team' },
    points: [
      {
        zh: '独立承接后端开发：从接口设计、业务实现到性能优化，Spring 全家桶熟练',
        en: 'Own backend development end-to-end: API design, business logic, performance tuning with the Spring ecosystem.',
      },
      {
        zh: 'MES / 工厂数字化领域经验：懂生产业务，能贴近客户做二次改造',
        en: 'MES / factory digitalization domain experience: understand production business, adapt solutions to client needs.',
      },
      {
        zh: '全栈兜底：前端、运维、CI/CD 都能上手，小团队不用为缺人发愁',
        en: 'Full-stack backup: frontend, DevOps, CI/CD — small teams won\'t struggle with staffing gaps.',
      },
      {
        zh: 'AI 提效：用 AI 辅助编程，交付效率显著提升',
        en: 'AI-driven efficiency: significantly faster delivery with AI-assisted programming.',
      },
    ],
  },
  introLines: [
    { zh: '我是行路客，前后端都能独立交付的全栈工程师', en: 'I\'m Xingluke, a full-stack engineer covering both frontend and backend.' },
    { zh: 'Java 后端为主，React/Next.js 前端、运维部署都熟', en: 'Java backend focus; proficient in React/Next.js frontend and DevOps.' },
    { zh: '能独立把项目从头做到上线，也能带团队', en: 'I deliver projects from scratch to launch, and lead teams too.' },
  ],
  experiences: [
    {
      time: 'Future',
      content: {
        zh: '当创业或兼职的收入足以覆盖主业时，会放弃主业，全力投入，路虽远，行必至~~~~~',
        en: 'When side projects or freelance income covers the main job, I will go all in on my own ventures.',
      },
    },
    {
      time: 'Now',
      content: {
        zh: '尝试个人创业，同时接一些远程工作兼职，主业也做着',
        en: 'Pursuing personal ventures alongside remote freelance work while keeping a full-time role.',
      },
    },
    {
      time: '2024.01',
      content: {
        zh: '加入 Titan，负责无人驾驶数据接入与数据处理，做海量无人设备数据的清洗、过滤、筛查，输出有效数据给下游',
        en: 'Joined Titan, responsible for autonomous-driving data ingestion and processing: cleaning, filtering, screening massive device data for downstream use.',
      },
    },
    {
      time: '2022.10',
      content: {
        zh: '加入中科大脑，负责智慧城市研发，UAV 集群城市监控项目整体负责，手下有 3 位外包兄弟',
        en: 'Joined Zhongke Danao, smart city R&D. Led the UAV cluster city-monitoring project with a team of 3.',
      },
    },
    {
      time: '2021.02',
      content: {
        zh: '入职江北某研究所，3 个月后升职加薪，成了部门老二，手下管着 9 位牛马兄弟',
        en: 'Joined a research institute, promoted with a raise in 3 months, became second-in-command managing a team of 9.',
      },
    },
    {
      time: '2018.07',
      content: {
        zh: '入行第一个大项目 MES 生产管理系统，是 Jack（全球最大缝制设备生产商）配套软件，服务 7 家工厂（500~20000人），靠贴近客户做二次改造',
        en: 'First major project: MES production management system, companion software for Jack (world\'s largest sewing-equipment maker), serving 7 factories (500-20,000 workers), customized closely to client needs.',
      },
    },
    {
      time: '2018.04',
      content: {
        zh: '内部转岗物联网研发团队，从机械工程师转软件，开启程序生涯',
        en: 'Transferred internally to IoT R&D, switching from mechanical engineering to software, starting my coding career.',
      },
    },
    {
      time: '2017.06',
      content: {
        zh: '自动化专业毕业，因 NX 绘图能力强成为机械助理工程师，负责制图和首件生产监测',
        en: 'Graduated in automation; became a mechanical assistant engineer known for NX drafting, handling drawings and first-article inspection.',
      },
    },
  ],
  projects: [
    {
      title: { zh: 'IMPS MES 生产管理系统', en: 'IMPS MES System' },
      desc: {
        zh: 'Jack（全球最大缝制设备商）配套软件，服务 7 家工厂（500~20000 人）',
        en: 'Companion software for Jack (world\'s largest sewing-equipment maker), serving 7 factories (500-20,000 workers).',
      },
      tech: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
      highlights: [
        { zh: '贴近客户二次改造，推动中高端设备采购', en: 'Client-close customization, boosting mid-to-high-end equipment sales.' },
        { zh: '适配 7 家工厂差异化的工艺要求', en: 'Adapted to the diverse process requirements of 7 factories.' },
      ],
      responsibility: {
        zh: '负责系统核心模块开发与客户化改造，对接 7 家工厂的差异化需求，主导现场调研与方案落地',
        en: 'Developed core modules and led client customization, aligning with 7 factories\' diverse needs, driving on-site research and delivery.',
      },
      url: 'http://mes.uchat.com.cn',
    },
    {
      title: { zh: '无人驾驶数据处理', en: 'Autonomous-driving Data Processing' },
      desc: {
        zh: '海量无人设备数据的清洗、过滤与筛查，输出有效数据给下游',
        en: 'Cleaning, filtering and screening massive device data, feeding valid data downstream.',
      },
      tech: ['Python', 'Big Data', 'Data Processing'],
      highlights: [
        { zh: '处理大规模无人设备原始数据', en: 'Processed large-scale autonomous device raw data.' },
        { zh: '产出高质量有效数据供下游使用', en: 'Produced high-quality data for downstream consumption.' },
      ],
      responsibility: {
        zh: '负责数据清洗、过滤与筛查流程的设计与实现，建立数据质量校验，保障下游数据可用性',
        en: 'Designed and implemented data cleaning/filtering/screening pipelines, built quality checks to ensure downstream data usability.',
      },
      url: '#',
    },
    {
      title: { zh: 'AI 云开发库 / 博客', en: 'AI Cloud Dev Library / Blog' },
      desc: {
        zh: 'CSDN 技术博客 + Next.js 全栈博客 + Gitee AI 开发库',
        en: 'CSDN tech blog + Next.js full-stack blog + Gitee AI dev library.',
      },
      tech: ['Next.js', 'React', 'AI Agent', 'RAG'],
      highlights: [
        { zh: 'RAG 知识库问答（简历问答机器人）', en: 'RAG knowledge-base Q&A (resume chatbot).' },
        { zh: 'SOP/MD 文档驱动 AI Agent 协同开发', en: 'SOP/MD documents drive AI Agent collaborative development.' },
      ],
      responsibility: {
        zh: '独立开发博客与 RAG 问答系统，搭建 AI 云开发库与 Agent 协作流程',
        en: 'Solo-developed the blog and RAG Q&A system, built the AI cloud dev library and Agent collaboration workflow.',
      },
      url: 'https://blog.csdn.net/weixin_45530192',
    },
  ],
  highlights: [
    { zh: 'Java / Spring 全家桶', en: 'Java / Spring ecosystem' },
    { zh: 'React / Next.js 前端', en: 'React / Next.js frontend' },
    { zh: 'MySQL / Redis / Kafka', en: 'MySQL / Redis / Kafka' },
    { zh: 'Docker / K8s / CI-CD', en: 'Docker / K8s / CI-CD' },
  ],
  contact: {
    email: '1240332437@qq.com',
    wechat: 'ReadyToServeForAll',
    github: 'https://github.com/liu51949822',
    csdn: 'https://blog.csdn.net/weixin_45530192',
    gitee: 'https://gitee.com/callmeprice/raglib',
  },
  status: {
    label: { zh: '求职中 · 接受远程', en: 'Open to Work · Remote OK' },
    color: 'tw-from-emerald-500 tw-to-teal-500',
  },
  radar: [
    { label: { zh: 'Java 后端', en: 'Java Backend' }, value: 90 },
    { label: { zh: '前端开发', en: 'Frontend' }, value: 70 },
    { label: { zh: '数据库/中间件', en: 'DB / Middleware' }, value: 78 },
    { label: { zh: 'DevOps 运维', en: 'DevOps' }, value: 72 },
    { label: { zh: 'AI 编程', en: 'AI Coding' }, value: 84 },
    { label: { zh: '项目管理', en: 'Project Mgmt' }, value: 62 },
  ],
};
