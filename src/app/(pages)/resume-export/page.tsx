'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { about } from '@/config/me';
import { resumeConfig } from '@/config/resume';
import { useResumeExperiences } from '@/store/resume';
import { useLocale } from '@/i18n/store';
import { getTranslation } from '@/i18n/translations';

/**
 * 简历 PDF 导出页
 * 访问地址：/resume-export
 * 功能：可选中文简历 / 英文简历，编排章节后用浏览器打印导出为 PDF
 */
const ResumeExportPage: FC = () => {
  const { persion, panels } = about;
  const experiences = useResumeExperiences();
  const locale = useLocale();
  const t = getTranslation(locale);
  const r = t.resumeExport;

  // 简历语言：默认跟随站点语言
  const [resumeLang, setResumeLang] = useState<'zh' | 'en'>(locale === 'en' ? 'en' : 'zh');
  const content = resumeLang === 'zh' ? r.zh : r.en;

  // 章节开关
  const [showSkills, setShowSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showExperience, setShowExperience] = useState(true);

  // 技能分组（按简历语言显示分组标题）
  const skillGroups = [
    { title: content.frontend, data: panels?.front?.data || [] },
    { title: content.backend, data: panels?.back?.data || [] },
    { title: content.database, data: panels?.dataAndMiddleware?.data || [] },
    { title: content.devops, data: panels?.devOps?.data || [] },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-100 dark:tw-bg-gray-950 tw-py-8">
      {/* 顶部工具条（打印时不显示） */}
      <div className="tw-print:hidden tw-max-w-3xl tw-mx-auto tw-px-4 tw-mb-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <h1 className="tw-text-xl tw-font-bold">{r.pageTitle}</h1>
          <Link href="/" className="tw-text-blue-600 tw-text-sm">{r.back}</Link>
        </div>

        {/* 语言选择 + 章节编排 */}
        <div className="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4 tw-bg-white dark:tw-bg-gray-800 tw-rounded-xl tw-p-4 tw-shadow-md">
          <div className="tw-flex tw-items-center tw-gap-2">
            <span className="tw-text-sm tw-text-gray-500">{r.langLabel}</span>
            <button
              onClick={() => setResumeLang('zh')}
              className={`tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-sm ${
                resumeLang === 'zh' ? 'tw-bg-blue-600 tw-text-white' : 'tw-bg-gray-200 dark:tw-bg-gray-700 tw-text-gray-700 dark:tw-text-gray-200'
              }`}
            >
              {r.zhResume}
            </button>
            <button
              onClick={() => setResumeLang('en')}
              className={`tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-sm ${
                resumeLang === 'en' ? 'tw-bg-blue-600 tw-text-white' : 'tw-bg-gray-200 dark:tw-bg-gray-700 tw-text-gray-700 dark:tw-text-gray-200'
              }`}
            >
              {r.enResume}
            </button>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <span className="tw-text-sm tw-text-gray-500">{r.sectionLabel}</span>
            {[
              { key: 'skills', label: r.skill, checked: showSkills, set: setShowSkills },
              { key: 'projects', label: r.project, checked: showProjects, set: setShowProjects },
              { key: 'experience', label: r.experience, checked: showExperience, set: setShowExperience },
            ].map((c) => (
              <label key={c.key} className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-cursor-pointer">
                <input type="checkbox" checked={c.checked} onChange={(e) => c.set(e.target.checked)} />
                {c.label}
              </label>
            ))}
          </div>
          <button
            onClick={handlePrint}
            className="tw-ml-auto tw-px-5 tw-py-2 tw-rounded-lg tw-bg-blue-600 tw-text-white tw-text-sm hover:tw-bg-blue-700"
          >
            {r.exportBtn}
          </button>
        </div>
      </div>

      {/* 简历内容（打印区） */}
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4">
        <div className="tw-bg-white dark:tw-bg-gray-800 tw-rounded-xl tw-p-8 tw-shadow-md">
          {/* 头部 */}
          <div className="tw-text-center tw-border-b tw-pb-4 tw-mb-6">
            <h1 className="tw-text-3xl tw-font-bold">{content.name}</h1>
            <p className="tw-text-gray-600 dark:tw-text-gray-300 tw-mt-1">{content.role}</p>
            {persion?.email && (
              <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                {content.emailLabel}: {persion.email}
              </p>
            )}
          </div>

          {/* 技能 */}
          {showSkills && (
            <div className="tw-mb-6">
              <h2 className="tw-text-lg tw-font-bold tw-border-l-4 tw-border-blue-600 tw-pl-2 tw-mb-3">{content.skillsTitle}</h2>
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
              <h2 className="tw-text-lg tw-font-bold tw-border-l-4 tw-border-purple-600 tw-pl-2 tw-mb-3">{content.projectsTitle}</h2>
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
              <h2 className="tw-text-lg tw-font-bold tw-border-l-4 tw-border-green-600 tw-pl-2 tw-mb-3">{content.experienceTitle}</h2>
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
            <h3 className="tw-font-semibold tw-mb-1">{content.aiCodingTitle}</h3>
            <p className="tw-text-gray-700 dark:tw-text-gray-300">{content.aiCodingDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeExportPage;
