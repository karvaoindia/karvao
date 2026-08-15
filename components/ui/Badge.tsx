import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'danger'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full'
  
  const variants = {
    primary: 'bg-[#F0F6FF] text-blue-bright border border-[#CCE0FF]',
    secondary: 'bg-navy text-white',
    neutral: 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]',
    success: 'bg-[#ECFDF5] text-green border border-[#D1FAE5]',
    warning: 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]',
    danger: 'bg-[#FEF2F2] text-red border border-[#FECACA]',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
