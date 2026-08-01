'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { resumeConfig, type ResumeExperience } from '@/config/resume';

interface ResumeState {
  /** 自定义经历列表（优先于配置文件，本地存储） */
  customExperiences: ResumeExperience[] | null;
  /** 是否使用自定义经历 */
  useCustom: boolean;
  /** 导入/设置经历 */
  setExperiences: (experiences: ResumeExperience[]) => void;
  /** 恢复使用配置文件 */
  resetExperiences: () => void;
}

/**
 * 简历数据 store
 * 经历支持在隐藏管理路由中导入编辑，持久化到 localStorage
 */
export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      customExperiences: null,
      useCustom: false,
      setExperiences: (experiences) =>
        set({ customExperiences: experiences, useCustom: true }),
      resetExperiences: () => set({ customExperiences: null, useCustom: false }),
    }),
    {
      name: 'syndate-resume',
    }
  )
);

/**
 * 获取当前经历列表（自定义优先，否则用配置文件）
 */
export const useResumeExperiences = (): ResumeExperience[] => {
  const custom = useResumeStore((s) => s.customExperiences);
  const useCustom = useResumeStore((s) => s.useCustom);
  if (useCustom && custom && custom.length > 0) return custom;
  return resumeConfig.experiences;
};
