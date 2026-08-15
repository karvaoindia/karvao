import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined

    return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
        <label htmlFor={inputId} className="text-sm font-semibold text-navy">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={errorId || helperId}
          className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-blue-bright focus:ring-2 focus:ring-[#E6F0FF] ${
            error ? 'border-red focus:border-red focus:ring-red/10' : 'border-border'
          }`}
          {...props}
        />
        {error && (
          <span id={errorId} className="text-xs text-red font-medium" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperId} className="text-xs text-grey">
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
