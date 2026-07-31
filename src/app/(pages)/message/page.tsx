import React from 'react';  
import type { Metadata, ResolvingMetadata } from 'next';
import {Message} from '@/app/_components/message/index';

export const generateMetadata = async(_metadata: Record<string, any>,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const parentTitle = (await parent).title?.absolute ?? 'XinglukeBlog';
  return {
    title: `留言板 | ${parentTitle}`,
    description: '有什么想说的请留言。',
  };
}; 

const MessagePage = async () => {
    return <Message />;
}
export default MessagePage;

