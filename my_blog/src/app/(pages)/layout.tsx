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
    description: '行路客的小站,提供一些有用的资源,包括博客,友链,导航,留言等',
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
