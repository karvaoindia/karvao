'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

interface IndustryItem {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'auto-dealers',
    name: 'Auto Dealers',
    description: 'Automate lead capture, test drive bookings, and WhatsApp follow-up flows for showrooms.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M5 17h14v-4H5v4zm0 0a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM6 9l2-4h8l2 4H6z"
      />
    ),
  },
  {
    id: 'clinics-healthcare',
    name: 'Clinics & Healthcare',
    description: 'High-converting patient booking engines, automated CRM reminders, and reputation management.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3zm2 6h4m-2-2v4"
      />
    ),
  },
  {
    id: 'restaurants-food',
    name: 'Restaurants & Food',
    description: 'Direct online ordering, loyalty campaign automation, and hyper-local performance marketing.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M12 2v20M18 8v14M18 4a3 3 0 00-3 3v5a3 3 0 006 0V7a3 3 0 00-3-3zM6 3v8a3 3 0 003 3h0a3 3 0 003-3V3M9 3v8"
      />
    ),
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'End-to-end lead qualification, automated site-visit booking, and high-ROI ad channels.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
  },
  {
    id: 'retail-d2c',
    name: 'Retail & D2C',
    description: 'Shopify store optimization, Meta & Google ROAS scaling, and customer LTV retention.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    ),
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Full-funnel student enrollment campaigns, CRM automation, and counselor tracking.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
    ),
  },
]

interface IndustriesSectionProps {
  headline?: string
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  headline = 'Built for Indian industries that move fast.',
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % INDUSTRIES_DATA.length)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + INDUSTRIES_DATA.length) % INDUSTRIES_DATA.length)
  }, [])

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const timer = setInterval(() => {
      handleNext()
    }, 4500)

    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  const isFirstRender = useRef(true)

  // Scroll active card horizontally within container only (never scroll main window)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const container = scrollContainerRef.current
    if (!container) return

    const activeCard = (container.children[activeIndex] || container.children[activeIndex + 1]) as HTMLElement
    if (activeCard) {
      const cardLeft = activeCard.offsetLeft
      const cardWidth = activeCard.offsetWidth
      const containerWidth = container.offsetWidth
      container.scrollTo({
        left: cardLeft - containerWidth / 2 + cardWidth / 2,
        behavior: 'smooth',
      })
    }
  }, [activeIndex])

  const activeIndustry = INDUSTRIES_DATA[activeIndex]

  return (
    <section
      className="py-16 md:py-24 bg-[#FAFBFF] border-t border-border relative overflow-hidden select-none"
      id="industries"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle radial atmospheric glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full opacity-60 blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(18, 100, 255, 0.045), transparent 60%)',
        }}
      />

      <div className="page-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-xs font-black tracking-[0.25em] text-[#1264FF] uppercase block mb-3">
            INDUSTRIES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold tracking-tight text-[#0B1220] leading-tight">
            {headline}
          </h2>
        </div>

        {/* Industry Selector Grid / Carousel Container */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          {/* Glass Prev Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Industry"
            className="group w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1264FF]/15 flex items-center justify-center text-[#475569] shadow-[0_4px_16px_rgba(11,18,32,0.05)] hover:border-[#1264FF]/40 hover:text-[#1264FF] hover:shadow-[0_8px_20px_rgba(18,100,255,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1264FF]"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 sm:gap-4 overflow-x-auto py-4 px-2 scrollbar-hide max-w-full [perspective:1000px]"
          >
            {INDUSTRIES_DATA.map((ind, idx) => {
              const isActive = idx === activeIndex

              return (
                <div
                  key={ind.id}
                  onClick={() => setActiveIndex(idx)}
                  role="button"
                  tabIndex={0}
                  aria-selected={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveIndex(idx)
                    }
                  }}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex-shrink-0 w-[145px] sm:w-[165px] h-[125px] sm:h-[135px] outline-none ${
                    isActive
                      ? 'bg-[#EAF2FF]/85 border-2 border-[#1264FF] shadow-[0_12px_28px_rgba(18,100,255,0.14)] -translate-y-1.5 scale-[1.03]'
                      : 'bg-white/75 backdrop-blur-md border border-[#1264FF]/12 shadow-[0_6px_20px_rgba(11,18,32,0.04)] hover:bg-white hover:border-[#1264FF]/30 hover:-translate-y-1 hover:scale-[1.02] hover:[transform:perspective(1000px)_rotateX(3deg)_rotateY(-3deg)]'
                  }`}
                >
                  {/* Glass Icon Box */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-2.5 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#1264FF] text-white shadow-[0_6px_16px_rgba(18,100,255,0.3)] scale-[1.05]'
                        : 'bg-white/80 border border-[#1264FF]/15 text-[#1264FF] group-hover:scale-[1.06] group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_12px_rgba(18,100,255,0.12)]'
                    }`}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {ind.icon}
                    </svg>
                  </div>

                  {/* Industry Label */}
                  <span
                    className={`text-xs sm:text-[13px] font-extrabold tracking-tight text-center leading-snug transition-colors duration-300 ${
                      isActive ? 'text-[#0B1220]' : 'text-[#475569] group-hover:text-[#0B1220]'
                    }`}
                  >
                    {ind.name}
                  </span>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute -bottom-1.5 w-8 h-1 bg-[#1264FF] rounded-full shadow-[0_2px_8px_rgba(18,100,255,0.4)] animate-fade-in" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Glass Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Industry"
            className="group w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1264FF]/15 flex items-center justify-center text-[#475569] shadow-[0_4px_16px_rgba(11,18,32,0.05)] hover:border-[#1264FF]/40 hover:text-[#1264FF] hover:shadow-[0_8px_20px_rgba(18,100,255,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1264FF]"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Active Industry Counter & Dot Indicators */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-black text-[#0B1220] tracking-wider">
              0{activeIndex + 1} <span className="text-[#94A3B8] font-normal">/ 0{INDUSTRIES_DATA.length}</span>
            </span>

            <div className="flex items-center gap-1.5 ml-2">
              {INDUSTRIES_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to industry ${i + 1}`}
                  className={`block rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-5 h-1.5 bg-[#1264FF] shadow-[0_2px_6px_rgba(18,100,255,0.3)]'
                      : 'w-1.5 h-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Contextual Description Banner */}
          <div className="min-h-[48px] max-w-lg mx-auto text-center px-4 transition-all duration-300">
            <p key={activeIndustry.id} className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed animate-fade-in">
              &ldquo;{activeIndustry.description}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
