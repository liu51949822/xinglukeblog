import type { HomePageConfig } from '@/app/_components/home/type';

export const homeConfig: HomePageConfig = {
  welcome: {
    title: '欢迎朋友',
    colorTitle: '行路客的小站',
    content: '本站为个人博客，记录个人学习和生活，欢迎朋友们来访，一起交流学习，共同进步',
  },
  profile: {
    name: '行路客',
    title: '全栈开发工程师',
    subtitle: 'React · Next.js · Node.js · Java',
    bio: '从自动化到全栈，从机械设计到软件开发。拥有多年企业级项目经验，专注于前后端全栈开发、系统架构设计。热爱技术，持续学习，拥抱 AI 赋能开发。',
    email: '1240332437@qq.com',
    location: '南京 / 北京',
    social: {
      github: 'https://github.com/yourname',
      linkedin: 'https://www.linkedin.com/in/yourname',
      email: 'mailto:1240332437@qq.com',
    },
  },
  skills: [
    { category: '前端', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Ant Design', 'HTML/CSS'] },
    { category: '后端', items: ['Node.js', 'Java', 'Spring Boot', 'Hono', 'REST API'] },
    { category: '数据库', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'TDengine'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux', 'Jenkins'] },
  ],
  video: {
    image: 'url(xxxx)',
    video: 'xxxx',
  },
  list: {
    first: {
      data: [
        { text: '勇气是抵抗恐惧、掌控恐惧，而不是没有恐惧。— 马克·吐温' },
        { text: 'Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill' },
        { text: '失敗は成功の母。— 日本谚语' },
        { text: '每一个伟大的梦想，都始于一个勇敢的心。' },
        { text: '千里之行，始于足下。' },
        { text: '越努力，越幸运。' },
        { text: '不经历风雨，怎能见彩虹？' },
        { text: '每天进步一点点。' },
        { text: '不要害怕慢，只怕停。' },
        { text: '人生没有白走的路，每一步都算数。' },
        { text: '心中有光，何惧黑暗。' },
        { text: '活着就有希望。' },
      ],
    },
    second: {
      title: 'icon',
      data: [
        { id: 'github', title: 'GitHub', href: 'https://github.com/yourname', external: true },
        { id: 'linkedin', title: 'LinkedIn', href: 'https://www.linkedin.com/in/yourname', external: true },
        { id: 'mail', title: 'Email', href: 'mailto:1240332437@qq.com', external: true },
      ],
    },
  },
  typed: [
    `🤝 你好，我是行路客 — 一名热爱技术的全栈开发者
    从机械设计到软件开发，一路走来，始终保持学习的热情。
    这里是记录技术思考与项目实践的地方，希望能为你带来一些启发！
    ~`,
  ],
  experience: [
    {
      period: '2024.01 - 至今',
      title: '后端开发工程师',
      company: 'Titan',
      description: '负责无人驾驶数据接入与数据处理平台开发',
    },
    {
      period: '2022.10 - 2023.12',
      title: '智慧城市研发工程师',
      company: '中科大脑',
      description: 'UAV集群城市监控项目整体负责，管理3人团队',
    },
    {
      period: '2021.02 - 2022.03',
      title: '研发部门副主管',
      company: '江北某研究所',
      description: '管理9人团队，负责核心系统架构设计，年薪突破20万',
    },
    {
      period: '2018.07 - 2020.08',
      title: '全栈开发工程师',
      company: '前公司',
      description: 'MES制造执行系统开发，面向千人以上工厂的数字化生产管理',
    },
  ],
  projects: [
    {
      title: 'IMPS MES黑灯生产系统',
      description: '面向工厂的MES生产管理系统，实现无人化"黑灯生产"',
      url: 'http://mes.uchat.com.cn',
      tech: ['Java', 'Spring Boot', 'Vue', 'MySQL', 'MQTT'],
    },
    {
      title: '智网智慧城市平台',
      description: '无人机集群城市监控系统，智慧城市综合管理',
      url: 'http://huiqi.wxlxdsjzx.com',
      tech: ['Java', 'Spring Cloud', 'TDengine', 'Kafka', 'Docker'],
    },
    {
      title: '个人博客系统',
      description: '基于 Next.js 15 的全栈个人网站与博客系统',
      url: 'https://github.com/liu51949822/xinglukeblog',
      tech: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL'],
    },
  ],
};
