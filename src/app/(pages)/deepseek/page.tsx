import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';
import { redirect } from 'next/navigation';

export const generateMetadata = async(
  _metadata: Record<string, any>,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const parentTitle = (await parent).title?.absolute ?? 'XinglukeBlog';
  return {
    title: `AI 个人助手 | ${parentTitle}`,
    description: '基于知识库的 AI 智能问答助手，了解关于行路客的一切。',
  };
};

const DeepseekPage: FC = async () => {
  redirect('/ai-chat');
};

export default DeepseekPage;

