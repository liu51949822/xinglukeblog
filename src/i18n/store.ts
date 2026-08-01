'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'zh' | 'en';

interface I18nState {
  /** 当前语言 */
  locale: Locale;
  /** 设置语言 */
  setLocale: (locale: Locale) => void;
  /** 切换语言 */
  toggleLocale: () => void;
}

/**
 * 全局国际化语言状态（持久化到 localStorage）
 */
export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: 'zh',
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({ locale: state.locale === 'zh' ? 'en' : 'zh' })),
    }),
    {
      name: 'syndate-locale',
    }
  )
);

/**
 * 客户端组件内获取当前语言
 */
export const useLocale = (): Locale => useI18nStore((s) => s.locale);
