'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { about } from '@/config/me';
import { resumeConfig } from '@/config/resume';
import { useResumeExperiences } from '@/store/resume';

/**
 * 简历 PDF 导出页
 * 访问地址：/resume-export
 * 功能：编排简历内容（可选章节）后用浏览器打印导出为 PDF
 */
const ResumeExportPage: FC = () => {
  const { persion, panels } = about;
  const experiences = useResumeExperiences();

  // 章节开关
  const [showSkills, setShowSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showExperience, setShowExperience] = useState(true);

  const skillGroups = [
    { title: '前端', data: panels?.front?.data || [] },
    { title: '后端', data: panels?.back?.data || [] },
    { title: '数据库/中间件', data: panels?.dataAndMiddleware?.data || [] },
    { title: '运维/DevOps', data: panels?.devOps?.data || [] },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-100 dark:tw-bg-gray-950 tw-py-8">
      {/* 顶部工具条（打印时不显示） */}
      <div className="tw-print:hidden tw-max-w-3xl tw-mx-auto tw-px-4 tw-mb-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <h1 className="tw-text-xl tw-font-bold">📄 导出个人简历 PDF</h1>
          <Link href="/" className="tw-text-blue-600 tw-text-sm">← 返回首页</Link>
        </div>

        {/* 章节编排 */}
        <div className="tw-flex tw-flex-wrap tw-gap-3 tw-mt-4 tw-bg-white dark:tw-bg-gray-800 tw-rounded-xl tw-p-4 tw-shadow-md">
          <span className="tw-text-sm tw-text-gray-500">选择导出章节：</span>
          {[
            { key: 'skills', label: '技能', checked: showSkills, set: setShowSkills },
            { key: 'projects', label: '项目', checked: showProjects, set: setShowProjects },
            { key: 'experience', label: '经历', checked: showExperience, set: setShowExperience },
          ].map((c) => (
            <label key={c.key} className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-cursor-pointer">
              <input type="checkbox" checked={c.checked} onChange={(e) => c.set(e.target.checked)} />
              {c.label}
            </label>
          ))}
          <button
            onClick={handlePrint}
            className="tw-ml-auto tw-px-5 tw-py-2 tw-rounded-lg tw-bg-blue-600 tw-text-white tw-text-sm hover:tw-bg-blue-700"
          >
            🖨️ 导出 PDF
          </button>
        </div>
      </div>

      {/* 简历内容（打印区） */}
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4">
        <div className="tw-bg-white dark:tw-bg-gray-800 tw-rounded-xl tw-p-8 tw-shadow-md">
          {/* 头部 */}
          <div className="tw-text-center tw-border-b tw-pb-4 tw-mb-6">
            <h1 className="tw-text-3xl tw-font-bold">{persion?.name || '行路客'}</h1>
            <p className="tw-text-gray-600 dark:tw-text-gray-300 tw-mt-1">全栈软件工程师 · Java 为核心 · AI Coding 全语言胜任</p>
            {persion?.email && <p className="tw-text-sm tw-text-gray-500 tw-mt-1">📧 {persion.email}</p>}
          </div>

          {/* 技能 */}
          {showSkills && (
            <div className="tw-mb-6">
              <h2 className="tw-text-lg tw-font-bold tw-border-l-4 tw-border-blue-600 tw-pl-2 tw-mb-3">技能</h2>
              <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                {skillGroups.map((g) => (
                  <div key={g.title}>
                    <h3 className="tw-text-sm tw-font-semibold tw-text-blue-700 tw-mb-1">{g.title}</h3>
                    <p className="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">{g.data.join('、')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 项目 */}
          {showProjects && (
            <div className="tw-mb-6">
              <h2 className="tw-text-lg tw-font-bold tw-border-l-4 tw-border-purple-600 tw-pl-2 tw-mb-3">项目</h2>
              <div className="tw-space-y-3">
                {resumeConfig.projects.map((p) => (
                  <div key={p.title}>
                    <h3 className="tw-text-sm tw-font-semibold">{p.title}</h3>
                    <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 经历 */}
          {showExperience && (
            <div className="tw-mb-6">
              <h2 className="tw-text-lg tw-font-bold tw-border-l-4 tw-border-green-600 tw-pl-2 tw-mb-3">经历</h2>
              <div className="tw-space-y-3">
                {experiences.map((e) => (
                  <div key={`${e.time}-${e.content}`} className="tw-flex tw-items-start tw-gap-2">
                    <span className="tw-text-sm tw-font-semibold tw-text-gray-700 tw-w-40 tw-flex-shrink-0">{e.time}</span>
                    <span className="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">{e.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Coding 亮点 */}
          <div className="tw-bg-gray-50 dark:tw-bg-gray-700 tw-rounded-lg tw-p-4 tw-text-sm">
            <h3 className="tw-font-semibold tw-mb-1">🤖 AI Coding 能力</h3>
            <p className="tw-text-gray-700 dark:tw-text-gray-300">
              熟练运用 AI 辅助编程（vibing coding），可快速胜任 Java、前端、脚本等全语言开发，显著提升开发效率与跨语言适应能力。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeExportPage;
