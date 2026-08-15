import React, { forwardRef } from 'react'

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  error?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, error, className = '', id, ...props }, ref) => {
    const radioId = id || `radio-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${radioId}-error` : undefined

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label
          htmlFor={radioId}
          className="relative flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-surface has-[:checked]:border-blue-bright has-[:checked]:bg-[#F0F6FF] border-border"
        >
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="radio"
              id={radioId}
              aria-invalid={!!error}
              aria-describedby={errorId}
              className="h-4 w-4 border-border text-blue-bright focus:ring-blue-bright cursor-pointer"
              {...props}
            />
          </div>
          <div className="text-sm">
            <span className="font-semibold text-navy block">{label}</span>
            {description && (
              <span className="text-xs text-grey mt-0.5 block">{description}</span>
            )}
          </div>
        </label>
        {error && (
          <span id={errorId} className="text-xs text-red font-medium px-1" role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
