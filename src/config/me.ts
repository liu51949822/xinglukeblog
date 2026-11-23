import type { AboutMeProps } from '@/app/_components/aboutme/compoents/about';

import { resumeConfig } from './resume';

export const about: AboutMeProps = {
    persion: {
        name: '刘仁杰 Liu Renjie · 行路客 Xingluke',
        sex: '男 / Male',
        email: '1240332437@qq.com',
    },
    panels: {
        ai: {
            title: 'AI Agent 与应用 AI / AI Agents & Applied AI',
            data: [
                'OpenAI Agents SDK',
                'ReAct',
                'planner/executor',
                'Function Calling',
                'Multi-Agent',
                'MCP',
                'FastMCP',
                'LangChain',
                'LangGraph',
                'Dify',
                'Milvus',
                'Braintrust',
                'LLM Judge',
            ],
        },
        front: {
            title: '前端与浏览器自动化 / Frontend & Browser Automation',
            data: ['React', 'Next.js', 'Vue', 'Playwright', 'Cheerio', 'Stagehand', 'Steel'],
        },
        back: {
            title: '后端与工作流 / Backend & Workflows',
            data: [
                'Go',
                'TypeScript',
                'Node.js',
                'Java',
                'Python',
                'Temporal',
                'GraphQL Yoga',
                'Kysely',
                'Spring Boot',
            ],
        },
        dataAndMiddleware: {
            title: '数据库与中间件 / Databases & Middleware',
            data: ['PostgreSQL', 'Aurora', 'MySQL', 'Redis', 'TDengine', 'Kafka', 'MQTT'],
        },
        devOps: {
            title: '云原生交付与可观测性 / Cloud-Native Delivery & Observability',
            data: [
                'Docker',
                'Kubernetes (K8s)',
                'Amazon EKS',
                'Pulumi',
                'GitHub Actions',
                'Jenkins',
                'Datadog',
                'OpenTelemetry (OTel)',
                'Prometheus',
                'Grafana',
                'ELK',
            ],
        },
        doingSkill: {
            title: '项目实践 / Project Practice',
            data: [
                'React Native / Expo',
                'FastAPI / FAISS',
                'LangGraph.js / Gemini',
                'ElevenLabs / Twilio / Deepgram',
                'RAG / SSE',
                '记忆与人工确认 / Memory & HITL',
            ],
        },
        workDevice: {
            title: '工作设备 / Work Devices',
            data: [
                'MacBook Pro',
                '惠普暗影精灵台式机 / HP OMEN Desktop',
                '明基显示器 × 3 / BenQ Monitors × 3',
            ],
        },
        workEnv: {
            title: '工作环境 / Work Environment',
            data: [
                'Visual Studio Code',
                'IntelliJ IDEA',
                'WebStorm',
                'Navicat',
                'Postman',
                'Redis Desktop Manager',
                'MongoDB Compass',
                'Docker Desktop',
                'DBeaver',
                'Google Chrome',
            ],
        },
        like: {
            title: '爱好 / Interests',
            data: ['武术、爬山 / Martial Arts & Hiking', '音乐 / Music', '阅读 / Reading'],
        },
        lastLike: {
            title: '近期坚持 / Current Habits',
            data: ['跑步与运动 / Running & Exercise'],
        },
    },
    timeline: resumeConfig.experiences.map(({ time, content }) => ({
        title: time,
        content: `${content.zh}\n${content.en}`,
    })),
};
