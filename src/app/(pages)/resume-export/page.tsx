'use client';

import type { FC } from 'react';
import { useState, useRef } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { about } from '@/config/me';
import { resumeConfig } from '@/config/resume';
import { useResumeExperiences, useResumeProjects, useResumePreference } from '@/store/resume';
import { useLocale } from '@/i18n/store';
import { getTranslation } from '@/i18n/translations';

/**
 * 简历 PDF 导出页
 * 访问地址：/resume-export
 * 功能：可选中文简历 / 英文简历，编排章节后一键导出 PDF 文件下载
 */
const ResumeExportPage: FC = () => {
  const { persion, panels } = about;
  const experiences = useResumeExperiences();
  const locale = useLocale();
  const t = getTranslation(locale);
  const r = t.resumeExport;
  const resumeRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

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

  // 项目（从统一配置读取，按简历语言取中/英文）
  const projectsConfig = useResumeProjects();
  const bi = (b: { zh: string; en: string }) => (resumeLang === 'en' ? b.en : b.zh);
  const projectList = projectsConfig.map((p) => ({
    title: bi(p.title),
    desc: bi(p.desc),
    tech: p.tech,
    highlights: p.highlights.map(bi),
    responsibility: p.responsibility ? bi(p.responsibility) : '',
  }));

  // 经历（从统一配置读取，按简历语言取中/英文）
  const expList = experiences.map((e) => ({
    time: e.time,
    content: bi(e.content),
  }));

  // 导出 PDF：html2canvas 截图简历区域 → jsPDF 生成多页 PDF 下载
  const handleExport = async () => {
    if (!resumeRef.current || exporting) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      // A4 尺寸 (mm)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 内容超出一页时分页
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `行路客-简历-${resumeLang === 'zh' ? '中文' : 'English'}.pdf`;
      pdf.save(filename);
    } catch (e) {
      console.error('导出 PDF 失败:', e);
      alert('导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-100 dark:tw-bg-gray-950 tw-py-8">
      {/* 顶部工具条（打印时不显示） */}
      <div className="tw-print:hidden tw-max-w-3xl tw-mx-auto tw-px-4 tw-mb-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <h1 className="tw-text-xl tw-font-bold">{r.pageTitle}</h1>
          <Link
            href="/"
            className="tw-relative tw-z-20 tw-inline-block tw-px-3 tw-py-1.5 tw-text-blue-600 tw-text-sm tw-bg-white dark:tw-bg-gray-800 tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 dark:tw-border-gray-700 hover:tw-bg-blue-50 dark:hover:tw-bg-gray-700 tw-transition-colors"
          >
            {r.back}
          </Link>
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
            onClick={handleExport}
            disabled={exporting}
            className="tw-ml-auto tw-px-5 tw-py-2 tw-rounded-lg tw-bg-blue-600 tw-text-white tw-text-sm hover:tw-bg-blue-700 disabled:tw-opacity-60"
          >
            {exporting ? '导出中...' : r.exportBtn}
          </button>
        </div>
      </div>

      {/* 简历内容（导出区，html2canvas 截图） */}
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4">
        <div ref={resumeRef} className="tw-bg-white tw-rounded-xl tw-p-8 tw-shadow-md">
          {/* 头部 */}
          <div className="tw-text-center tw-border-b tw-pb-4 tw-mb-6">
            <h1 className="tw-text-3xl tw-font-bold">{content.name}</h1>
            <p className="tw-text-gray-600 dark:tw-text-gray-300 tw-mt-1">{content.role}</p>
            {/* 联系方式 */}
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-x-4 tw-gap-y-1 tw-mt-2 tw-text-sm tw-text-gray-500">
              <span>{content.emailLabel}: {resumeConfig.contact.email}</span>
              <span>{r.wechatLabel}: {resumeConfig.contact.wechat}</span>
              <span>GitHub: {resumeConfig.contact.github}</span>
            </div>
          </div>

          {/* 求职意向 */}
          <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-x-4 tw-gap-y-1 tw-text-sm tw-text-gray-600 tw-mb-4">
            <span>{r.prefCity}: {bi(useResumePreference().city)}</span>
            <span>{r.prefSalary}: {bi(useResumePreference().salary)}</span>
            <span>{r.prefAvailable}: {bi(useResumePreference().availability)}</span>
            <span>{r.prefType}: {bi(useResumePreference().type)}</span>
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
                {projectList.map((p) => (
                  <div key={p.title}>
                    <h3 className="tw-text-sm tw-font-semibold">{p.title}</h3>
                    <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">{p.desc}</p>
                    {p.responsibility && (
                      <p className="tw-text-xs tw-text-gray-700 tw-mt-0.5">职责：{p.responsibility}</p>
                    )}
                    {p.tech && p.tech.length > 0 && (
                      <p className="tw-text-xs tw-text-blue-700 tw-mt-0.5">技术栈：{p.tech.join('、')}</p>
                    )}
                    {p.highlights && p.highlights.length > 0 && (
                      <ul className="tw-text-xs tw-text-gray-500 tw-mt-1 tw-space-y-0.5">
                        {p.highlights.map((h) => (
                          <li key={h}>• {h}</li>
                        ))}
                      </ul>
                    )}
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
                {expList.map((e) => (
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
