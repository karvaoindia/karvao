'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { FluidArtwork } from './FluidArtwork'
import { GrowthWord } from './GrowthWord'
import { Sparkles } from './Sparkles'

export const HeroSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const userInteractedRef = useRef(false)

  const handleToggle = useCallback(() => {
    userInteractedRef.current = true
    setIsLocked((prev) => !prev)
  }, [])

  useEffect(() => {
    setIsMounted(true)

    // Automatically trigger growth toggle after 2.5s unless user manually interacted
    const timer = setTimeout(() => {
      if (!userInteractedRef.current) {
        setIsLocked(true)
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const growthActive = isHovered || isLocked

  const handleHoverStart = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <section
      aria-label="Karvao Hero Section"
      className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col justify-between items-center bg-[#FAFAF8] overflow-hidden select-none pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6"
    >
      {/* 5 & 6. FLUID VISUAL ARTWORK SYSTEM */}
      <FluidArtwork growthActive={growthActive} />

      {/* 10. SPARKLES */}
      <Sparkles growthActive={growthActive} />

      {/* CENTER HERO CONTENT COMPOSITION */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto px-2">
        {/* Step 3: EYEBROW */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMounted
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[10px]'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <span className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.28em] text-[#5367E8] uppercase block mb-6 sm:mb-8">
            PAID GROWTH PARTNER
          </span>
        </div>

        {/* HEADLINE: We build / growth / systems */}
        <h1
          className="w-full flex flex-col items-center justify-center font-black tracking-tight text-[#0A0A0A] leading-[0.88] sm:leading-[0.9] md:leading-[0.92] uppercase"
          style={{
            fontSize: 'clamp(36px, 10vw, 120px)',
          }}
        >
          {/* Step 4: "We build" */}
          <span
            className={`block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[16px]'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            We build
          </span>

          {/* Step 5: "growth" (Interactive Focal Point) */}
          <div
            className={`my-1 sm:my-2 md:my-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMounted
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <GrowthWord
              growthActive={growthActive}
              onToggle={handleToggle}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          </div>

          {/* Step 6: "systems" */}
          <span
            className={`block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[16px]'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            systems
          </span>
        </h1>

        {/* Step 7: SUPPORTING CAPABILITIES TEXT */}
        <p
          className={`text-xs sm:text-sm md:text-base font-semibold text-[#475569] tracking-wide mt-7 sm:mt-9 md:mt-11 mb-8 sm:mb-10 max-w-2xl leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMounted
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[16px]'
          }`}
          style={{ transitionDelay: '750ms' }}
        >
          Websites • Automation • CRM • Ads • Social Media • AI
        </p>

        {/* Step 8: CTA BUTTONS (Section 1 & 12) */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMounted
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[16px]'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {/* Primary CTA: Get a Quotation */}
          <Link
            href="/quotation"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white font-semibold text-sm sm:text-base h-[54px] sm:h-[58px] px-8 rounded-full shadow-[0_4px_20px_rgba(10,10,10,0.15)] hover:shadow-[0_8px_30px_rgba(10,10,10,0.25)] hover:scale-[1.025] transition-all duration-300 active:scale-[0.98]"
          >
            <span>Get a Quotation</span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>

          {/* Secondary CTA: Check Your Business Score */}
          <Link
            href="/business-score"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 bg-white/80 hover:bg-white border border-[#0A0A0A]/15 hover:border-[#0A0A0A]/35 text-[#0A0A0A] font-semibold text-sm sm:text-base h-[54px] sm:h-[58px] px-8 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:scale-[1.025] transition-all duration-300 active:scale-[0.98]"
          >
            <span>Check Your Business Score</span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 text-[#5367E8]">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
