'use client';

import type { FC } from 'react';
import type { RadarSkill } from '@/config/resume';

interface Props {
  data: RadarSkill[];
  size?: number;
}

/**
 * 能力雷达图（纯 SVG 实现，无第三方依赖）
 * 支持明暗主题，展示各维度熟练度
 */
export const RadarChart: FC<Props> = ({ data, size = 320 }) => {
  const center = size / 2;
  const radius = size / 2 - 44;
  const angles = data.map((_, i) => {
    const start = -Math.PI / 2; // 顶部开始
    return start + (i * 2 * Math.PI) / data.length;
  });

  // 网格层数
  const layers = 4;
  const layerRings = Array.from({ length: layers }, (_, i) => ((i + 1) * radius) / layers);

  // 每个维度的坐标
  const pointsOf = (factor: number) =>
    data
      .map((d, i) => {
        const r = radius * factor;
        return `${center + r * Math.cos(angles[i])},${center + r * Math.sin(angles[i])}`;
      })
      .join(' ');

  // 实际数值多边形
  const valuePoints = data
    .map((d, i) => {
      const r = (radius * Math.max(5, d.value)) / 100;
      return `${center + r * Math.cos(angles[i])},${center + r * Math.sin(angles[i])}`;
    })
    .join(' ');

  const labelPositions = data.map((d, i) => {
    const r = radius + 26;
    const x = center + r * Math.cos(angles[i]);
    const y = center + r * Math.sin(angles[i]);
    return { x, y, label: d.label, value: d.value };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="tw-select-none">
      {/* 网格 */}
      {layerRings.map((r, i) => (
        <polygon
          key={i}
          points={data.map((_, j) => {
            const a = angles[j];
            return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`;
          }).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={1}
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
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={1}
        />
      ))}
      {/* 数值区域 */}
      <polygon
        points={valuePoints}
        fill="url(#radarGrad)"
        fillOpacity={0.45}
        stroke="#4f8ef7"
        strokeWidth={2}
      />
      {/* 数值顶点 */}
      {data.map((d, i) => {
        const r = (radius * Math.max(5, d.value)) / 100;
        return (
          <circle
            key={i}
            cx={center + r * Math.cos(angles[i])}
            cy={center + r * Math.sin(angles[i])}
            r={3}
            fill="#4f8ef7"
          />
        );
      })}
      {/* 标签 */}
      {labelPositions.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fill="currentColor"
          className="dark:tw-fill-gray-300"
        >
          {p.label}
        </text>
      ))}
      <defs>
        <radialGradient id="radarGrad">
          <stop offset="0%" stopColor="#4f8ef7" />
          <stop offset="100%" stopColor="#7b68ee" />
        </radialGradient>
      </defs>
    </svg>
  );
};
