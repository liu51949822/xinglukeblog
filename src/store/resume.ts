'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  resumeConfig,
  type ResumeExperience,
  type ResumeStatus,
  type ResumePosition,
  type ValueProposition,
  type JobPreference,
  type ResumeProject,
  type BiText,
} from '@/config/resume';

interface ResumeState {
  customExperiences: ResumeExperience[] | null;
  customStatus: ResumeStatus | null;
  customPosition: ResumePosition | null;
  customValue: ValueProposition | null;
  customIntroLines: BiText[] | null;
  customPreference: JobPreference | null;
  customProjects: ResumeProject[] | null;

  setExperiences: (experiences: ResumeExperience[]) => void;
  resetExperiences: () => void;
  setStatus: (status: ResumeStatus) => void;
  resetStatus: () => void;
  setPosition: (position: ResumePosition) => void;
  resetPosition: () => void;
  setValue: (value: ValueProposition) => void;
  resetValue: () => void;
  setIntroLines: (lines: BiText[]) => void;
  resetIntroLines: () => void;
  setPreference: (preference: JobPreference) => void;
  resetPreference: () => void;
  setProjects: (projects: ResumeProject[]) => void;
  resetProjects: () => void;
}

/**
 * 简历数据 store（统一数据源）
 * 首页所有主要内容支持在隐藏路由 /resume-admin 配置，持久化到 localStorage。
 * 自定义配置优先于 src/config/resume.ts 默认值。
 */
export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      customExperiences: null,
      customStatus: null,
      customPosition: null,
      customValue: null,
      customIntroLines: null,
      customPreference: null,
      customProjects: null,

      setExperiences: (experiences) => set({ customExperiences: experiences }),
      resetExperiences: () => set({ customExperiences: null }),
      setStatus: (status) => set({ customStatus: status }),
      resetStatus: () => set({ customStatus: null }),
      setPosition: (position) => set({ customPosition: position }),
      resetPosition: () => set({ customPosition: null }),
      setValue: (value) => set({ customValue: value }),
      resetValue: () => set({ customValue: null }),
      setIntroLines: (lines) => set({ customIntroLines: lines }),
      resetIntroLines: () => set({ customIntroLines: null }),
      setPreference: (preference) => set({ customPreference: preference }),
      resetPreference: () => set({ customPreference: null }),
      setProjects: (projects) => set({ customProjects: projects }),
      resetProjects: () => set({ customProjects: null }),
    }),
    {
      name: 'syndate-resume',
    }
  )
);

export const useResumeExperiences = (): ResumeExperience[] => {
  const custom = useResumeStore((s) => s.customExperiences);
  if (custom && custom.length > 0) return custom;
  return resumeConfig.experiences;
};

export const useResumeStatus = (): ResumeStatus => {
  const custom = useResumeStore((s) => s.customStatus);
  if (custom && custom.label.zh.trim()) return custom;
  return resumeConfig.status;
};

export const useResumePosition = (): ResumePosition => {
  const custom = useResumeStore((s) => s.customPosition);
  if (custom && custom.primary.zh.trim()) return custom;
  return resumeConfig.position;
};

export const useResumeValue = (): ValueProposition => {
  const custom = useResumeStore((s) => s.customValue);
  if (custom && custom.points.length > 0) return custom;
  return resumeConfig.value;
};

export const useResumeIntroLines = (): BiText[] => {
  const custom = useResumeStore((s) => s.customIntroLines);
  if (custom && custom.length > 0) return custom;
  return resumeConfig.introLines;
};

export const useResumePreference = (): JobPreference => {
  const custom = useResumeStore((s) => s.customPreference);
  if (custom && custom.city.zh.trim()) return custom;
  return resumeConfig.preference;
};

export const useResumeProjects = (): ResumeProject[] => {
  const custom = useResumeStore((s) => s.customProjects);
  if (custom && custom.length > 0) return custom;
  return resumeConfig.projects;
};
