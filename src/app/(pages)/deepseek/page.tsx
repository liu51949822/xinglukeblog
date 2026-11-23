import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import ChatPages from '@/app/_components/deepseek/deepseek';
export const generateMetadata = async (
    _metadata: Record<string, any>,
    _parent: ResolvingMetadata,
): Promise<Metadata> => {
    return {
        title: '刘仁杰 Liu Renjie | AI Agent 求职知识库问答',
        description:
            '通过个人知识库了解刘仁杰 / Liu Renjie，Senior AI Agent / Applied AI Engineer：9 年后端与平台经验，专注 Agent Platform & Backend、生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent，开放全球远程与跨时区合作，曾远程协作纽约团队。',
        openGraph: {
            title: '刘仁杰 Liu Renjie | AI Agent 求职知识库问答',
            description:
                '了解 Senior AI Agent / Applied AI Engineer 刘仁杰的 Agent Platform & Backend、生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent 实践，以及全球远程与跨时区合作经验。',
            type: 'website',
            locale: 'zh_CN',
            siteName: '行路客的小站',
        },
    };
};

const ChatPage = async () => {
    return <ChatPages />;
};
export default ChatPage;
