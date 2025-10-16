'use client';

import type { FC } from 'react';
import Link from 'next/link';
import styles from './web-nav.module.css';
import type { WeblinkType } from '@/libs/weblink';

interface WebNavLink {
    name: string;
    url: string;
    description?: string;
    type: WeblinkType;
}

interface WebNavProps {
    links: WebNavLink[];
}

export const WebNav: FC<WebNavProps> = ({ links }) => {
    const groupedLinks = links.reduce((acc, link) => {
        if (!acc[link.type]) {
            acc[link.type] = [];
        }
        acc[link.type].push(link);
        return acc;
    }, {} as Record<WeblinkType, WebNavLink[]>);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>网络导航</h2>

            {Object.entries(groupedLinks).map(([type, linksInType]) => (
                <div key={type} className={styles.group}>
                    <h3 className={styles.typeTitle}>{type}</h3>
                    <div className={styles.inlineLinkGroup}>
                        {linksInType.map((link) => (
                            <span key={link.url} className={styles.inlineLinkItem}>
                                <Link href={link.url} className={styles.inlineLink}>
                                    {link.name}
                                </Link>
                                {link.description && (
                                    <span className={styles.tooltip}>{link.description}</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};