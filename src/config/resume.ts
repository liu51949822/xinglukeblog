/**
 * 简历配置
 * 首页关键经历、自我介绍、技能亮点等都可在这里自由配置
 */

export interface ResumeExperience {
  /** 时间 */
  time: string;
  /** 内容 */
  content: string;
}

export interface ResumeProject {
  /** 项目名 */
  title: string;
  /** 一句话描述 */
  desc: string;
  /** 链接 */
  url: string;
}

export interface ResumeConfig {
  /** 自我介绍（打字机展示，可多条轮播） */
  introLines: string[];
  /** 关键经历（时间倒序） */
  experiences: ResumeExperience[];
  /** 代表性项目 */
  projects: ResumeProject[];
  /** 核心能力标签 */
  highlights: string[];
}

export const resumeConfig: ResumeConfig = {
  introLines: [
    '我是行路客，一个以 Java 为核心的全栈工程师',
    '做过无人驾驶数据处理、智慧城市、MES 生产系统',
    '既能独立交付完整项目，也能带团队攻坚',
  ],
  experiences: [
    {
      time: '2024.01 - 至今',
      content: 'Titan · 无人驾驶数据接入与处理，同时尝试远程兼职',
    },
    {
      time: '2022.10 - 2023.12',
      content: '中科大脑 · 智慧城市研发，UAV 集群城市监控项目负责人（带 3 人）',
    },
    {
      time: '2021.02 - 2022.03',
      content: '江北某研究所 · 3 个月升职加薪，带 9 人团队',
    },
    {
      time: '2018.07 起',
      content: 'MES 生产系统 · 工厂信息化数字化核心项目，后续项目多在此基础上演进',
    },
    {
      time: '2018.04',
      content: '内部转岗物联网研发，从机械工程师转软件，开启程序生涯',
    },
  ],
  projects: [
    {
      title: 'IMPS MES 黑灯生产系统',
      desc: '工厂黑灯生产管理系统，面向千人以上工厂的信息化数字化',
      url: 'http://mes.uchat.com.cn',
    },
    {
      title: '智网智慧城市平台',
      desc: '智慧城市数据平台，UAV 集群城市监控项目负责人',
      url: 'http://huiqi.wxlxdsjzx.com',
    },
    {
      title: '博客系统',
      desc: '基于 Next.js 15 + React 19 + Prisma 的全栈博客',
      url: 'https://github.com/liu51949822/xinglukeblog',
    },
  ],
  highlights: [
    'Java / Spring 全家桶',
    'React / Next.js 前端',
    'MySQL / Redis / Kafka',
    'Docker / K8s / CI/CD',
  ],
};
