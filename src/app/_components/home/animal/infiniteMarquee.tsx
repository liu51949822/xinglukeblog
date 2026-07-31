"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/app/_components/shadcn/utils"

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number]
  className?: string
  squaresClassName?: string
  autoSize?: boolean
  useViewport?: boolean // 新增：是否使用视口尺寸
}

// InteractiveGridPattern.tsx
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  autoSize = false, // 强制关闭！
  useViewport = true,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  // 因为 autoSize=false，所以使用传入的 squares 数量
  const actualHorizontal = horizontal;
  const actualVertical = vertical;

  // SVG 尺寸交给 CSS 控制
  return (
    <svg
      width="100%"
      height="100%"
      className={cn(
        "tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full tw-pointer-events-none",
        className
      )}
      style={{ minWidth: width * horizontal, minHeight: height * vertical }}
      {...props}
    >
      {Array.from({ length: actualHorizontal * actualVertical }).map((_, index) => {
        const x = (index % actualHorizontal) * width;
        const y = Math.floor(index / actualHorizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "tw-stroke-gray-400/30 tw-transition-all tw-duration-100 tw-ease-in-out [&:not(:hover)]:tw-duration-1000",
              hoveredSquare === index ? "tw-fill-gray-300/30" : "tw-fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}