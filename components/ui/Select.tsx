import React, { forwardRef } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
  helperText?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${selectId}-error` : undefined
    const helperId = helperText ? `${selectId}-helper` : undefined

    return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
        <label htmlFor={selectId} className="text-sm font-semibold text-navy">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={errorId || helperId}
          className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-blue-bright focus:ring-2 focus:ring-[#E6F0FF] ${
            error ? 'border-red focus:border-red focus:ring-red/10' : 'border-border'
          }`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select'
