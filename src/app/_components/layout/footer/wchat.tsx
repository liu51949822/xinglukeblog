'use client';

import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ContactWchatProps {
  visible: boolean;
  onClose: () => void;
}

export const ContactWchat: FC<ContactWchatProps> = ({ visible, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ESC 关闭逻辑
  useEffect(() => {
    if (!visible) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [visible, onClose]);

  if (!visible || !mounted) return null;

  // 动态背景：亮色模式用浅灰，暗色模式用深灰（与 Tailwind dark: 一致）
  const overlayClass = `
    tw-fixed tw-inset-0 tw-z-50 
    tw-bg-black/60 dark:tw-bg-black/70
    tw-flex tw-items-center tw-justify-center tw-p-4
  `;

  const modalClass = `
    tw-rounded-xl tw-p-6 tw-max-w-xs tw-w-full tw-shadow-xl
    tw-bg-white dark:tw-bg-gray-800
    tw-text-gray-900 dark:tw-text-gray-100
  `;

  const buttonClass = `
    tw-mt-4 tw-w-full tw-py-2 tw-rounded-lg tw-transition-colors
    tw-bg-gray-100 hover:tw-bg-gray-200
    dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600
  `;

  const modalContent = (
    <div
      className={overlayClass}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wechat-modal-title"
    >
      <div
        className={modalClass}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="wechat-modal-title" className="tw-text-center tw-font-semibold tw-mb-3">
          微信联系我
        </h3>
        <img
          src="/img/wechat-qrcode.jpg"
          alt="微信二维码"
          className="tw-w-full tw-h-auto tw-rounded-lg tw-border tw-border-gray-200 dark:tw-border-gray-700"
        />
        <button
          onClick={onClose}
          className={buttonClass}
        >
          关闭
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};