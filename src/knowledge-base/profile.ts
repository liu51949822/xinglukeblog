/**
 * 求职知识库 - 个人信息
 * 
 * 这是 RAG 问答的数据来源之一。基于 config/me.ts 的真实信息整理。
 * 内容字段说明：
 *  - tags: 检索关键词（用于关键词匹配）
 *  - content: 知识块内容（回答时作为上下文）
 */

export interface KnowledgeChunk {
  /** 知识块唯一 id */
  id: string;
  /** 检索关键词 */
  tags: string[];
  /** 知识块内容 */
  content: string;
}

/**
 * 个人信息知识库
 */
export const profileKnowledge: KnowledgeChunk[] = [
  {
    id: 'basic-info',
    tags: ['姓名', '名字', '称呼', '基本信息', '联系方式', '邮箱', '性别'],
    content:
      '姓名：行路客（刘）；性别：男；邮箱：1240332437@qq.com。' +
      '求职定位：软件工程师（全栈），以 Java 为核心技术栈，辅助 AI Coding 方式可胜任多语言开发。',
  },
  {
    id: 'career-position',
    tags: ['求职', '岗位', '职位', '定位', '方向', '目标', '找什么工作'],
    content:
      '求职目标：软件工程师岗位，不区分具体方向。核心优势是 Java 多年经验（后端全栈），' +
      '结合 AI Coding（vibing coding）可快速胜任全语言开发。既懂 Java 后端（Spring 全家桶），' +
      '也能做前端（React/Next.js），还能做运维（Docker/Linux/CI-CD）。',
  },
  {
    id: 'frontend-skills',
    tags: ['前端', '技能', '技术栈', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'Vue'],
    content:
      '前端技能：HTML、CSS、JavaScript、TypeScript、React、Next.js、Node.js、Tailwind CSS、Bootstrap、jQuery。' +
      '能独立完成现代前端应用的开发与构建。',
  },
  {
    id: 'backend-skills',
    tags: ['后端', 'Java', 'Spring', '技能', '技术栈', '微服务'],
    content:
      '后端技能：Java（多年经验）、Spring Boot、Spring Security、Spring Data JPA、Spring Cloud、Hono、Node.js。' +
      '熟悉微服务架构与安全认证体系。',
  },
  {
    id: 'database-middleware',
    tags: ['数据库', '中间件', 'MySQL', 'PostgreSQL', 'Redis', 'Kafka', 'MongoDB', 'MQTT'],
    content:
      '数据库和中间件：MySQL、PostgreSQL、TDengine（时序数据库）、MongoDB、Redis、Kafka、MQTT、RabbitMQ、Pandas。' +
      '覆盖关系型、NoSQL、时序、缓存、消息队列等主流技术。',
  },
  {
    id: 'devops-skills',
    tags: ['运维', 'DevOps', 'Docker', 'Kubernetes', 'Linux', 'CI', 'Jenkins', 'Git'],
    content:
      '服务器与运维技能：Docker、Kubernetes、Jenkins、Git、GitHub、GitHub Actions、Linux、Ubuntu、Windows Server。' +
      '熟悉容器化部署与 CI/CD 自动化流程。',
  },
  {
    id: 'learning-skills',
    tags: ['学习', '正在学', '演化', 'React Native', 'Express', '新技能'],
    content: '正在演化学习的技能：React Native、Express。持续保持对新技术的探索热情。',
  },
  {
    id: 'ai-coding',
    tags: ['AI', 'Coding', 'vibing', '辅助编程', '智能编程', '全语言'],
    content:
      'AI Coding 能力：熟练使用 AI 辅助编程（vibing coding），可以借助 AI 快速胜任 Java、前端、脚本等全语言开发任务，' +
      '显著提升开发效率与跨语言适应能力。',
  },
];
