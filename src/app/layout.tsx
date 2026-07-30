import type { Metadata } from 'next';

import './styles/index.css';

import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
    title: 'nextapp',
    description: '行路客的小站',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body>{children}</body>
    </html>
);

export default RootLayout;
