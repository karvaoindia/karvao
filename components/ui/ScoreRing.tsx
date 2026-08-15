import React from 'react'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  className?: string
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getStrokeColor = (val: number) => {
    if (val < 40) return '#EF4444'
    if (val < 60) return '#F59E0B'
    if (val < 75) return '#0066FF'
    return '#16B878'
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getStrokeColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div className="absolute text-center flex flex-col justify-center items-center">
        <span className="text-3xl font-extrabold text-navy tracking-tight leading-none">{score}</span>
        <span className="text-[10px] font-semibold text-grey uppercase tracking-widest mt-0.5">/ 100</span>
      </div>
    </div>
  )
}
