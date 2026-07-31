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
  sizeMode?: 'viewport' | 'parent' | 'document' // 改为枚举类型
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  autoSize = true,
  sizeMode = 'viewport', // 默认使用视口尺寸
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!autoSize) return

    const updateDimensions = () => {
      let newWidth = 0
      let newHeight = 0

      switch (sizeMode) {
        case 'viewport':
          // 使用视口尺寸
          newWidth = window.innerWidth
          newHeight = window.innerHeight
          break
        
        case 'parent':
          // 使用父容器尺寸
          if (svgRef.current) {
            const parent = svgRef.current.parentElement
            if (parent) {
              const rect = parent.getBoundingClientRect()
              newWidth = rect.width
              newHeight = rect.height
            }
          }
          break
        
        case 'document':
          // 使用文档尺寸（包括滚动区域）
          const docEl = document.documentElement
          const body = document.body
          
          newWidth = Math.max(
            docEl.scrollWidth,
            body.scrollWidth,
            docEl.offsetWidth,
            body.offsetWidth,
            docEl.clientWidth,
            window.innerWidth
          )
          
          newHeight = Math.max(
            docEl.scrollHeight,
            body.scrollHeight,
            docEl.offsetHeight,
            body.offsetHeight,
            docEl.clientHeight,
            window.innerHeight
          )
          break
      }

      setDimensions({
        width: newWidth,
        height: newHeight
      })
    }

    updateDimensions()

    // 根据不同的模式设置不同的监听器
    const events = ['resize']
    
    if (sizeMode === 'document') {
      // 文档模式需要监听更多事件
      events.push('scroll', 'load')
      
      // 监听 DOM 变化
      const observer = new MutationObserver(updateDimensions)
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      })
    }

    if (sizeMode === 'parent') {
      // 父容器模式使用 ResizeObserver
      const resizeObserver = new ResizeObserver(updateDimensions)
      if (svgRef.current?.parentElement) {
        resizeObserver.observe(svgRef.current.parentElement)
      }
    }

    // 添加事件监听
    events.forEach(event => {
      window.addEventListener(event, updateDimensions, { passive: true })
    })

    // 延迟更新确保准确
    const timeoutId = setTimeout(updateDimensions, 100)

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateDimensions)
      })
      
      if (sizeMode === 'document') {
        // 清理 MutationObserver
        const observers = performance.getEntriesByType("navigation")
        // 这里需要保存 observer 引用以便清理
      }
      
      clearTimeout(timeoutId)
    }
  }, [autoSize, sizeMode])

  // 计算实际的格子数量和SVG尺寸
  const actualHorizontal = autoSize 
    ? Math.max(1, Math.ceil(dimensions.width / width)) 
    : horizontal
    
  const actualVertical = autoSize 
    ? Math.max(1, Math.ceil(dimensions.height / height)) 
    : vertical

  const svgWidth = autoSize ? dimensions.width : width * actualHorizontal
  const svgHeight = autoSize ? dimensions.height : height * actualVertical

  // 如果 autoSize 开启但尺寸为0，显示占位符
  if (autoSize && (dimensions.width === 0 || dimensions.height === 0)) {
    return (
      <div 
        className={cn("tw-absolute tw-inset-0", className)}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    )
  }

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      className={cn(
        "tw-absolute tw-left-0 tw-top-0",
        className
      )}
      style={{
        width: '100%',
        height: '100%'
      }}
      {...props}
    >
      {Array.from({ length: actualHorizontal * actualVertical }).map((_, index) => {
        const x = (index % actualHorizontal) * width
        const y = Math.floor(index / actualHorizontal) * height
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
        )
      })}
    </svg>
  )
}