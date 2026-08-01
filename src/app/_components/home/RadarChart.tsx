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
 *  - 数值差异可视化，顶点用圆点 + 数值标注
 *  - 渐变填充 + 多层网格，明暗主题均可读
 *  - 蓝紫渐变配色，贴近站点主色调
 */
export const RadarChart: FC<Props> = ({ data, size = 340 }) => {
  const center = size / 2;
  const radius = size / 2 - 56;
  const start = -Math.PI / 2; // 从顶部开始
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
        {/* 网格层 */}
        {layerRings.map((r, i) => (
          <polygon
            key={i}
            points={ringPoints(r)}
            fill={i === 0 ? 'rgba(255,255,255,0.04)' : 'none'}
            stroke="rgba(255,255,255,0.55)"
            strokeOpacity={0.3}
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
            stroke="rgba(255,255,255,0.35)"
            strokeOpacity={0.25}
            strokeWidth={1}
          />
        ))}
        {/* 数值区域 */}
        <polygon
          points={valuePoints}
          fill="url(#radarGrad)"
          fillOpacity={0.35}
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
        {/* 维度标签 + 数值 */}
        {data.map((d, i) => {
          const lr = radius + 20;
          const x = center + lr * Math.cos(angles[i]);
          const y = center + lr * Math.sin(angles[i]);
          const nr = radius + 34;
          const nx = center + nr * Math.cos(angles[i]);
          const ny = center + nr * Math.sin(angles[i]);
          // 左侧(end)/中间(middle)标签向左偏移，避免贴边
          const anchor = Math.abs(x - center) < 22 ? 'middle' : x > center ? 'start' : 'end';
          // 长标签（右/左）在垂直方向稍收紧，避免与数值重叠
          const labelDy = d.label.length >= 5 ? -7 : 0;
          return (
            <g key={`lbl-${i}`}>
              <text
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={12}
                fontWeight={600}
                fill="rgba(255,255,255,0.92)"
              >
                {d.label}
              </text>
              <text
                x={nx}
                y={ny + labelDy}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={10.5}
                fontWeight={700}
                fill="#8ab4ff"
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
