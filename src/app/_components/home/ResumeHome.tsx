'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Github, MessageCircle } from 'lucide-react';
import { about } from '@/config/me';
import { resumeConfig } from '@/config/resume';
import { useResumeExperiences, useResumeStatus } from '@/store/resume';
import { useLocale } from '@/i18n/store';
import { getTranslation } from '@/i18n/translations';
import { HomeBackground } from './background';
import { TypedText } from '../text/typed';
import { RadarChart } from './RadarChart';
import { ContactWchat } from '../layout/footer/wchat';

/**
 * 简历式主页
 * 排版：Hero 居中 + 内容区左对齐标题 + 经历左右时间线 + 知识库 5W 左右分栏
 */
export const ResumeHome: FC = () => {
  const { persion, panels } = about;
  const locale = useLocale();
  const t = getTranslation(locale);
  const experiences = useResumeExperiences();
  const status = useResumeStatus();
  const [showWechat, setShowWechat] = useState(false);

  const openWechat = () => setShowWechat(true);

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

  // 5W 卡片数据
  const fiveW = [
    { title: t.kb.whoTitle, desc: t.kb.whoDesc, color: 'tw-from-blue-500/10 tw-to-indigo-500/10', icon: '👤' },
    { title: t.kb.whatTitle, desc: t.kb.whatDesc, color: 'tw-from-green-500/10 tw-to-teal-500/10', icon: '🛠' },
    { title: t.kb.howWellTitle, desc: t.kb.howWellDesc, color: 'tw-from-purple-500/10 tw-to-pink-500/10', icon: '📊' },
    { title: t.kb.whyTitle, desc: t.kb.whyDesc, color: 'tw-from-amber-500/10 tw-to-orange-500/10', icon: '💡' },
    { title: t.kb.forWhomTitle, desc: t.kb.forWhomDesc, color: 'tw-from-cyan-500/10 tw-to-sky-500/10', icon: '🤝' },
  ];

  // 技术说明 3 列
  const techCols = [
    { title: t.kb.techTitle, items: t.kb.techItems, dot: 'tw-bg-blue-500' },
    { title: t.kb.limitTitle, items: t.kb.limitItems, dot: 'tw-bg-red-500' },
    { title: t.kb.planTitle, items: t.kb.planItems, dot: 'tw-bg-green-500' },
  ];

  return (
    <>
      {/* 保留原背景 */}
      <div className="tw-fixed tw-inset-0 tw-z-0 tw-w-full tw-h-full">
        <HomeBackground />
      </div>

      <div className="tw-relative tw-z-10 tw-max-w-5xl tw-mx-auto tw-px-4 tw-py-10 tw-space-y-14">
        {/* ── Hero 居中区 ── */}
        <section className="tw-text-center tw-space-y-3">
          <h1 className="tw-text-5xl tw-font-bold tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-bg-clip-text tw-text-transparent">
            {persion?.name || t.home.name}
          </h1>

          {/* 求职状态徽标 */}
          {status.label && (
            <div className="tw-flex tw-justify-center">
              <span className={`tw-inline-block tw-px-4 tw-py-1.5 tw-rounded-full tw-bg-gradient-to-r ${status.color} tw-text-white tw-text-sm tw-font-medium tw-shadow-md`}>
                {status.label}
              </span>
            </div>
          )}

          <p className="tw-text-xl tw-text-gray-800 dark:tw-text-gray-200">{t.home.role}</p>
          <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">{t.home.brief}</p>

          {/* 打字机自我介绍 */}
          <div className="tw-flex tw-justify-center tw-min-h-[28px]">
            <TypedText
              className="tw-font-normal tw-text-lg tw-text-gray-800 dark:tw-text-gray-200"
              data={resumeConfig.introLines}
            />
          </div>

          {/* 联系方式卡片：微信弹二维码，邮箱显示完整地址可点击 */}
          <div className="tw-flex tw-justify-center tw-gap-3 tw-pt-2 tw-flex-wrap">
            {/* 微信：点击弹二维码弹窗 */}
            <button
              onClick={openWechat}
              className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-lg tw-bg-green-600 tw-text-white hover:tw-bg-green-700 tw-transition-colors tw-text-sm"
            >
              <MessageCircle className="tw-size-4" />
              {t.home.wechatLabel}
            </button>
            {/* 邮箱：显示完整邮箱，点击打开邮件客户端 */}
            <a
              href={`mailto:${resumeConfig.contact.email}`}
              className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-lg tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 tw-transition-colors tw-text-sm"
            >
              <Mail className="tw-size-4" />
              {resumeConfig.contact.email}
            </a>
            {/* GitHub */}
            <a
              href={resumeConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-lg tw-bg-gray-800 tw-text-white hover:tw-bg-gray-900 tw-transition-colors tw-text-sm"
            >
              <Github className="tw-size-4" />
              {t.home.githubLabel}
            </a>
          </div>

          <div className="tw-flex tw-justify-center tw-gap-3 tw-pt-3 tw-flex-wrap">
            <Link href="/myself" className="tw-px-5 tw-py-2 tw-rounded-lg tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600 tw-transition-colors tw-text-sm">
              {t.home.aboutBtn}
            </Link>
            <Link href="/deepseek" className="tw-px-5 tw-py-2 tw-rounded-lg tw-bg-purple-500 tw-text-white hover:tw-bg-purple-600 tw-transition-colors tw-text-sm">
              {t.home.askBtn}
            </Link>
            <Link href="/resume-export" className="tw-px-5 tw-py-2 tw-rounded-lg tw-bg-emerald-500 tw-text-white hover:tw-bg-emerald-600 tw-transition-colors tw-text-sm">
              {t.home.exportBtn}
            </Link>
          </div>
        </section>

        {/* ── 能力雷达图 ── */}
        <section className="tw-space-y-5">
          <div className="tw-flex tw-items-center tw-gap-3">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-gray-100">{t.home.radarTitle}</h2>
            <span className="tw-h-px tw-flex-1 tw-bg-gray-300/50 dark:tw-bg-gray-600/50" />
          </div>
          <div className="tw-flex tw-justify-center tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-md dark:tw-bg-gray-800">
            <RadarChart data={resumeConfig.radar} />
          </div>
        </section>

        {/* ── 技能：左对齐标题 + 2 列网格 ── */}
        <section className="tw-space-y-5">
          <div className="tw-flex tw-items-center tw-gap-3">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-gray-100">{t.home.skillsTitle}</h2>
            <span className="tw-h-px tw-flex-1 tw-bg-gray-300/50 dark:tw-bg-gray-600/50" />
          </div>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="tw-bg-white/70 dark:tw-bg-gray-800/70 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md">
                <h3 className="tw-font-semibold tw-mb-3 tw-text-blue-700 dark:tw-text-blue-400">{group.title}</h3>
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
          {/* AI Coding 亮点：左右布局 */}
          <div className="tw-bg-gradient-to-r tw-from-purple-500/10 tw-to-blue-500/10 tw-backdrop-blur tw-rounded-xl tw-p-6 tw-shadow-md tw-flex tw-flex-col md:tw-flex-row tw-gap-4 md:tw-items-center">
            <div className="tw-shrink-0">
              <h3 className="tw-text-lg tw-font-semibold tw-text-purple-700 dark:tw-text-purple-400">{t.home.aiCodingTitle}</h3>
            </div>
            <div className="tw-h-px tw-bg-purple-300/40 md:tw-h-10 md:tw-w-px" />
            <p className="tw-text-gray-700 dark:tw-text-gray-300 tw-text-sm tw-flex-1">{t.home.aiCodingDesc}</p>
          </div>
          {/* AI 云开发库 */}
          <div className="tw-bg-gradient-to-r tw-from-emerald-500/10 tw-to-teal-500/10 tw-backdrop-blur tw-rounded-xl tw-p-6 tw-shadow-md tw-flex tw-flex-col md:tw-flex-row tw-gap-4 md:tw-items-center">
            <div className="tw-shrink-0">
              <h3 className="tw-text-lg tw-font-semibold tw-text-emerald-700 dark:tw-text-emerald-400">{t.home.aiAgentTitle}</h3>
            </div>
            <div className="tw-h-px tw-bg-emerald-300/40 md:tw-h-10 md:tw-w-px" />
            <p className="tw-text-gray-700 dark:tw-text-gray-300 tw-text-sm tw-flex-1">{t.home.aiAgentDesc}</p>
            <a
              href="https://gitee.com/callmeprice/raglib"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-shrink-0 tw-px-4 tw-py-2 tw-rounded-lg tw-bg-emerald-600 tw-text-white tw-text-sm hover:tw-bg-emerald-700 tw-transition-colors"
            >
              {t.home.aiAgentBtn} →
            </a>
          </div>
        </section>

        {/* ── 项目：左对齐标题 + 3 列卡片 ── */}
        <section className="tw-space-y-5">
          <div className="tw-flex tw-items-center tw-gap-3">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-gray-100">{t.home.projectsTitle}</h2>
            <span className="tw-h-px tw-flex-1 tw-bg-gray-300/50 dark:tw-bg-gray-600/50" />
          </div>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-bg-white/70 dark:tw-bg-gray-800/70 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md hover:tw-shadow-lg tw-transition-shadow tw-flex tw-flex-col tw-gap-2"
              >
                <h3 className="tw-font-semibold tw-text-gray-800 dark:tw-text-gray-100">{p.title}</h3>
                <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400 tw-flex-1">{p.desc}</p>
                <span className="tw-text-xs tw-text-blue-600 dark:tw-text-blue-400">{t.home.viewProject} →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── 经历：左右时间线 ── */}
        <section className="tw-space-y-5">
          <div className="tw-flex tw-items-center tw-gap-3">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-gray-100">{t.home.experienceTitle}</h2>
            <span className="tw-h-px tw-flex-1 tw-bg-gray-300/50 dark:tw-bg-gray-600/50" />
          </div>
          <div className="tw-relative tw-pl-6 tw-space-y-4 tw-border-l-2 tw-border-gray-200/60 dark:tw-border-gray-700/60">
            {experiences.map((item) => (
              <div key={`${item.time}-${item.content}`} className="tw-relative">
                {/* 时间线圆点 */}
                <span className="tw-absolute -tw-left-[30px] tw-top-1.5 tw-w-3 tw-h-3 tw-rounded-full tw-bg-green-500 tw-ring-4 tw-ring-green-500/20" />
                <div className="tw-bg-white/70 dark:tw-bg-gray-800/70 tw-backdrop-blur tw-rounded-xl tw-p-4 tw-shadow-sm tw-flex tw-flex-col md:tw-flex-row md:tw-items-baseline md:tw-gap-4">
                  <span className="tw-font-semibold tw-text-gray-800 dark:tw-text-gray-200 tw-shrink-0 md:tw-w-44">{item.time}</span>
                  <span className="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">{item.content}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 知识库介绍：5W 左右分栏 ── */}
        <section className="tw-space-y-5">
          <div className="tw-flex tw-items-center tw-gap-3">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-gray-100">{t.kb.badge} — {t.kb.title}</h2>
            <span className="tw-h-px tw-flex-1 tw-bg-gray-300/50 dark:tw-bg-gray-600/50" />
          </div>
          <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">{t.kb.subtitle}</p>

          {/* 5W：左右交替排布 */}
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            {fiveW.map((c, idx) => (
              <div
                key={c.title}
                className={`tw-bg-gradient-to-br ${c.color} tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md ${
                  idx % 2 === 1 ? 'md:tw-mt-6' : ''
                }`}
              >
                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                  <span className="tw-text-xl">{c.icon}</span>
                  <h3 className="tw-font-semibold tw-text-gray-800 dark:tw-text-gray-200">{c.title}</h3>
                </div>
                <p className="tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* 技术说明 3 列 */}
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
            {techCols.map((col) => (
              <div key={col.title} className="tw-bg-white/70 dark:tw-bg-gray-800/70 tw-backdrop-blur tw-rounded-xl tw-p-5 tw-shadow-md">
                <h3 className="tw-font-semibold tw-mb-3 tw-text-gray-800 dark:tw-text-gray-200">{col.title}</h3>
                <ul className="tw-space-y-2 tw-text-sm tw-text-gray-700 dark:tw-text-gray-300">
                  {col.items.map((item) => (
                    <li key={item} className="tw-flex tw-items-start tw-gap-2">
                      <span className={`tw-mt-1.5 tw-w-1.5 tw-h-1.5 tw-rounded-full ${col.dot} tw-flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 提问示例 + CTA（居中收尾） */}
          <div className="tw-bg-gradient-to-r tw-from-amber-500/10 tw-to-orange-500/10 tw-backdrop-blur tw-rounded-xl tw-p-6 tw-shadow-md tw-text-center">
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

      {/* 微信二维码弹窗 */}
      <ContactWchat
        visible={showWechat}
        onClose={() => setShowWechat(false)}
      />
    </>
  );
};
