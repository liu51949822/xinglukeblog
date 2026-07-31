'use client';
import type { FC } from 'react';

import Link from 'next/link';

import { ShineCard } from '../../cards/shine';
import { cn } from '../../shadcn/utils';
import $styles from './list.module.css';
import { Url } from 'next/dist/shared/lib/router/router';

interface Item {
    text: string;
}

interface HomeListCardItem {
    title: string;
    data?: listIcon[];
    
}
interface listIcon {
   id: String,
                title: String,
                href: Url,
                external: boolean   
}

interface textList {
    data?: Item[];
   
}

export interface HomeListCardType {
    first: textList;
    second: HomeListCardItem;
}

type Props = HomeListCardItem & {
    className?: string;
    title: string;
    alt?: string;
};

export const HomeListCard: FC<Props> = (props) => {
    const { className, title, data } = props;
    const items = data ?? [];
    return (
         <>
        <ShineCard className="tw-h-full tw-w-full" borderRadius="0.75rem">
            <div className={cn($styles.container, className)}>
                {title && <div className={$styles.title}>{title}</div>}
                <div className={$styles.content}>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index.toFixed()}>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                    
                </div>
            </div>
        </ShineCard>
   </>);
};
