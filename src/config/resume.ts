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
        primary: {
            zh: '高级 AI Agent / 应用 AI 工程师',
            en: 'Senior AI Agent / Applied AI Engineer',
        },
        secondary: [
            { zh: 'Agent 平台与后端', en: 'Agent Platform & Backend' },
            { zh: '生产级 Agent 交付', en: 'Production Agent Delivery' },
        ],
        summary: {
            zh: '刘仁杰（Liu Renjie），网名行路客。拥有 9 年后端与复杂系统经验，专注生产级 AI Agent、工具编排、评估与可观测性，结合 Go / TypeScript 后端能力交付可靠的 Agent 平台；曾远程参与纽约团队研发。',
            en: 'Liu Renjie (刘仁杰), also known as Xingluke (行路客). Nine years of backend and complex-systems experience, focused on production AI agents, tool orchestration, evaluation and observability. Builds reliable agent platforms with Go / TypeScript backend expertise, including remote work with a New York City team.',
        },
    },
    preference: {
        city: {
            zh: '南京 / 远程（纽约团队协作经验）',
            en: 'Nanjing / Remote (NYC team experience)',
        },
        salary: { zh: '面议', en: 'Negotiable' },
        availability: { zh: '随时到岗', en: 'Available immediately' },
        type: { zh: '全职 / 远程 / 兼职', en: 'Full-time / Remote / Freelance' },
    },
    value: {
        title: { zh: '我能帮团队解决什么', en: 'What I Can Bring to Your Team' },
        points: [
            {
                zh: '生产级语音 Agent：负责语音与拨号链路及客户问题闭环，使人工投诉减少约 50%；通过运行时依赖与打包轻量化，将系统启动时间缩短 80%。',
                en: 'Production voice agents: owned voice and dialing integrations and customer issue resolution, reducing complaints by approximately 50%; reduced system startup time by 80% through runtime dependency and package optimization.',
            },
            {
                zh: '可评估、可运营的 Agent：覆盖 167 个评估场景；Go MCP 运维巡检稳定运行 6 个月，处理 200+ 条告警，准确率超过 95%。',
                en: 'Evaluable, operable agents: covered 167 evaluation scenarios; Go MCP operations monitoring ran for six months, handling 200+ alerts with over 95% accuracy.',
            },
            {
                zh: '复杂后端与数据链路：Go + MQTT 支撑 1,000+ 车辆在线、延迟低于 200 ms；Kafka → TDengine 降低存储成本 65%，写入吞吐提升至 3 倍。',
                en: 'Complex backend and data pipelines: Go + MQTT supported 1,000+ connected vehicles at under 200 ms latency; Kafka → TDengine cut storage costs by 65% and tripled write throughput.',
            },
            {
                zh: '端到端交付：将知识采集、RAG、记忆、流式交互与 CI/CD 串联，兼顾生产稳定性、人机确认和合规风险。',
                en: 'End-to-end delivery: connects knowledge ingestion, RAG, memory, streaming interaction and CI/CD while addressing production reliability, human review and compliance risks.',
            },
        ],
    },
    introLines: [
        {
            zh: '我是刘仁杰（Liu Renjie），也叫行路客，拥有 9 年后端与复杂系统经验',
            en: 'I am Liu Renjie (刘仁杰), also known as Xingluke (行路客), with nine years of backend and complex-systems experience.',
        },
        {
            zh: '专注生产级 AI Agent、Agent 平台与后端，覆盖编排、工具调用、评估和可观测性',
            en: 'I focus on production AI agents, agent platforms and backend systems, covering orchestration, tool calling, evaluation and observability.',
        },
        {
            zh: '曾远程参与纽约团队研发，将语音 Agent 与 Go / TypeScript 后端能力落地到真实业务',
            en: 'I have worked remotely with a New York City team, bringing voice agents and Go / TypeScript backend systems into production.',
        },
    ],
    experiences: [
        {
            time: '2026.01–2026.10',
            content: {
                zh: 'Zingage · Agent 软件工程师，按纽约时区远程协作，重点负责语音与拨号链路、客户问题闭环和系统包轻量化；参与 Agent 编排、评估与多租户后端交付。',
                en: 'Zingage · Agent Software Engineer. Worked remotely on New York hours, focusing on voice and dialing integrations, customer issue resolution and package optimization; contributed to agent orchestration, evaluation and multi-tenant backend delivery.',
            },
        },
        {
            time: '2024.01–2026.01',
            content: {
                zh: 'Titan · 云端工程师，负责 Go MCP 运维巡检、企业知识库 ETL、车云通信网关与实时数据平台。',
                en: 'Titan · Cloud Engineer. Built Go MCP operations monitoring, enterprise knowledge ETL, vehicle-cloud communication gateways and real-time data platforms.',
            },
        },
        {
            time: '2020.03–2024.01',
            content: {
                zh: '中科大脑 · 技术经理，负责智慧城市核心后端、飞控平台、多租户权限与数据隔离、KML 航线和飞行调度、Kafka + ELK 日志链路；落地需求追溯与质量门禁，将缺陷密度控制在 0.5/千行以内。',
                en: 'Zhongke Danao · Technical Manager. Led smart-city backends, flight-control services, multi-tenant access and data isolation, KML routes, flight scheduling and Kafka + ELK logging; established requirement traceability and quality gates, keeping defect density below 0.5 per thousand lines.',
            },
        },
        {
            time: '2017.01–2020.03',
            content: {
                zh: '杰克集团 · Java 开发工程师，参与黑灯工厂 MES 建设，打通下单、产线调度、AGV 搬运至取件的自动化链路，支持 7×24 小时运行；使用 Netty 支持 5 台 AGV 并发无冲突调度，任务分配效率提升 30%，并设计动态工序与条件触发流程引擎。',
                en: 'Jack Group · Java Developer. Built MES automation spanning orders, production scheduling, AGV transport and pickup for 24/7 operation; used Netty to coordinate five AGVs without conflicts, improving task allocation efficiency by 30%, and designed dynamic process and conditional-trigger workflows.',
            },
        },
        {
            time: '2017',
            content: {
                zh: '苏州大学应用技术学院 · 自动化专业，本科学历，2017 年毕业。',
                en: 'Applied Technology College of Soochow University (苏州大学应用技术学院) · Bachelor’s degree in Automation, graduated in 2017.',
            },
        },
    ],
    projects: [
        {
            title: { zh: 'Zingage 生产级语音 Agent', en: 'Zingage Production Voice Agents' },
            desc: {
                zh: '面向美国居家护理机构的 AI 运营平台，将电话、短信和 EMR 事件转化为可追踪工单，结合语音 Agent 与 Temporal 长流程完成任务路由、外部联系和结果回写。',
                en: 'An AI operations platform for US home-care agencies, turning phone, SMS and EMR events into trackable work items, with voice agents and Temporal workflows for routing, outreach and result writeback.',
            },
            tech: [
                'TypeScript',
                'OpenAI Agents SDK',
                'Temporal',
                'ElevenLabs',
                'Twilio',
                'Deepgram',
            ],
            highlights: [
                {
                    zh: '启动耗时降低 80%，用户投诉减少约 50%。',
                    en: 'Reduced startup time by 80% and user complaints by approximately 50%.',
                },
                {
                    zh: '参与覆盖 167 个场景的语音评估与 CI 回归，通过数据集和 LLM Judge 验证变更；日均交付约 3 个 PR。',
                    en: 'Contributed to voice evaluation and CI regression across 167 scenarios using datasets and LLM Judge; delivered approximately three PRs per day.',
                },
            ],
            responsibility: {
                zh: '重点负责 ElevenLabs + Twilio + Deepgram 呼入/呼出、拨号状态、实时转写、转接和通话后处理，与 Temporal 和 TypeScript 后端衔接；通过日志、调用追踪和工作流状态闭环客户问题，梳理运行时依赖、包边界与构建内容实现轻量化。',
                en: 'Focused on ElevenLabs + Twilio + Deepgram inbound/outbound calling, dialing status, live transcription, transfers and post-call processing integrated with Temporal and TypeScript; resolved customer issues using logs, traces and workflow state, and optimized runtime dependencies, package boundaries and build contents.',
            },
            url: '#',
        },
        {
            title: { zh: 'Titan MCP 运维巡检 Agent', en: 'Titan MCP Operations Monitoring Agent' },
            desc: {
                zh: '使用 Go MCP Server 封装服务器监控、日志拉取和钉钉告警，实现无人值守巡检。',
                en: 'A Go MCP server exposing server monitoring, log retrieval and DingTalk alert tools for unattended operations checks.',
            },
            tech: ['Go', 'MCP', 'DingTalk'],
            highlights: [
                {
                    zh: '稳定运行 6 个月，处理 200+ 条告警，准确率超过 95%。',
                    en: 'Ran reliably for six months, processing 200+ alerts with over 95% accuracy.',
                },
                {
                    zh: '异常响应时间缩短至 3 分钟内。',
                    en: 'Reduced incident response time to under three minutes.',
                },
            ],
            responsibility: {
                zh: '实现 MCP 工具、定时任务、上下文管理与异常模式匹配，打通巡检到告警的链路。',
                en: 'Implemented MCP tools, scheduled tasks, context management and anomaly pattern matching across the monitoring-to-alert pipeline.',
            },
            url: '#',
        },
        {
            title: { zh: 'Titan 企业知识库与 ETL', en: 'Titan Enterprise Knowledge Base & ETL' },
            desc: {
                zh: '整合 Jira、GitLab、飞书数据，构建采集、清洗、向量化与 Milvus 检索链路。',
                en: 'Integrated Jira, GitLab and Feishu data through ingestion, cleaning, vectorization and Milvus retrieval.',
            },
            tech: ['Go', 'Jira', 'GitLab', 'Feishu', 'Milvus', 'RAG'],
            highlights: [
                {
                    zh: '新人上手周期由 4 周缩短至 2 周。',
                    en: 'Reduced onboarding time from four weeks to two.',
                },
                {
                    zh: '技术方案搜索效率提升 60%。',
                    en: 'Improved technical-solution search efficiency by 60%.',
                },
            ],
            responsibility: {
                zh: '负责多源 Go ETL 与向量检索集成，支持企业知识发现和新人入职。',
                en: 'Built multi-source Go ETL and vector retrieval integrations for enterprise knowledge discovery and onboarding.',
            },
            url: '#',
        },
        {
            title: { zh: 'Titan 车云通信网关', en: 'Titan Vehicle-Cloud Communication Gateway' },
            desc: {
                zh: '使用 Go + MQTT 重构无人矿车通信服务。',
                en: 'Rebuilt autonomous mining vehicle communication services with Go + MQTT.',
            },
            tech: ['Go', 'MQTT'],
            highlights: [
                {
                    zh: '支撑 1,000+ 矿车同时在线，消息延迟低于 200 ms。',
                    en: 'Supported 1,000+ concurrent vehicles with message latency below 200 ms.',
                },
                {
                    zh: '资源占用较原 Java 版本降低 40%。',
                    en: 'Reduced resource usage by 40% compared with the original Java implementation.',
                },
            ],
            responsibility: {
                zh: '负责通信服务重构，通过协程池与 Channel 优化并发处理及资源占用。',
                en: 'Rebuilt communication services and optimized concurrency and resource usage with goroutine pools and channels.',
            },
            url: '#',
        },
        {
            title: { zh: 'Titan 实时数据平台', en: 'Titan Real-Time Data Platform' },
            desc: {
                zh: 'Kafka → TDengine 实时数据管道，处理 200+ 类传感器指标。',
                en: 'A Kafka → TDengine real-time pipeline processing 200+ sensor metric types.',
            },
            tech: ['Kafka', 'TDengine'],
            highlights: [
                {
                    zh: '存储成本较 MySQL 降低 65%。',
                    en: 'Reduced storage costs by 65% compared with MySQL.',
                },
                { zh: '写入吞吐提升至原来的 3 倍。', en: 'Tripled write throughput.' },
            ],
            responsibility: {
                zh: '独立搭建实时数据管道，负责数据接入与时序存储。',
                en: 'Independently built the real-time pipeline, covering data ingestion and time-series storage.',
            },
            url: '#',
        },
        {
            title: { zh: '多智能体咨询辅助系统', en: 'Multi-Agent Disease Diagnosis System' },
            desc: {
                zh: '面向海外医美咨询的多智能体工程实践，仅作咨询辅助，不替代专业医疗诊断或治疗建议。',
                en: 'A multi-agent engineering project for overseas aesthetic-medicine consultation support; not a substitute for professional medical diagnosis or treatment advice.',
            },
            tech: [
                'TypeScript',
                'LangGraph.js',
                'ReAct',
                'RAG',
                'Gemini',
                'SSE',
                'Playwright',
                'Cheerio',
            ],
            highlights: [
                {
                    zh: '通过 Coordinator 与专业 Agent 实现任务拆解、上下文传递和结果融合，使用 SSE 流式输出。',
                    en: 'Used a coordinator and specialist agents for task decomposition, context handoffs and result synthesis, with SSE streaming.',
                },
                {
                    zh: '使用 Playwright、Cheerio 构建领域语料，结合 RAG、多模态照片分析、短期摘要与长期记忆。',
                    en: 'Built a domain corpus with Playwright and Cheerio, combining RAG, multimodal photo analysis, short-term summaries and long-term memory.',
                },
                {
                    zh: '引入 HITL 确认、禁忌症核对与结构化校验，明确合规风险及风险告知边界。',
                    en: 'Added HITL confirmation, contraindication checks and structured validation, with explicit compliance-risk and risk-disclosure boundaries.',
                },
            ],
            responsibility: {
                zh: '负责多智能体编排、语料采集、检索与记忆链路，以及合规校验和人工确认流程。',
                en: 'Implemented multi-agent orchestration, corpus ingestion, retrieval and memory pipelines, compliance checks and human-review workflows.',
            },
            url: 'https://github.com/liu51949822/Multi-Agent-Disease-Diagnosis-System',
        },
        {
            title: { zh: '智能健身训练 Agent', en: 'Workout Routine Agent' },
            desc: {
                zh: '从单文件 CLI 演进的全栈 AI 健身教练，覆盖移动端与 Web。',
                en: 'A full-stack AI fitness coach evolved from a single-file CLI, supporting mobile and web.',
            },
            tech: [
                'Python',
                'FastAPI',
                'FAISS',
                'LangGraph',
                'React Native',
                'Expo',
                'SSE',
                'GitHub Actions',
            ],
            highlights: [
                {
                    zh: '串联文档加载、切块、FAISS 持久化与 LangGraph 检索工具，通过 FastAPI 提供 REST API 和 SSE Token 流。',
                    en: 'Connected document loading, chunking, FAISS persistence and LangGraph retrieval tools, with FastAPI REST endpoints and SSE token streaming.',
                },
                {
                    zh: '支持短期摘要、长期档案与向量回忆，结合自动化测试及 CI 完成 Android APK / Web 构建。',
                    en: 'Supported short-term summaries, long-term profiles and vector recall, with automated tests and CI for Android APK / web builds.',
                },
            ],
            responsibility: {
                zh: '负责 RAG 与记忆链路、流式 API、React Native / Expo 客户端及 CI 交付。',
                en: 'Built RAG and memory pipelines, streaming APIs, the React Native / Expo client and CI delivery.',
            },
            url: 'https://github.com/liu51949822/workout-routine-agent',
        },
        {
            title: { zh: 'AI 云开发库 / 博客', en: 'AI Cloud Dev Library / Blog' },
            desc: {
                zh: 'CSDN 技术博客 + Next.js 全栈博客 + Gitee AI 开发库',
                en: 'CSDN tech blog + Next.js full-stack blog + Gitee AI dev library.',
            },
            tech: ['Next.js', 'React', 'AI Agent', 'RAG'],
            highlights: [
                {
                    zh: 'RAG 知识库问答（简历问答机器人）',
                    en: 'RAG knowledge-base Q&A (resume chatbot).',
                },
                {
                    zh: 'SOP/MD 文档驱动 AI Agent 协同开发',
                    en: 'SOP/MD documents drive AI Agent collaborative development.',
                },
            ],
            responsibility: {
                zh: '独立开发博客与 RAG 问答系统，搭建 AI 云开发库与 Agent 协作流程',
                en: 'Solo-developed the blog and RAG Q&A system, built the AI cloud dev library and Agent collaboration workflow.',
            },
            url: 'https://blog.csdn.net/weixin_45530192',
        },
    ],
    highlights: [
        {
            zh: '生产级 Agent / OpenAI Agents SDK / Temporal',
            en: 'Production Agents / OpenAI Agents SDK / Temporal',
        },
        {
            zh: 'ReAct / planner-executor / MCP / 多智能体',
            en: 'ReAct / Planner-Executor / MCP / Multi-Agent',
        },
        { zh: 'RAG / Milvus / 记忆 / HITL / 评估', en: 'RAG / Milvus / Memory / HITL / Evals' },
        {
            zh: 'Go / TypeScript / Java / Python 后端',
            en: 'Go / TypeScript / Java / Python Backend',
        },
        {
            zh: 'Kafka / MQTT / TDengine 实时数据链路',
            en: 'Kafka / MQTT / TDengine Real-Time Pipelines',
        },
        {
            zh: '云原生交付 / CI/CD / 可观测性',
            en: 'Cloud-Native Delivery / CI/CD / Observability',
        },
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
    radar: [],
};
