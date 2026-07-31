import type { FC, PropsWithChildren } from 'react';

import { Card } from '../shadcn/ui/card';
import { cn } from '../shadcn/utils';

export const ShineCard: FC<
    PropsWithChildren<{ always?: boolean; className?: string; borderRadius?: string }>
> = ({ children, className, always, borderRadius = '0.25rem' }) => {
    return (
        <Card
            className={cn(
                'tw-bg-card/40 tw-backdrop-blur-sm',
                `!tw-rounded-[${borderRadius}]`,
                className,
            )}
        >              
                {children}     
        </Card>
    );
};
