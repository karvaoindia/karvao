'use client'

import React from 'react'

interface FluidArtworkProps {
  growthActive: boolean
}

export const FluidArtwork: React.FC<FluidArtworkProps> = ({ growthActive }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. SOFT CENTRAL AMBIENT GLOW (Blends Blue & Pink softly in the middle behind typography) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] md:w-[580px] h-[320px] sm:h-[480px] md:h-[580px] rounded-full transition-all duration-1000 ease-out filter blur-[90px] sm:blur-[120px] ${
          growthActive
            ? 'opacity-70 scale-110'
            : 'opacity-40 scale-100'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(145, 135, 238, 0.25) 0%, rgba(200, 155, 220, 0.18) 40%, rgba(250, 250, 248, 0) 75%)',
        }}
      />

      {/* 2. ATMOSPHERIC BLUE DIFFUSION — Lower Left / Left Center */}
      <div
        className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          growthActive
            ? 'left-[10%] sm:left-[16%] bottom-[12%] sm:bottom-[16%] scale-110 opacity-80'
            : 'left-[4%] sm:left-[8%] bottom-[6%] sm:bottom-[10%] scale-100 opacity-60'
        }`}
        style={{
          width: 'clamp(280px, 36vw, 520px)',
          height: 'clamp(280px, 36vw, 520px)',
          animation: growthActive
            ? 'fluid-float-blue-active 10s ease-in-out infinite'
            : 'fluid-float-blue 16s ease-in-out infinite',
        }}
      >
        {/* Primary Blue Soft Diffused Radial Gradient */}
        <div
          className="w-full h-full rounded-full filter blur-[80px] sm:blur-[120px]"
          style={{
            background:
              'radial-gradient(circle at 40% 60%, rgba(83, 103, 232, 0.32) 0%, rgba(101, 117, 242, 0.22) 35%, rgba(141, 160, 248, 0.1) 60%, rgba(250, 250, 248, 0) 80%)',
          }}
        />

        {/* Secondary Inner Blue Core */}
        <div
          className="absolute inset-[15%] rounded-full filter blur-[60px] opacity-75"
          style={{
            background:
              'radial-gradient(circle, rgba(83, 103, 232, 0.28) 0%, rgba(101, 117, 242, 0) 70%)',
          }}
        />
      </div>

      {/* 3. ATMOSPHERIC PINK DIFFUSION — Upper Right / Right Center */}
      <div
        className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          growthActive
            ? 'right-[10%] sm:right-[16%] top-[10%] sm:top-[14%] scale-110 opacity-80'
            : 'right-[4%] sm:right-[8%] top-[6%] sm:top-[10%] scale-100 opacity-60'
        }`}
        style={{
          width: 'clamp(280px, 36vw, 500px)',
          height: 'clamp(280px, 36vw, 500px)',
          animation: growthActive
            ? 'fluid-float-pink-active 10s ease-in-out infinite'
            : 'fluid-float-pink 18s ease-in-out infinite',
        }}
      >
        {/* Primary Pink Soft Diffused Radial Gradient */}
        <div
          className="w-full h-full rounded-full filter blur-[80px] sm:blur-[120px]"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(233, 154, 196, 0.32) 0%, rgba(240, 168, 207, 0.22) 35%, rgba(248, 194, 220, 0.1) 60%, rgba(250, 250, 248, 0) 80%)',
          }}
        />

        {/* Secondary Inner Pink Core */}
        <div
          className="absolute inset-[15%] rounded-full filter blur-[60px] opacity-75"
          style={{
            background:
              'radial-gradient(circle, rgba(233, 154, 196, 0.28) 0%, rgba(240, 168, 207, 0) 70%)',
          }}
        />
      </div>

      {/* 4. FLOATING DIFFUSED ACCENTS (Extremely subtle liquid drift particles) */}
      <div
        className={`absolute top-[35%] left-[22%] w-44 h-44 rounded-full filter blur-[70px] transition-all duration-1000 ${
          growthActive ? 'opacity-65 scale-125 translate-x-8' : 'opacity-35 scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(83, 103, 232, 0.22) 0%, rgba(250, 250, 248, 0) 70%)',
          animation: 'fluid-float-blue 14s ease-in-out infinite reverse',
        }}
      />
      <div
        className={`absolute bottom-[30%] right-[24%] w-48 h-48 rounded-full filter blur-[70px] transition-all duration-1000 ${
          growthActive ? 'opacity-65 scale-125 -translate-x-8' : 'opacity-35 scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(233, 154, 196, 0.22) 0%, rgba(250, 250, 248, 0) 70%)',
          animation: 'fluid-float-pink 16s ease-in-out infinite reverse',
        }}
      />
    </div>
  )
}
