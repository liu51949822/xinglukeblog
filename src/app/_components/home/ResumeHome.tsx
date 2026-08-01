'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { about } from '@/config/me';
import { resumeConfig } from '@/config/resume';
import { useResumeExperiences } from '@/store/resume';
import { useLocale } from '@/i18n/store';
import { getTranslation } from '@/i18n/translations';
import { HomeBackground } from './background';
import { TypedText } from '../text/typed';

/**
 * 简历式主页
 * 面向求职场景：保留原背景，突出求职定位、技能栈、项目经历、联系方式 + 5W 知识库介绍
 */
export const ResumeHome: FC = () => {
  const { persion, panels } = about;
  const locale = useLocale();
  const t = getTranslation(locale);
  const experiences = useResumeExperiences();

  // 技能分组
  const skillGroups = [
    { title: t.home.frontend, data: panels?.front?.data || [] },
    { title: t.home.backend, data: panels?.back?.data || [] },
    { title: t.home.database, data: panels?.dataAndMiddleware?.data || [] },
    { title: t.home.devops, data: panels?.devOps?.data || [] },
  ];

  // 项目
  const projects = t.home.projects.map((p, i) => ({
    ...p,
    url: resumeConfig.projects[i]?.url || '#',
  }));

  return (
    <>
      {/* 保留原背景 */}
      <div className="tw-fixed tw-inset-0 tw-z-0 tw-w-full tw-h-full">
        <HomeBackground />
      </div>

      <div className="tw-relative tw-z-10 tw-max-w-4xl tw-mx-auto tw-px-4 tw-py-8 tw-space-y-8">
        {/* 求职定位头图 */}
        <section className="tw-text-center tw-space-y-3">
          <h1 className="tw-text-4xl tw-font-bold tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-bg-clip-text tw-text-transparent">
            {persion?.name || t.home.name}
          </h1>
          <p className="tw-text-xl tw-text-gray-800 dark:tw-text-gray-200">{t.home.role}</p>
          <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">{t.home.brief}</p>

          {/* 打字机自我介绍 */}
          <div className="tw-flex tw-justify-center tw-min-h-[28px]">
            <TypedText
              className="tw-font-normal tw-text-lg tw-text-gray-800 dark:tw-text-gray-200"
              data={resumeConfig.introLines}
            />
          </div>

          {persion?.email && (
            <p className="tw-text-sm tw-text-blue-600 dark:tw-text-blue-400">
              📧 {t.home.emailLabel}: {persion.email}
            </p>
          )}
          <div className="tw-flex tw-justify-center tw-gap-3 tw-pt-2 tw-flex-wrap">
            <Link href="/myself" className="tw-px-5 tw-py-2 tw-rounded-lg tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 tw-transition-colors">
              {t.home.aboutBtn}
            </Link>
            <Link href="/deepseek" className="tw-px-5 tw-py-2 tw-rounded-lg tw-bg-purple-600 tw-text-white hover:tw-bg-purple-700 tw-transition-colors">
              {t.home.askBtn}
            </Link>
            <Link href="/projects" className="tw-px-5 tw-py-2 tw-rounded-lg tw-bg-gray-200 dark:tw-bg-gray-700 tw-text-gray-800 dark:tw-text-gray-200 hover:tw-bg-gray-300 tw-transition-colors">
              {t.home.projectsBtn}
            </Link>
            <Link href="/resume-export" className="tw-px-5 tw-py-2 tw-rounded-lg tw-bg-emerald-600 tw-text-white hover:tw-bg-emerald-700 tw-transition-colors">
              {t.home.exportBtn}
            </Link>
          </div>
        </section>

        {/* 技能栈 */}
        <section className="tw-space-y-4">
          <h2 className="tw-text-2xl tw-font-bold tw-border-l-4 tw-border-blue-500 tw-pl-3 tw-text-gray-900 dark:tw-text-gray-100">{t.home.skillsTitle}</h2>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="tw-bg-white/80 dark:tw-bg-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md">
                <h3 className="tw-font-semibold tw-mb-3 tw-text-blue-700 dark:tw:text-blue-400">{group.title}</h3>
                <div className="tw-flex tw-flex-wrap tw-gap-2">
                  {group.data.map((skill) => (
                    <span key={skill} className="tw-px-3 tw-py-1 tw-rounded-full tw-bg-blue-50 dark:tw-bg-gray-700 tw-text-sm tw-text-gray-700 dark:tw-text-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* AI Coding 亮点 */}
          <div className="tw-bg-gradient-to-r tw-from-purple-100/80 tw-to-blue-100/80 dark:tw-from-gray-800/80 dark:tw-to-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md">
            <h3 className="tw-font-semibold tw-mb-2 tw-text-purple-700 dark:tw-text-purple-400">{t.home.aiCodingTitle}</h3>
            <p className="tw-text-gray-700 dark:tw-text-gray-300 tw-text-sm">{t.home.aiCodingDesc}</p>
          </div>
        </section>

        {/* 项目经历 */}
        <section className="tw-space-y-4">
          <h2 className="tw-text-2xl tw-font-bold tw-border-l-4 tw-border-purple-500 tw-pl-3 tw-text-gray-900 dark:tw-text-gray-100">{t.home.projectsTitle}</h2>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-bg-white/80 dark:tw-bg-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md hover:tw-shadow-lg tw-transition-shadow tw-flex tw-flex-col tw-gap-2"
              >
                <h3 className="tw-font-semibold tw-text-gray-800 dark:tw-text-gray-100">{p.title}</h3>
                <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400 tw-flex-1">{p.desc}</p>
                <span className="tw-text-xs tw-text-blue-600 dark:tw-text-blue-400">{t.home.viewProject} →</span>
              </a>
            ))}
          </div>
        </section>

        {/* 关键经历（从 store/配置读取） */}
        <section className="tw-space-y-4">
          <h2 className="tw-text-2xl tw-font-bold tw-border-l-4 tw-border-green-500 tw-pl-3 tw-text-gray-900 dark:tw-text-gray-100">{t.home.experienceTitle}</h2>
          <div className="tw-bg-white/80 dark:tw-bg-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md tw-space-y-3">
            {experiences.map((item) => (
              <div key={`${item.time}-${item.content}`} className="tw-flex tw-items-start tw-gap-2">
                <span className="tw-mt-1 tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-500 tw-flex-shrink-0" />
                <p className="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                  <span className="tw-font-semibold tw-text-gray-800 dark:tw-text-gray-200">{item.time}</span> · {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 💼 知识库介绍模块（5W） */}
        <section className="tw-space-y-4">
          <h2 className="tw-text-2xl tw-font-bold tw-border-l-4 tw-border-amber-500 tw-pl-3 tw-text-gray-900 dark:tw-text-gray-100">{t.kb.badge} — {t.kb.title}</h2>
          <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">{t.kb.subtitle}</p>

          {/* 5W 卡片 */}
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            {[
              { title: t.kb.whoTitle, desc: t.kb.whoDesc, color: 'tw-from-blue-50/90 tw-to-indigo-50/90' },
              { title: t.kb.whatTitle, desc: t.kb.whatDesc, color: 'tw-from-green-50/90 tw-to-teal-50/90' },
              { title: t.kb.howWellTitle, desc: t.kb.howWellDesc, color: 'tw-from-purple-50/90 tw-to-pink-50/90' },
              { title: t.kb.whyTitle, desc: t.kb.whyDesc, color: 'tw-from-amber-50/90 tw-to-orange-50/90' },
              { title: t.kb.forWhomTitle, desc: t.kb.forWhomDesc, color: 'tw-from-cyan-50/90 tw-to-sky-50/90' },
            ].map((c) => (
              <div key={c.title} className={`tw-bg-gradient-to-br ${c.color} dark:tw-from-gray-800/80 dark:tw-to-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md`}>
                <h3 className="tw-font-semibold tw-mb-2 tw-text-gray-800 dark:tw-text-gray-200">{c.title}</h3>
                <p className="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* 技术说明 / 不足 / 改进 */}
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
            <div className="tw-bg-white/80 dark:tw-bg-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md">
              <h3 className="tw-font-semibold tw-mb-2 tw-text-gray-800 dark:tw-text-gray-200">{t.kb.techTitle}</h3>
              <ul className="tw-space-y-1.5 tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                {t.kb.techItems.map((item) => (
                  <li key={item} className="tw-flex tw-items-start tw-gap-2">
                    <span className="tw-mt-1 tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-500 tw-flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tw-bg-white/80 dark:tw-bg-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md">
              <h3 className="tw-font-semibold tw-mb-2 tw-text-gray-800 dark:tw-text-gray-200">{t.kb.limitTitle}</h3>
              <ul className="tw-space-y-1.5 tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                {t.kb.limitItems.map((item) => (
                  <li key={item} className="tw-flex tw-items-start tw-gap-2">
                    <span className="tw-mt-1 tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-red-500 tw-flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tw-bg-white/80 dark:tw-bg-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md">
              <h3 className="tw-font-semibold tw-mb-2 tw-text-gray-800 dark:tw-text-gray-200">{t.kb.planTitle}</h3>
              <ul className="tw-space-y-1.5 tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                {t.kb.planItems.map((item) => (
                  <li key={item} className="tw-flex tw-items-start tw-gap-2">
                    <span className="tw-mt-1 tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-green-500 tw-flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 提问示例 + CTA */}
          <div className="tw-bg-gradient-to-r tw-from-amber-100/80 tw-to-orange-100/80 dark:tw-from-gray-800/80 dark:tw-to-gray-800/80 tw-backdrop-blur tw-rounded-xl tw-p-6 tw-shadow-md tw-text-center">
            <h3 className="tw-font-semibold tw-mb-3 tw-text-gray-800 dark:tw-text-gray-100">{t.kb.exampleTitle}</h3>
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-2 tw-mb-4">
              {t.kb.examples.map((ex) => (
                <span key={ex} className="tw-px-3 tw-py-1.5 tw-rounded-full tw-bg-white/80 dark:tw-bg-gray-700 tw-text-sm tw-text-gray-700 dark:tw-text-gray-200 tw-shadow-sm">
                  ❓ {ex}
                </span>
              ))}
            </div>
            <Link
              href="/deepseek"
              className="tw-inline-block tw-px-8 tw-py-3 tw-rounded-xl tw-bg-gradient-to-r tw-from-amber-500 tw-to-orange-500 tw-text-white tw-font-semibold hover:tw-opacity-90 tw-transition-opacity tw-shadow-md"
            >
              {t.kb.cta}
            </Link>
            <p className="tw-text-xs tw-text-gray-600 dark:tw-text-gray-400 tw-mt-2">{t.kb.ctaDesc}</p>
          </div>
        </section>
      </div>
    </>
  );
};
