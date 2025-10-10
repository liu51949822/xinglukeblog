import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import { House, BookOpen, User, Link as LinkIcon, Compass, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../../shadcn/ui/navigation-menu';
import $styles from './nav.module.css';

const items = [
    {
        title: '首页',
        href: '/',
        icon: House,
    },
    {
        title: '博客',
        href: '/blog',
        icon: BookOpen,
    },
    {
        title: '关于我',
        href: '/blog',
        icon: User,
    },
    {
        title: '友链',
        href: '/blog',
        icon: LinkIcon,
    },
        
    {
        title: '导航',
        href: '/blog',
        icon: Compass,
    },
    {
        title: '留言',
        href: '/blog',
        icon: MessageSquare,
    },
];
export const HeaderNav: FC = () => (
    <div className={$styles.nav}>
        <NavigationMenu className={$styles.menus}>
            <NavigationMenuList>
                {items.map((item) => (
                    <NavigationMenuItem key={item.href} className={cn($styles['menu-item'])}>
                        <Link href={item.href} passHref legacyBehavior>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                                {item.icon && <item.icon className="tw-mr-1" />}
                                {item.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    </div>
);

export const MobileNav: FC = () => (
    <div className={$styles.mobileNav}>
        <ul>
            {items.map((item) => (
                <li key={item.href} className={$styles['mobile-menu-item']}>
                    {item.icon && <item.icon className="tw-mr-2" />}
                    <Link href={item.href}>{item.title}</Link>
                </li>
            ))}
        </ul>
    </div>
);
