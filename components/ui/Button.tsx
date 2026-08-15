import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue-bright text-white hover:bg-primary-hover active:bg-[#0047B3] border border-blue-bright shadow-sm',
    secondary: 'bg-navy text-white hover:bg-navy-light active:bg-[#0D2B4D] border border-navy',
    outline: 'bg-transparent text-navy hover:bg-blue-surface active:bg-[#E8F2FB] border border-border',
    text: 'bg-transparent text-navy hover:text-blue-bright hover:underline px-0 py-0',
  }

  const sizes = {
    sm: 'text-xs px-5 py-2.5 font-semibold',
    md: 'text-sm px-6 py-3 font-semibold',
    lg: 'text-base px-8 py-3.5 font-semibold',
  }

  const paddingStyle = variant === 'text' ? '' : sizes[size]

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${paddingStyle} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
