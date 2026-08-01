'use client';

import type { FC } from 'react';
import type { RadarSkill } from '@/config/resume';

interface Props {
  data: RadarSkill[];
  size?: number;
}

/**
 * 能力雷达图（纯 SVG，无第三方依赖）
 * 设计要点：
 *  - 明暗主题自适应：网格/轴线/标签使用 CSS currentColor，跟随主题
 *  - 外圈范围明确，网格柔和
 *  - 标签与数值分开放置，避免堆叠
 */
export const RadarChart: FC<Props> = ({ data, size = 360 }) => {
  const center = size / 2;
  const radius = size / 2 - 68;
  const start = -Math.PI / 2;
  const angles = data.map((_, i) => start + (i * 2 * Math.PI) / data.length);

  const layers = 5;
  const layerRings = Array.from({ length: layers }, (_, i) => ((i + 1) * radius) / layers);

  const ringPoints = (r: number) =>
    data
      .map((_, i) => {
        const a = angles[i];
        return `${(center + r * Math.cos(a)).toFixed(1)},${(center + r * Math.sin(a)).toFixed(1)}`;
      })
      .join(' ');

  const valuePoints = data
    .map((d, i) => {
      const r = (radius * Math.max(4, d.value)) / 100;
      return `${(center + r * Math.cos(angles[i])).toFixed(1)},${(center + r * Math.sin(angles[i])).toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="tw-select-none tw-overflow-visible">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        {/* 网格层（最外圈更粗，内层柔和） */}
        {layerRings.map((r, i) => (
          <polygon
            key={i}
            points={ringPoints(r)}
            fill="none"
            className="tw-stroke-gray-300 dark:tw-stroke-gray-600"
            strokeOpacity={i === layerRings.length - 1 ? 0.7 : 0.4}
            strokeWidth={i === layerRings.length - 1 ? 1.5 : 1}
          />
        ))}
        {/* 轴线 */}
        {data.map((_, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angles[i])}
            y2={center + radius * Math.sin(angles[i])}
            className="tw-stroke-gray-300 dark:tw-stroke-gray-600"
            strokeOpacity={0.45}
            strokeWidth={1}
          />
        ))}
        {/* 数值区域 */}
        <polygon
          points={valuePoints}
          fill="url(#radarGrad)"
          fillOpacity={0.45}
          stroke="url(#radarStroke)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {/* 顶点圆点 */}
        {data.map((d, i) => {
          const r = (radius * Math.max(4, d.value)) / 100;
          const x = center + r * Math.cos(angles[i]);
          const y = center + r * Math.sin(angles[i]);
          return (
            <circle key={`dot-${i}`} cx={x} cy={y} r={4} fill="#4f8ef7" stroke="#fff" strokeWidth={1.5} />
          );
        })}
        {/* 维度标签 + 数值（分开放置避免堆叠） */}
        {data.map((d, i) => {
          const lr = radius + 20;
          const x = center + lr * Math.cos(angles[i]);
          const y = center + lr * Math.sin(angles[i]);
          const nr = radius + 38;
          const nx = center + nr * Math.cos(angles[i]);
          const ny = center + nr * Math.sin(angles[i]);
          const anchor = Math.abs(x - center) < 22 ? 'middle' : x > center ? 'start' : 'end';
          // 标签在上，数值在下（间隔足够）
          const numDy = ny > center ? 14 : -14;
          return (
            <g key={`lbl-${i}`}>
              <text
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={12}
                fontWeight={600}
                className="tw-fill-gray-700 dark:tw-fill-gray-200"
              >
                {d.label}
              </text>
              <text
                x={nx}
                y={ny + numDy}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={700}
                className="tw-fill-blue-600 dark:tw-fill-blue-400"
              >
                {d.value}
              </text>
            </g>
          );
        })}
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#7b68ee" />
            <stop offset="100%" stopColor="#4f8ef7" />
          </radialGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7b68ee" />
            <stop offset="100%" stopColor="#4f8ef7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
