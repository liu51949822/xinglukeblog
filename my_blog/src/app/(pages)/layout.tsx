import type { Metadata } from 'next';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Auth } from '../_components/auth/provider';
import './global.css';
import { Footer } from '../_components/layout/footer';
import { Header } from '../_components/layout/header';
import { Toaster } from '../_components/shadcn/ui/toaster';
import Theme from '../_components/theme';
import $styles from './layout.module.css';
export const metadata: Metadata = {
    title: '行路客的小站',
    description:
        '行路客的小站,记录技术文档和分享生活点滴,专注于全栈开发、编程语言、数据库、云计算等技术领域的知识分享与交流。',
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
        </Theme>
    </Auth>
);
export default AppLayout;
