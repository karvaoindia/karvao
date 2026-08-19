'use client'

import React, { useState, useCallback } from 'react'

interface GrowthWordProps {
  growthActive: boolean
  onToggle: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

export const GrowthWord: React.FC<GrowthWordProps> = ({
  growthActive,
  onToggle,
  onHoverStart,
  onHoverEnd,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onToggle()
      }
    },
    [onToggle]
  )

  return (
    <span
      role="button"
      tabIndex={0}
      aria-pressed={growthActive}
      aria-label="Toggle growth mode illumination"
      onClick={onToggle}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={() => {
        setIsFocused(true)
        onHoverStart()
      }}
      onBlur={() => {
        setIsFocused(false)
        onHoverEnd()
      }}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none align-baseline outline-none transition-transform duration-500 ease-out group px-2 py-1 ${
        growthActive ? 'is-active scale-[1.03]' : 'hover:scale-[1.015]'
      }`}
    >
      {/* Ambient low-opacity background glow */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-[-20%] inset-y-[-30%] rounded-full pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          growthActive
            ? 'opacity-100 scale-105 filter blur-2xl'
            : 'opacity-0 scale-90 filter blur-xl'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(83, 103, 232, 0.45) 0%, rgba(233, 154, 196, 0.4) 50%, rgba(250,250,248,0) 80%)',
        }}
      />

      {/* Main typography composition: gr + [toggle] + wth */}
      <span className="relative z-10 flex items-center gap-1.5 sm:gap-2.5 font-black tracking-tight text-[#0A0A0A]">
        <span>gr</span>

        {/* Interactive pill switch (replacing 'o') */}
        <span
          className={`relative inline-flex items-center w-14 sm:w-20 md:w-24 h-8 sm:h-11 md:h-13 rounded-full p-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-inner ${
            growthActive
              ? 'bg-[#1264FF] shadow-[0_0_20px_rgba(18,100,255,0.45)]'
              : 'bg-[#0A0A0A]/10 group-hover:bg-[#0A0A0A]/20'
          }`}
        >
          <span
            className={`w-6 sm:w-9 md:w-11 h-6 sm:h-9 md:h-11 rounded-full bg-white shadow-md transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
              growthActive
                ? 'translate-x-6 sm:translate-x-9 md:translate-x-11 scale-105'
                : 'translate-x-0 scale-100'
            }`}
          />
        </span>

        <span>wth</span>
      </span>

      {/* Keyboard focus ring */}
      {isFocused && (
        <span
          className="absolute -inset-2 rounded-2xl border-2 border-[#5367E8] pointer-events-none shadow-[0_0_15px_rgba(83,103,232,0.5)]"
          aria-hidden="true"
        />
      )}
    </span>
  )
}
