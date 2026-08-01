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
    tags: ['姓名', '名字', '称呼', '基本信息', '联系方式', '邮箱', '性别', '我是谁', '你是谁', '这个人', '行路客是谁'],
    content:
      '姓名：行路客（刘）；性别：男；邮箱：1240332437@qq.com。' +
      '求职定位：软件工程师（全栈），主要写 Java，靠 AI 辅助什么语言都能上手。',
  },
  {
    id: 'career-position',
    tags: ['求职', '岗位', '职位', '定位', '方向', '目标', '找什么工作'],
    content:
      '求职目标：软件工程师岗位，不区分具体方向。核心优势是 Java 多年经验（后端全栈），' +
      '配合 AI 写代码（vibing coding），什么语言都能快速上手。既会 Java 后端（Spring 全家桶），' +
      '也能做前端（React/Next.js），还会运维（Docker/Linux/CI-CD）。',
  },
  {
    id: 'kb-intro',
    tags: ['你是谁', '我是谁', '这是谁', '这个网站', '知识库', '小档案', '系统介绍', '说明', '介绍', '你能干什么', '你是什么', '怎么实现的'],
    content:
      '我是一个个人能力知识库问答助手，围绕工程师「行路客」整理的一份数字档案。' +
      '问任何关于他的技能、经历、项目、求职方向的问题，我都会基于档案内容回答。' +
      '这个知识库基于 Next.js 15 全栈博客构建，采用 RAG（检索增强生成）方案：' +
      '把技能/经历/项目拆成 19 条结构化知识块，用中文 n-gram 分词 + 关键词权重打分检索最相关内容，' +
      '再拼给 DeepSeek 大模型生成自然回答。' +
      '目前的程度：常见问题（技能、项目、求职）能答得不错，回答口语化；' +
      '不足：没有向量库，只靠关键词召回，问得太偏或太抽象的问题可能答不准，知识块需手工维护；' +
      '上下游：上游是我整理的简历配置（src/config、src/knowledge-base），下游是前端问答界面；' +
      '同类产品：类似 Airtable AI、Notion AI、各类基于知识库的智能问答机器人，' +
      '但这里是专为个人求职展示定制、代码开源的轻量实现。',
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
    content: '正在学习的技能：React Native、Express。一直在追新技术。',
  },
  {
    id: 'ai-coding',
    tags: ['AI', 'Coding', 'vibing', '辅助编程', '智能编程', '全语言'],
    content:
      'AI Coding 能力：天天用 AI 辅助写代码（vibing coding），Java、前端、脚本都能靠它快速上手，' +
      '效率比手工敲高不少。',
  },
  {
    id: 'ai-cloud-lib',
    tags: ['AI 云开发库', 'gitee', '云端开发', 'SOP', 'Agent', '自我进化', '大模型应用', '开发文档'],
    content:
      '大模型应用实践：在 Gitee 上维护一套个人云端开发库，把常用的写法和流程规范整理成 Markdown 文档（SOP），' +
      '让 AI Agent 照着这些文档配合干活。这套库越用越顺，AI 越来越懂我的习惯和规范。',
  },
];
