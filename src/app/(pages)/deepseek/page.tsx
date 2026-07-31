import React from 'react';  
import type { Metadata, ResolvingMetadata } from 'next';
import  ChatPages  from '@/app/_components/deepseek/deepseek';
export const generateMetadata = async(_metadata: Record<string, any>,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const parentTitle = (await parent).title?.absolute ?? 'XinglukeBlog';
  return {
    title: `deepseek | ${parentTitle}`,
    description: '有什么想说的请说话。',
  };
}; 

const ChatPage = async () => {
    return <ChatPages />;
}
export default ChatPage;

