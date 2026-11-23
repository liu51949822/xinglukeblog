import type { Metadata } from 'next';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Auth } from '../_components/auth/provider';
import './global.css';
import { Footer } from '../_components/layout/footer';
import { Header } from '../_components/layout/header';
import { FloatingAnimeBot } from '../_components/deepseek/FloatingAnimeBot';
import { Toaster } from '../_components/shadcn/ui/toaster';
import Theme from '../_components/theme';
import $styles from './layout.module.css';
export const metadata: Metadata = {
    title: '刘仁杰 Liu Renjie | Senior AI Agent / Applied AI Engineer',
    description:
        '刘仁杰 / Liu Renjie 的行路客博客。Senior AI Agent / Applied AI Engineer，专注 Agent Platform & Backend，拥有 9 年后端与平台经验，分享生产级 Agent、语音 AI、MCP/RAG 与 Multi-Agent 实践，开放全球远程与跨时区合作，曾远程协作纽约团队。',
};

const AppLayout: FC<PropsWithChildren<{ modal: ReactNode }>> = ({ children, modal }) => (
    <Auth>
        <Theme>
            <div className={$styles.layout}>
                <Header />
                {children}
                <Footer />
            </div>
            {modal}
            <Toaster />
            {/* 全页面二次元浮动机器人 */}
            <FloatingAnimeBot />
        </Theme>
    </Auth>
);
export default AppLayout;
