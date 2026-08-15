import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((currentStep / totalSteps) * 100)))

  return (
    <div className={`w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-blue-bright h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
