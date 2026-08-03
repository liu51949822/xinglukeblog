'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/store/resume';
import {
  resumeConfig,
  type ResumeExperience,
  type ResumePosition,
  type ValueProposition,
  type BiText,
} from '@/config/resume';

/**
 * 隐藏路由：简历配置中心（统一数据源，中英双语）
 * 访问地址（不在导航展示）：/resume-admin
 * 所有内容字段都支持中/英编辑，保存后首页按语言动态展示。
 */
const ResumeAdminPage: FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const setPosition = useResumeStore((s) => s.setPosition);
  const resetPosition = useResumeStore((s) => s.resetPosition);
  const setValue = useResumeStore((s) => s.setValue);
  const resetValue = useResumeStore((s) => s.resetValue);
  const setIntroLines = useResumeStore((s) => s.setIntroLines);
  const resetIntroLines = useResumeStore((s) => s.resetIntroLines);
  const setPreference = useResumeStore((s) => s.setPreference);
  const resetPreference = useResumeStore((s) => s.resetPreference);
  const setProjects = useResumeStore((s) => s.setProjects);
  const resetProjects = useResumeStore((s) => s.resetProjects);
  const setExperiences = useResumeStore((s) => s.setExperiences);
  const resetExperiences = useResumeStore((s) => s.resetExperiences);
  const setStatus = useResumeStore((s) => s.setStatus);
  const resetStatus = useResumeStore((s) => s.resetStatus);

  // ── 岗位定位（双语）──
  const [posPrimaryZh, setPosPrimaryZh] = useState(resumeConfig.position.primary.zh);
  const [posPrimaryEn, setPosPrimaryEn] = useState(resumeConfig.position.primary.en);
  const [posSecondaryZh, setPosSecondaryZh] = useState(
    resumeConfig.position.secondary.map((s) => s.zh).join(', ')
  );
  const [posSecondaryEn, setPosSecondaryEn] = useState(
    resumeConfig.position.secondary.map((s) => s.en).join(', ')
  );
  const [posSummaryZh, setPosSummaryZh] = useState(resumeConfig.position.summary.zh);
  const [posSummaryEn, setPosSummaryEn] = useState(resumeConfig.position.summary.en);

  // ── 价值陈述（双语）──
  const [valTitleZh, setValTitleZh] = useState(resumeConfig.value.title.zh);
  const [valTitleEn, setValTitleEn] = useState(resumeConfig.value.title.en);
  const [valPointsZh, setValPointsZh] = useState(resumeConfig.value.points.map((p) => p.zh).join('\n'));
  const [valPointsEn, setValPointsEn] = useState(resumeConfig.value.points.map((p) => p.en).join('\n'));

  // ── 自我介绍（双语）──
  const [introZh, setIntroZh] = useState(resumeConfig.introLines.map((l) => l.zh).join('\n'));
  const [introEn, setIntroEn] = useState(resumeConfig.introLines.map((l) => l.en).join('\n'));

  // ── 经历（双语）──
  const [items, setItems] = useState<ResumeExperience[]>(
    resumeConfig.experiences.map((e) => ({
      time: e.time,
      content: { zh: e.content.zh, en: e.content.en },
    }))
  );

  // ── 求职意向（双语）──
  const [prefCityZh, setPrefCityZh] = useState(resumeConfig.preference.city.zh);
  const [prefCityEn, setPrefCityEn] = useState(resumeConfig.preference.city.en);
  const [prefSalaryZh, setPrefSalaryZh] = useState(resumeConfig.preference.salary.zh);
  const [prefSalaryEn, setPrefSalaryEn] = useState(resumeConfig.preference.salary.en);
  const [prefAvailZh, setPrefAvailZh] = useState(resumeConfig.preference.availability.zh);
  const [prefAvailEn, setPrefAvailEn] = useState(resumeConfig.preference.availability.en);
  const [prefTypeZh, setPrefTypeZh] = useState(resumeConfig.preference.type.zh);
  const [prefTypeEn, setPrefTypeEn] = useState(resumeConfig.preference.type.en);

  // ── 项目（双语 + 职责）──
  const [projects, setProjectsState] = useState(
    resumeConfig.projects.map((p) => ({
      title: { zh: p.title.zh, en: p.title.en },
      desc: { zh: p.desc.zh, en: p.desc.en },
      tech: p.tech.join(', '),
      highlights: p.highlights.map((h) => ({ zh: h.zh, en: h.en })).map((h) => `${h.zh} | ${h.en}`),
      responsibility: { zh: p.responsibility?.zh || '', en: p.responsibility?.en || '' },
      url: p.url,
    }))
  );

  // ── 求职状态（双语）──
  const [statusLabelZh, setStatusLabelZh] = useState(resumeConfig.status.label.zh);
  const [statusLabelEn, setStatusLabelEn] = useState(resumeConfig.status.label.en);
  const [statusColor, setStatusColor] = useState(resumeConfig.status.color);
  const colorOptions = [
    { label: '绿色', value: 'tw-from-emerald-500 tw-to-teal-500' },
    { label: '蓝色', value: 'tw-from-blue-500 tw-to-indigo-500' },
    { label: '紫色', value: 'tw-from-purple-500 tw-to-pink-500' },
    { label: '橙色', value: 'tw-from-orange-500 tw-to-amber-500' },
    { label: '红色', value: 'tw-from-red-500 tw-to-rose-500' },
  ];

  // ── 经历操作 ──
  const updateItem = (idx: number, lang: 'zh' | 'en', v: string) => {
    setItems((prev) =>
      prev.map((it, i) =>
        i === idx ? { ...it, content: { ...it.content, [lang]: v } } : it
      )
    );
  };
  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };
  const moveDown = (idx: number) => {
    if (idx >= items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));
  const addItem = () =>
    setItems((prev) => [...prev, { time: '', content: { zh: '', en: '' } }]);

  // ── 保存全部 ──
  const handleSave = () => {
    const splitPair = (zh: string, en: string, max = 2) => {
      const zArr = zh.split(',').map((s) => s.trim()).filter(Boolean).slice(0, max);
      const eArr = en.split(',').map((s) => s.trim()).filter(Boolean).slice(0, max);
      return zArr.map((z, i) => ({ zh: z, en: eArr[i] || z }));
    };

    // 岗位定位
    const position: ResumePosition = {
      primary: { zh: posPrimaryZh.trim(), en: posPrimaryEn.trim() || posPrimaryZh.trim() },
      secondary: splitPair(posSecondaryZh, posSecondaryEn),
      summary: { zh: posSummaryZh.trim(), en: posSummaryEn.trim() || posSummaryZh.trim() },
    };
    if (position.primary.zh) setPosition(position);

    // 价值陈述
    const pz = valPointsZh.split('\n').map((l) => l.trim()).filter(Boolean);
    const pe = valPointsEn.split('\n').map((l) => l.trim()).filter(Boolean);
    const value: ValueProposition = {
      title: { zh: valTitleZh.trim(), en: valTitleEn.trim() || valTitleZh.trim() },
      points: pz.map((zh, i) => ({ zh, en: pe[i] || zh })),
    };
    if (value.points.length > 0) setValue(value);

    // 自我介绍
    const iz = introZh.split('\n').map((l) => l.trim()).filter(Boolean);
    const ie = introEn.split('\n').map((l) => l.trim()).filter(Boolean);
    const intro: BiText[] = iz.map((zh, i) => ({ zh, en: ie[i] || zh }));
    if (intro.length > 0) setIntroLines(intro);

    // 经历
    const valid = items.filter((it) => it.time.trim() && (it.content.zh.trim() || it.content.en.trim()));
    if (valid.length > 0) setExperiences(valid);

    // 求职状态
    if (statusLabelZh.trim()) {
      setStatus({
        label: { zh: statusLabelZh.trim(), en: statusLabelEn.trim() || statusLabelZh.trim() },
        color: statusColor,
      });
    }

    // 求职意向
    if (prefCityZh.trim() || prefSalaryZh.trim()) {
      setPreference({
        city: { zh: prefCityZh.trim(), en: prefCityEn.trim() || prefCityZh.trim() },
        salary: { zh: prefSalaryZh.trim(), en: prefSalaryEn.trim() || prefSalaryZh.trim() },
        availability: { zh: prefAvailZh.trim(), en: prefAvailEn.trim() || prefAvailZh.trim() },
        type: { zh: prefTypeZh.trim(), en: prefTypeEn.trim() || prefTypeZh.trim() },
      });
    }

    // 项目
    const parsedProjects = projects
      .map((p) => {
        const highlights = p.highlights
          .map((line) => line.split('|').map((s) => s.trim()))
          .filter((parts) => parts[0])
          .map(([zh, en]) => ({ zh, en: en || zh }));
        return {
          title: { zh: p.title.zh.trim(), en: p.title.en.trim() || p.title.zh.trim() },
          desc: { zh: p.desc.zh.trim(), en: p.desc.en.trim() || p.desc.zh.trim() },
          tech: p.tech.split(',').map((s) => s.trim()).filter(Boolean),
          highlights,
          responsibility: {
            zh: p.responsibility.zh.trim(),
            en: p.responsibility.en.trim() || p.responsibility.zh.trim(),
          },
          url: p.url.trim(),
        };
      })
      .filter((p) => p.title.zh);
    if (parsedProjects.length > 0) setProjects(parsedProjects);

    setMessage('已保存，首页将使用最新配置（支持中英文切换）');
    setTimeout(() => router.push('/'), 800);
  };

  // ── 全部恢复默认 ──
  const handleReset = () => {
    resetPosition();
    resetValue();
    resetIntroLines();
    resetExperiences();
    resetStatus();
    resetPreference();
    resetProjects();
    setPosPrimaryZh(resumeConfig.position.primary.zh);
    setPosPrimaryEn(resumeConfig.position.primary.en);
    setPosSecondaryZh(resumeConfig.position.secondary.map((s) => s.zh).join(', '));
    setPosSecondaryEn(resumeConfig.position.secondary.map((s) => s.en).join(', '));
    setPosSummaryZh(resumeConfig.position.summary.zh);
    setPosSummaryEn(resumeConfig.position.summary.en);
    setValTitleZh(resumeConfig.value.title.zh);
    setValTitleEn(resumeConfig.value.title.en);
    setValPointsZh(resumeConfig.value.points.map((p) => p.zh).join('\n'));
    setValPointsEn(resumeConfig.value.points.map((p) => p.en).join('\n'));
    setIntroZh(resumeConfig.introLines.map((l) => l.zh).join('\n'));
    setIntroEn(resumeConfig.introLines.map((l) => l.en).join('\n'));
    setItems(resumeConfig.experiences.map((e) => ({ time: e.time, content: { zh: e.content.zh, en: e.content.en } })));
    setStatusLabelZh(resumeConfig.status.label.zh);
    setStatusLabelEn(resumeConfig.status.label.en);
    setStatusColor(resumeConfig.status.color);
    setMessage('已恢复默认配置');
  };

  const card = 'tw-bg-white dark:tw-bg-gray-800 tw-rounded-xl tw-p-5 tw-shadow-md tw-mb-6';
  const label = 'tw-text-xs tw-text-gray-500 tw-block tw-mb-1';
  const input = 'tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm dark:tw-bg-gray-700 dark:tw-border-gray-600';
  const langRow = (zh: string, en: string, setZh: (v: string) => void, setEn: (v: string) => void, isArea = false) => (
    <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-mt-2">
      <div>
        <label className={label}>中文</label>
        {isArea
          ? <textarea value={zh} onChange={(e) => setZh(e.target.value)} rows={2} className={input} />
          : <input value={zh} onChange={(e) => setZh(e.target.value)} className={input} />}
      </div>
      <div>
        <label className={label}>English</label>
        {isArea
          ? <textarea value={en} onChange={(e) => setEn(e.target.value)} rows={2} className={input} />
          : <input value={en} onChange={(e) => setEn(e.target.value)} className={input} />}
      </div>
    </div>
  );

  return (
    <div className="tw-min-h-screen tw-bg-gray-50 dark:tw-bg-gray-950 tw-py-8">
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
          <h1 className="tw-text-2xl tw-font-bold">📝 简历配置中心（中英双语）</h1>
          <Link href="/" className="tw-text-blue-600 tw-text-sm">← 返回首页</Link>
        </div>
        <p className="tw-text-xs tw-text-gray-500 tw-mb-4">
          每个内容都支持中文和英文，保存后首页按语言切换动态展示。
        </p>

        {/* 岗位定位 */}
        <div className={card}>
          <h2 className="tw-font-semibold tw-mb-3">🎯 岗位定位</h2>
          <label className={label}>主标签</label>
          {langRow(posPrimaryZh, posPrimaryEn, setPosPrimaryZh, setPosPrimaryEn)}
          <label className={`${label} tw-mt-3`}>副标签（逗号分隔，最多 2 个）</label>
          {langRow(posSecondaryZh, posSecondaryEn, setPosSecondaryZh, setPosSecondaryEn)}
          <label className={`${label} tw-mt-3`}>定位描述</label>
          {langRow(posSummaryZh, posSummaryEn, setPosSummaryZh, setPosSummaryEn, true)}
        </div>

        {/* 价值陈述 */}
        <div className={card}>
          <h2 className="tw-font-semibold tw-mb-3">💼 价值陈述</h2>
          <label className={label}>标题</label>
          {langRow(valTitleZh, valTitleEn, setValTitleZh, setValTitleEn)}
          <label className={`${label} tw-mt-3`}>要点（每行一条，中英一一对应）</label>
          {langRow(valPointsZh, valPointsEn, setValPointsZh, setValPointsEn, true)}
        </div>

        {/* 自我介绍 */}
        <div className={card}>
          <h2 className="tw-font-semibold tw-mb-3">⌨️ 自我介绍（打字机，每行一条）</h2>
          {langRow(introZh, introEn, setIntroZh, setIntroEn, true)}
        </div>

        {/* 求职状态 */}
        <div className={card}>
          <h2 className="tw-font-semibold tw-mb-3">🏷️ 求职状态徽标</h2>
          {langRow(statusLabelZh, statusLabelEn, setStatusLabelZh, setStatusLabelEn)}
          <label className={`${label} tw-mt-3`}>徽标颜色</label>
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            {colorOptions.map((c) => (
              <button
                key={c.value}
                onClick={() => setStatusColor(c.value)}
                className={`tw-px-3 tw-py-1.5 tw-rounded-full tw-bg-gradient-to-r ${c.value} tw-text-white tw-text-xs ${
                  statusColor === c.value ? 'tw-ring-2 tw-ring-offset-2 tw-ring-blue-500' : 'tw-opacity-80'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* 经历 */}
        <div className={card}>
          <h2 className="tw-font-semibold tw-mb-3">📈 工作经历（中英双语）</h2>
          <div className="tw-space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-rounded-lg tw-p-3">
                <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                  <div className="tw-flex tw-flex-col">
                    <button onClick={() => moveUp(idx)} disabled={idx === 0} className="tw-text-xs tw-text-gray-500 disabled:tw-opacity-30">▲</button>
                    <button onClick={() => moveDown(idx)} disabled={idx === items.length - 1} className="tw-text-xs tw-text-gray-500 disabled:tw-opacity-30">▼</button>
                  </div>
                  <input
                    value={item.time}
                    onChange={(e) =>
                      setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, time: e.target.value } : it)))
                    }
                    className="tw-w-36 tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm dark:tw-bg-gray-700"
                    placeholder="时间"
                  />
                  <button onClick={() => removeItem(idx)} className="tw-text-red-500 tw-text-sm">✕</button>
                </div>
                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                  <textarea value={item.content.zh} onChange={(e) => updateItem(idx, 'zh', e.target.value)} rows={2} className={input} placeholder="中文内容" />
                  <textarea value={item.content.en} onChange={(e) => updateItem(idx, 'en', e.target.value)} rows={2} className={input} placeholder="English" />
                </div>
              </div>
            ))}
          </div>
          <button onClick={addItem} className="tw-mt-3 tw-px-4 tw-py-2 tw-rounded-lg tw-bg-gray-200 dark:tw-bg-gray-700 tw-text-sm">＋ 添加</button>
        </div>

        {/* 求职意向 */}
        <div className={card}>
          <h2 className="tw-font-semibold tw-mb-3">📍 求职意向（中英双语）</h2>
          <label className={label}>期望城市</label>
          {langRow(prefCityZh, prefCityEn, setPrefCityZh, setPrefCityEn)}
          <label className={`${label} tw-mt-3`}>期望薪资</label>
          {langRow(prefSalaryZh, prefSalaryEn, setPrefSalaryZh, setPrefSalaryEn)}
          <label className={`${label} tw-mt-3`}>到岗时间</label>
          {langRow(prefAvailZh, prefAvailEn, setPrefAvailZh, setPrefAvailEn)}
          <label className={`${label} tw-mt-3`}>工作性质</label>
          {langRow(prefTypeZh, prefTypeEn, setPrefTypeZh, setPrefTypeEn)}
        </div>

        {/* 项目（含职责） */}
        <div className={card}>
          <h2 className="tw-font-semibold tw-mb-3">📦 项目（中英双语 + 职责）</h2>
          <div className="tw-space-y-3">
            {projects.map((p, idx) => (
              <div key={idx} className="tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-rounded-lg tw-p-3 tw-space-y-2">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-text-xs tw-text-gray-500 tw-w-16">项目 {idx + 1}</span>
                  <button onClick={() => setProjectsState((prev) => prev.filter((_, i) => i !== idx))} className="tw-text-red-500 tw-text-xs">✕</button>
                </div>
                <label className={label}>名称 / 链接</label>
                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                  <input value={p.title.zh} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, title: { ...it.title, zh: e.target.value } } : it)))} className={input} placeholder="中文名" />
                  <input value={p.title.en} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, title: { ...it.title, en: e.target.value } } : it)))} className={input} placeholder="English" />
                </div>
                <input value={p.url} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, url: e.target.value } : it)))} className={input} placeholder="链接 URL" />
                <label className={label}>一句话描述</label>
                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                  <input value={p.desc.zh} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, desc: { ...it.desc, zh: e.target.value } } : it)))} className={input} placeholder="中文描述" />
                  <input value={p.desc.en} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, desc: { ...it.desc, en: e.target.value } } : it)))} className={input} placeholder="English desc" />
                </div>
                <label className={label}>技术栈（逗号分隔）</label>
                <input value={p.tech} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, tech: e.target.value } : it)))} className={input} placeholder="Java, Spring Boot, MySQL" />
                <label className={label}>我的职责</label>
                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                  <textarea value={p.responsibility.zh} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, responsibility: { ...it.responsibility, zh: e.target.value } } : it)))} rows={2} className={input} placeholder="中文职责" />
                  <textarea value={p.responsibility.en} onChange={(e) => setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, responsibility: { ...it.responsibility, en: e.target.value } } : it)))} rows={2} className={input} placeholder="English responsibility" />
                </div>
                <label className={label}>成果（每行一条，格式：中文 | English）</label>
                <textarea
                  value={p.highlights.join('\n')}
                  onChange={(e) =>
                    setProjectsState((prev) => prev.map((it, i) => (i === idx ? { ...it, highlights: e.target.value.split('\n') } : it)))
                  }
                  rows={3}
                  className={input}
                  placeholder={'贴近客户二次改造，推动设备采购 | Customized closely to clients\n适配 7 家工厂工艺 | Adapted to 7 factories'}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setProjectsState((prev) => [
                ...prev,
                { title: { zh: '', en: '' }, desc: { zh: '', en: '' }, tech: '', highlights: [], responsibility: { zh: '', en: '' }, url: '' },
              ])
            }
            className="tw-mt-3 tw-px-4 tw-py-2 tw-rounded-lg tw-bg-gray-200 dark:tw-bg-gray-700 tw-text-sm"
          >
            ＋ 添加项目
          </button>
        </div>

        {message && <p className="tw-text-sm tw-text-blue-600 tw-mb-4">{message}</p>}

        <div className="tw-flex tw-gap-3 tw-pb-8">
          <button onClick={handleSave} className="tw-px-6 tw-py-2.5 tw-rounded-lg tw-bg-green-600 tw-text-white hover:tw-bg-green-700">💾 保存并应用</button>
          <button onClick={handleReset} className="tw-px-6 tw-py-2.5 tw-rounded-lg tw-bg-gray-500 tw-text-white hover:tw-bg-gray-600">↺ 恢复默认</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAdminPage;
