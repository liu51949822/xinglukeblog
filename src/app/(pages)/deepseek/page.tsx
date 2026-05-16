import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { DeepseekChat } from '@/app/_components/deepseek/deepseek';

export const generateMetadata = async (
    _: unknown,
    parent: ResolvingMetadata,
): Promise<Metadata> => ({
    title: `AI 助手 | ${(await parent).title?.absolute}`,
    description: 'DeepSeek AI 智能助手，支持流式对话',
});

const DeepseekPage: FC = () => (
    <div className="tw-page-item">
        <div className="tw-page-container tw-flex tw-flex-col" style={{ height: 'calc(100vh - 12rem)' }}>
            <div className="tw-mb-4">
                <h1 className="tw-text-2xl tw-font-bold">AI 助手</h1>
                <p className="tw-mt-1 tw-text-muted-foreground">基于 DeepSeek 的 AI 对话助手</p>
            </div>
            <div className="tw-flex-1 tw-overflow-hidden">
                <DeepseekChat />
            </div>
        </div>
    </div>
);

export default DeepseekPage;
