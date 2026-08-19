'use client'

import React from 'react'

interface SparklesProps {
  growthActive: boolean
}

interface SparkleItem {
  id: number
  top: string
  left: string
  size: number
  delay: string
  duration: string
}

const SPARKLE_DATA: SparkleItem[] = [
  { id: 1, top: '22%', left: '20%', size: 14, delay: '0s', duration: '3.5s' },
  { id: 2, top: '18%', left: '76%', size: 18, delay: '0.8s', duration: '4.2s' },
  { id: 3, top: '48%', left: '15%', size: 12, delay: '1.4s', duration: '3.8s' },
  { id: 4, top: '44%', left: '82%', size: 16, delay: '0.4s', duration: '4.5s' },
  { id: 5, top: '65%', left: '26%', size: 10, delay: '1.8s', duration: '3.2s' },
  { id: 6, top: '62%', left: '72%', size: 14, delay: '1.1s', duration: '4.0s' },
]

export const Sparkles: React.FC<SparklesProps> = ({ growthActive }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {SPARKLE_DATA.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute transition-all duration-700 ease-out"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: growthActive ? 0.95 : 0.45,
            transform: growthActive ? 'scale(1.25)' : 'scale(1)',
            filter: growthActive ? 'drop-shadow(0 0 6px rgba(83, 103, 232, 0.8))' : 'none',
            animation: `sparkle-float ${sparkle.duration} ease-in-out infinite alternate ${sparkle.delay}`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full"
            style={{
              color: sparkle.id % 2 === 0 ? '#5367E8' : '#E99AC4',
            }}
          >
            <path
              d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
