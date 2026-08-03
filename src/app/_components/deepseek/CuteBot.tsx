'use client';

import type { FC } from 'react';

/**
 * 二次元动漫风角色（猫娘风格）
 * - 精致手绘 SVG：发型、大眼、猫耳、腮红、微笑
 * - CSS 动画：眨眼、呼吸浮动、猫耳轻动
 * - 无外部依赖，纯本地
 */

export const CuteBot: FC<{ size?: number; listening?: boolean; speaking?: boolean }> = ({
  size = 64,
  listening,
  speaking,
}) => {
  return (
    <div className="tw-relative tw-flex tw-items-center tw-justify-center" style={{ width: size, height: size }}>
      {/* 呼吸浮动 */}
      <div className={`${speaking ? 'tw-animate-bounce' : 'tw-animate-[bot-float_3s_ease-in-out_infinite]'}`}>
        <svg
          viewBox="0 0 120 120"
          style={{ width: size, height: size }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5a2b" />
              <stop offset="100%" stopColor="#6b4226" />
            </linearGradient>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd6e8" />
              <stop offset="100%" stopColor="#c9a7ff" />
            </linearGradient>
            <radialGradient id="eyeGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ff8fb1" />
              <stop offset="100%" stopColor="#e0557e" />
            </radialGradient>
          </defs>

          {/* 背景圆 */}
          <circle cx="60" cy="60" r="54" fill="url(#bg)" />
          {/* 光晕 */}
          <circle cx="42" cy="42" r="18" fill="#fff" opacity="0.4" />

          {/* 身体/衣服 */}
          <path d="M38 88 Q38 66 60 66 Q82 66 82 88 L86 104 Q60 112 34 104 Z" fill="#7c9bff" />
          <path d="M52 82 Q60 78 68 82 L66 100 Q54 100 52 82 Z" fill="#a8c0ff" opacity="0.6" />

          {/* 脖子 */}
          <rect x="54" y="74" width="12" height="8" rx="4" fill="#ffe3c4" />

          {/* 头发（后层） */}
          <path d="M30 60 Q24 30 60 22 Q96 30 90 60 L86 78 Q80 90 60 90 Q40 90 34 78 Z" fill="url(#hair)" />
          {/* 刘海 */}
          <path d="M32 48 Q36 26 60 24 Q84 26 88 48 L84 42 Q78 30 60 28 Q42 30 36 42 Z" fill="url(#hair)" />

          {/* 猫耳（左） */}
          <path d="M36 34 L28 12 L50 24 Q44 28 40 32 Z" fill="#8b5a2b">
            <animateTransform attributeName="transform" type="rotate" values="-2 36 30;3 36 30;-2 36 30" dur="2.5s" repeatCount="indefinite" />
          </path>
          <path d="M37 32 L31 18 L45 26 Z" fill="#ffb3c1" />
          {/* 猫耳（右） */}
          <path d="M84 34 L92 12 L70 24 Q76 28 80 32 Z" fill="#8b5a2b">
            <animateTransform attributeName="transform" type="rotate" values="2 84 30;-3 84 30;2 84 30" dur="2.5s" repeatCount="indefinite" />
          </path>
          <path d="M83 32 L89 18 L75 26 Z" fill="#ffb3c1" />

          {/* 脸 */}
          <ellipse cx="60" cy="52" rx="24" ry="22" fill="#ffe3c4" />

          {/* 眼睛（大眼 + 高光） */}
          <g>
            <ellipse cx="50" cy="50" rx="7" ry="8.5" fill="url(#eyeGrad)">
              {/* 眨眼 */}
              {!speaking && !listening && (
                <animate attributeName="ry" values="8.5;8.5;8.5;1;8.5;8.5;8.5;8.5" dur="4s" repeatCount="indefinite" keyTimes="0;0.9;0.92;0.94;0.96;0.98;0.99;1" />
              )}
            </ellipse>
            <circle cx="53" cy="47" r="2.5" fill="#fff" />
            <ellipse cx="70" cy="50" rx="7" ry="8.5" fill="url(#eyeGrad)">
              {!speaking && !listening && (
                <animate attributeName="ry" values="8.5;8.5;8.5;1;8.5;8.5;8.5;8.5" dur="4s" repeatCount="indefinite" keyTimes="0;0.9;0.92;0.94;0.96;0.98;0.99;1" />
              )}
            </ellipse>
            <circle cx="73" cy="47" r="2.5" fill="#fff" />
          </g>

          {/* 腮红 */}
          <ellipse cx="42" cy="56" rx="4" ry="2.5" fill="#ff9eb5" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="78" cy="56" rx="4" ry="2.5" fill="#ff9eb5" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </ellipse>

          {/* 嘴：说话开合 */}
          {speaking ? (
            <path d="M54 60 Q60 70 66 60 Z" fill="#e0557e">
              <animate attributeName="d" values="M54 60 Q60 66 66 60 Z;M54 60 Q60 72 66 60 Z;M54 60 Q60 66 66 60 Z" dur="0.4s" repeatCount="indefinite" />
            </path>
          ) : (
            <path d="M55 60 Q60 64 65 60" stroke="#e0557e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
        </svg>
      </div>

      {/* 录音/说话光圈 */}
      {listening && (
        <span className="tw-absolute tw-inset-0 tw-rounded-full tw-ring-4 tw-ring-red-400/60 tw-animate-pulse" />
      )}
      {speaking && !listening && (
        <span className="tw-absolute tw-inset-0 tw-rounded-full tw-ring-4 tw-ring-blue-400/60" />
      )}
    </div>
  );
};
