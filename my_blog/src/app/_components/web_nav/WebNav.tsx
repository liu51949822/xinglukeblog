'use client';

import type { FC } from 'react';
import Link from 'next/link';
import styles from './web-nav.module.css';

interface WebNavProps {
    links: Array<{
        name: string;
        url: string;
        description?: string;
        icon?: string;
        type: number;
    }>;
}

export const WebNav: FC<WebNavProps> = ({ links }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>网址导航</h2>
            <ul className={styles.linkList}>
                {links.map((link, index) => (
                    <li key={index} className={styles.linkItem}>
                        <Link href={link.url} className={styles.link}>
                            {link.name}
                        </Link>
                        {link.description && (
                            <p className={styles.description}>{link.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
