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
<<<<<<< HEAD
    description:
        '行路客的小站,记录技术文档和分享生活点滴,专注于全栈开发、编程语言、数据库、云计算等技术领域的知识分享与交流。',
=======
    description: '行路客的小站,提供一些有用的资源,包括博客,友链,导航,留言等',
>>>>>>> 34ecd8c3c1ec1992ecdde90d83be16c80d3e5458
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
