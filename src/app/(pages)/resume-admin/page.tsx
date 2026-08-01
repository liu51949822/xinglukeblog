'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/store/resume';
import { resumeConfig, type ResumeExperience } from '@/config/resume';

/**
 * 隐藏路由：简历经历编排
 * 访问地址（不在导航展示）：/resume-admin
 * 功能：导入/编辑个人经历，重新排序，保存后首页生效
 */
const ResumeAdminPage: FC = () => {
  const router = useRouter();
  const customExperiences = useResumeStore((s) => s.customExperiences);
  const useCustom = useResumeStore((s) => s.useCustom);
  const setExperiences = useResumeStore((s) => s.setExperiences);
  const resetExperiences = useResumeStore((s) => s.resetExperiences);

  // 编辑中的列表（初始化：自定义优先，否则用配置）
  const [items, setItems] = useState<ResumeExperience[]>(
    useCustom && customExperiences ? [...customExperiences] : [...resumeConfig.experiences]
  );
  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState('');

  // 更新单项
  const updateItem = (idx: number, field: keyof ResumeExperience, value: string) => {
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it))
    );
  };

  // 上移
  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  // 下移
  const moveDown = (idx: number) => {
    if (idx >= items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  // 删除
  const removeItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  // 新增
  const addItem = () => {
    setItems((prev) => [...prev, { time: '', content: '' }]);
  };

  // 导入 JSON（每行：时间 | 内容）
  const handleImport = () => {
    const lines = importText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    const parsed: ResumeExperience[] = lines.map((line) => {
      const [time, ...rest] = line.split('|');
      return { time: (time || '').trim(), content: rest.join('|').trim() };
    });
    if (parsed.length > 0) {
      setItems(parsed);
      setMessage(`已导入 ${parsed.length} 条经历`);
    } else {
      setMessage('导入格式：每行 "时间 | 内容"');
    }
  };

  // 保存
  const handleSave = () => {
    const valid = items.filter((it) => it.time.trim() && it.content.trim());
    if (valid.length === 0) {
      setMessage('经历不能为空');
      return;
    }
    setExperiences(valid);
    setMessage('已保存，首页将使用新的经历编排');
    setTimeout(() => router.push('/'), 800);
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-50 dark:tw-bg-gray-950 tw-py-8">
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
          <h1 className="tw-text-2xl tw-font-bold">📝 简历经历编排</h1>
          <Link href="/" className="tw-text-blue-600 tw-text-sm">← 返回首页</Link>
        </div>

        {/* 导入区 */}
        <div className="tw-bg-white dark:tw-bg-gray-800 tw-rounded-xl tw-p-5 tw-shadow-md tw-mb-6">
          <h2 className="tw-font-semibold tw-mb-2">快速导入</h2>
          <p className="tw-text-xs tw-text-gray-500 tw-mb-2">
            每行一条：时间 | 内容（例如：2024.01 - 至今 | Titan 无人驾驶数据处理）
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={'2024.01 - 至今 | Titan 无人驾驶数据接入\n2022.10 - 2023.12 | 中科大脑智慧城市'}
            className="tw-w-full tw-min-h-[100px] tw-border tw-border-gray-300 tw-rounded-lg tw-p-3 tw-text-sm"
          />
          <div className="tw-flex tw-gap-2 tw-mt-2">
            <button onClick={handleImport} className="tw-px-4 tw-py-2 tw-rounded-lg tw-bg-blue-600 tw-text-white tw-text-sm hover:tw-bg-blue-700">
              导入
            </button>
          </div>
        </div>

        {/* 编辑列表 */}
        <div className="tw-bg-white dark:tw-bg-gray-800 tw-rounded-xl tw-p-5 tw-shadow-md tw-mb-6">
          <h2 className="tw-font-semibold tw-mb-3">经历列表（点击可编辑，可排序）</h2>
          <div className="tw-space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="tw-flex tw-items-center tw-gap-2">
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <button onClick={() => moveUp(idx)} disabled={idx === 0} className="tw-text-xs tw-text-gray-500 disabled:tw-opacity-30">▲</button>
                  <button onClick={() => moveDown(idx)} disabled={idx === items.length - 1} className="tw-text-xs tw-text-gray-500 disabled:tw-opacity-30">▼</button>
                </div>
                <input
                  value={item.time}
                  onChange={(e) => updateItem(idx, 'time', e.target.value)}
                  placeholder="时间"
                  className="tw-w-40 tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm"
                />
                <input
                  value={item.content}
                  onChange={(e) => updateItem(idx, 'content', e.target.value)}
                  placeholder="内容"
                  className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm"
                />
                <button onClick={() => removeItem(idx)} className="tw-text-red-500 tw-text-sm">✕</button>
              </div>
            ))}
          </div>
          <div className="tw-flex tw-gap-2 tw-mt-4">
            <button onClick={addItem} className="tw-px-4 tw-py-2 tw-rounded-lg tw-bg-gray-200 dark:tw-bg-gray-700 tw-text-sm">＋ 添加</button>
          </div>
        </div>

        {message && <p className="tw-text-sm tw-text-blue-600 tw-mb-4">{message}</p>}

        <div className="tw-flex tw-gap-3">
          <button onClick={handleSave} className="tw-px-6 tw-py-2.5 tw-rounded-lg tw-bg-green-600 tw-text-white hover:tw-bg-green-700">💾 保存并应用</button>
          <button onClick={() => { resetExperiences(); setItems([...resumeConfig.experiences]); setMessage('已恢复默认配置'); }} className="tw-px-6 tw-py-2.5 tw-rounded-lg tw-bg-gray-500 tw-text-white hover:tw-bg-gray-600">
            恢复默认
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAdminPage;
