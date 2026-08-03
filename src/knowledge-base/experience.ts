/**
 * 求职知识库 - 工作经历 / 项目经历（自动生成）
 * 
 * 经历与项目知识块从 src/config/resume.ts 自动生成，
 * 在 /resume-admin 更新经历后，此知识库同步生效，无需手工维护。
 */

import type { KnowledgeChunk } from './profile';
import { resumeConfig } from '@/config/resume';

/** 每条经历的关键词（从内容提取 + 补充行业词） */
const EXPERIENCE_KEYWORDS: Record<string, string[]> = {
  '未来': ['未来', '规划', '创业', '主业'],
  '至今': ['至今', '创业', '兼职', '远程', '自由职业'],
  '2024.01': ['Titan', '无人驾驶', '数据处理', '数据接入', '清洗', '过滤', '筛查', '远程'],
  '2022.10': ['中科大脑', '智慧城市', 'UAV', '无人机', '集群', '监控', '项目管理'],
  '2021.02': ['研究所', '团队', '管理', '负责人', '晋升'],
  '2018.07': ['MES', '生产系统', 'Jack', '缝制设备', '配套软件', '7家工厂', '信息化', '数字化'],
  '2018.04': ['物联网', 'IoT', '转岗', '研发'],
  '2017.06': ['自动化', '机械', '助理工程师', '入行', '毕业'],
};

/**
 * 从简历配置自动生成经历知识块
 */
function buildExperienceChunks(): KnowledgeChunk[] {
  return resumeConfig.experiences.map((exp, index) => ({
    id: `exp-auto-${index}`,
    tags: EXPERIENCE_KEYWORDS[exp.time] || [exp.time, '经历', '工作'],
    content: `${exp.time}：${exp.content.zh}`,
  }));
}

/**
 * 从简历配置自动生成项目知识块
 */
function buildProjectChunks(): KnowledgeChunk[] {
  return resumeConfig.projects.map((project, index) => ({
    id: `project-auto-${index}`,
    tags: [project.title.zh, '项目', '作品', '案例', '项目经历'],
    content: `${project.title.zh}：${project.desc.zh}`,
  }));
}

/**
 * 固定知识块（无法从配置自动生成的补充信息）
 */
const staticKnowledge: KnowledgeChunk[] = [
  {
    id: 'exp-freelance',
    tags: ['创业', '兼职', '远程', '独立开发', '自由职业', '合作方式'],
    content:
      '本人持续接受远程合作，可独立将项目从零开发到交付上线，兼职收入可覆盖日常开销。',
  },
];

/** 自动生成的全部经历/项目知识块 */
export const experienceKnowledge: KnowledgeChunk[] = [
  ...buildExperienceChunks(),
  ...buildProjectChunks(),
  ...staticKnowledge,
];
