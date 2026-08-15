import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverable?: boolean
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-border rounded-xl p-6 transition-all duration-200 shadow-[0_1px_3px_rgba(10,25,49,0.04)] ${
        hoverable ? 'hover:shadow-[0_8px_30px_rgba(10,25,49,0.08)] hover:border-blue-light' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
