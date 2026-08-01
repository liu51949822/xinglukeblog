import type { FC } from 'react';

import { AuthProtector } from '@/app/_components/auth/checking';
import { Button } from '@/app/_components/shadcn/ui/button';
import { Loader2 } from 'lucide-react';

import { ApiDocButton } from './api-doc';
import { PostCreateButton } from './post-create';
import { ThemeChangeButton } from './theme-change';
import { LocaleChangeButton } from './locale-change';
export const HeaderTools: FC<{ isMobile?: boolean }> = ({ isMobile = true }) => (
    <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2">
        <AuthProtector>
            <PostCreateButton iconBtn={isMobile} />
        </AuthProtector>
        <LocaleChangeButton />
        <ApiDocButton />
        <ThemeChangeButton />
    </div>
);
