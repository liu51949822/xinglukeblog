import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import { House, User, Compass, MessageSquare, Rocket } from 'lucide-react';

import Link from 'next/link';

import { useLocale } from '@/i18n/store';
import { getTranslation } from '@/i18n/translations';

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
        titleKey: 'home',
        href: '/',
        icon: House,
    },
    {
        titleKey: 'about',
        href: '/myself',
        icon: User,
    },
    {
        titleKey: 'webnav',
        href: '/webnav',
        icon: Compass,
    },
    {
        titleKey: 'message',
        href: '/message',
        icon: MessageSquare,
    },
    {
        titleKey: 'knowledge',
        href: '/deepseek',
        icon: Rocket,
    },
];

const useNavTitles = () => {
    const locale = useLocale();
    const t = getTranslation(locale);
    return items.map((item) => ({ ...item, title: t.nav[item.titleKey] }));
};

export const HeaderNav: FC = () => {
    const navItems = useNavTitles();
    return (
        <div className={$styles.nav}>
            <NavigationMenu className={$styles.menus}>
                <NavigationMenuList>
                    {navItems.map((item) => (
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
};

export const MobileNav: FC = () => {
    const navItems = useNavTitles();
    return (
        <div className={$styles.mobileNav}>
            <ul>
                {navItems.map((item) => (
                    <li key={item.href} className={$styles['mobile-menu-item']}>
                        {item.icon && <item.icon className="tw-mr-2" />}
                        <Link href={item.href}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
