'use client';

import type { FC } from 'react';

import { Button } from '@/app/_components/shadcn/ui/button';
import { Languages } from 'lucide-react';

import { useI18nStore, useLocale } from '@/i18n/store';
import { getTranslation } from '@/i18n/translations';

/**
 * 语言切换按钮
 * 点击在 中文 / English 间切换，选择持久化到 localStorage
 */
export const LocaleChangeButton: FC = () => {
    const locale = useLocale();
    const toggleLocale = useI18nStore((s) => s.toggleLocale);
    const t = getTranslation(locale);

    return (
        <Button
            variant="outline"
            size="icon"
            className="tw-btn-icon-transparent tw-relative"
            title={t.langTitle}
            onClick={toggleLocale}
        >
            <Languages className="tw-size-4" />
            <span className="tw-absolute tw-bottom-0.5 tw-right-0.5 tw-text-[9px] tw-font-bold">
                {t.langBtn}
            </span>
        </Button>
    );
};
