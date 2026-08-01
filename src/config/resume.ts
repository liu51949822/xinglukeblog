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
    '我是行路客，主要写 Java 的全栈工程师',
    '做过 MES 生产系统、无人驾驶数据处理、智慧城市',
    '能独立把项目从头做到上线，也能带团队',
  ],
  experiences: [
    {
      time: '未来',
      content: '当创业或兼职的收入足以覆盖主业时，会放弃主业，全力投入，路虽远，行必至~~~~~',
    },
    {
      time: '至今',
      content: '尝试个人创业，同时接一些远程工作兼职，主业也做着',
    },
    {
      time: '2024.01',
      content: '加入 Titan，负责无人驾驶数据接入与数据处理，做海量无人设备数据的清洗、过滤、筛查，输出有效数据给下游',
    },
    {
      time: '2022.10',
      content: '加入中科大脑，负责智慧城市研发，UAV 集群城市监控项目整体负责，手下有 3 位外包兄弟',
    },
    {
      time: '2021.02',
      content: '入职江北某研究所，3 个月后升职加薪，成了部门老二，手下管着 9 位牛马兄弟',
    },
    {
      time: '2018.07',
      content: '入行第一个大项目 MES 生产管理系统，是 Jack（全球最大缝制设备生产商）配套软件，服务 7 家工厂（500~20000人），靠贴近客户做二次改造',
    },
    {
      time: '2018.04',
      content: '内部转岗物联网研发团队，从机械工程师转软件，开启程序生涯',
    },
    {
      time: '2017.06',
      content: '自动化专业毕业，因 NX 绘图能力强成为机械助理工程师，负责制图和首件生产监测',
    },
  ],
  projects: [
    {
      title: 'IMPS MES 生产管理系统',
      desc: 'Jack 配套软件（全球最大缝制设备商），服务 7 家工厂 500~20000 人，贴近客户做二次改造',
      url: 'http://mes.uchat.com.cn',
    },
    {
      title: '无人驾驶数据处理',
      desc: '海量无人设备数据清洗过滤、筛查，输出有效数据给下游',
      url: '#',
    },
    {
      title: '博客 / 开源',
      desc: 'CSDN 技术博客 + Next.js 全栈博客 + Gitee 大模型开发实践库',
      url: 'https://blog.csdn.net/weixin_45530192',
    },
  ],
  highlights: [
    'Java / Spring 全家桶',
    'React / Next.js 前端',
    'MySQL / Redis / Kafka',
    'Docker / K8s / CI/CD',
  ],
};
