import React from 'react';  
import type { Metadata, ResolvingMetadata } from 'next';
import  ChatPages  from '@/app/_components/deepseek/deepseek';
export const generateMetadata = async(_metadata: Record<string, any>,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const parentTitle = (await parent).title?.absolute ?? 'XinglukeBlog';
  return {
    title: `求职知识库问答 | ${parentTitle}`,
    description: '基于个人能力知识库的智能问答，了解技能、经历、项目与求职方向。',
  };
}; 

const ChatPage = async () => {
    return <ChatPages />;
}
export default ChatPage;

