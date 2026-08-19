'use client'

import React, { useRef, useCallback } from 'react'

export const ChallengeVisualCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const width = rect.width
    const height = rect.height

    // Calculate grid section (5 columns x 3 rows = 15 zones)
    const col = Math.min(Math.floor((x / width) * 5), 4) // 0..4
    const row = Math.min(Math.floor((y / height) * 3), 2) // 0..2

    const rotateXMap = [8, 0, -8]
    const rotateYMap = [-8, -4, 0, 4, 8]

    const rotateX = rotateXMap[row]
    const rotateY = rotateYMap[col]

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

    animFrameRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--rotate-x', `${rotateX}deg`)
        cardRef.current.style.setProperty('--rotate-y', `${rotateY}deg`)
        cardRef.current.style.setProperty('--translate-y', '-4px')
        cardRef.current.style.setProperty('--mouse-x', `${x.toFixed(0)}px`)
        cardRef.current.style.setProperty('--mouse-y', `${y.toFixed(0)}px`)
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (cardRef.current) {
      cardRef.current.style.setProperty('--rotate-x', '0deg')
      cardRef.current.style.setProperty('--rotate-y', '0deg')
      cardRef.current.style.setProperty('--translate-y', '0px')
      cardRef.current.style.setProperty('--mouse-x', '50%')
      cardRef.current.style.setProperty('--mouse-y', '50%')
    }
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-[520px] h-auto aspect-[520/340] flex items-center justify-between px-4 sm:px-8 bg-white border border-[#1264FF]/12 rounded-3xl py-6 sm:py-10 shadow-[0_12px_35px_rgba(11,18,32,0.06)] hover:shadow-[0_25px_55px_rgba(11,18,32,0.10)] hover:border-[#1264FF]/25 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-none overflow-hidden"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        transform:
          'perspective(1200px) translateY(var(--translate-y, 0px)) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
      }}
    >
      {/* Soft spotlight radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background:
            'radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(18, 100, 255, 0.08), transparent 75%)',
        }}
      />

      {/* 15-Zone Grid Overlay for CSS fallback mapping */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-5 grid-rows-3 z-30">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={`part-${i + 1}`} />
        ))}
      </div>

      {/* Left side: Tangled network with 3D depth */}
      <div
        className="relative w-[42%] aspect-square transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
      >
        {/* Google Icon */}
        <div className="absolute top-[24px] left-[10px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20 transition-transform duration-500 [transform:translateZ(25px)] group-hover:[transform:translateZ(38px)]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
        </div>

        {/* Facebook Icon */}
        <div className="absolute bottom-[24px] left-[10px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20 transition-transform duration-500 [transform:translateZ(25px)] group-hover:[transform:translateZ(38px)]">
          <svg className="w-4 h-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>

        {/* Instagram Icon */}
        <div className="absolute top-[2px] left-[78px] -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20 transition-transform duration-500 [transform:translateZ(25px)] group-hover:[transform:translateZ(38px)]">
          <svg className="w-4 h-4 text-[#E4405F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>

        {/* WhatsApp Icon */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[10px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20 transition-transform duration-500 [transform:translateZ(25px)] group-hover:[transform:translateZ(38px)]">
          <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.743 1.451 5.4 0 9.794-4.395 9.797-9.799.002-2.618-1.01-5.08-2.853-6.927C16.483 1.83 14.025.816 11.412.815 6.015.815 1.62 5.207 1.618 10.607c-.001 1.688.449 3.336 1.3 4.783L1.932 20.35l4.715-1.196z"/>
          </svg>
        </div>

        {/* Mail Icon */}
        <div className="absolute bottom-[6px] left-[110px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20 transition-transform duration-500 [transform:translateZ(25px)] group-hover:[transform:translateZ(38px)]">
          <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>

        <span className="absolute bottom-[20px] left-[78px] -translate-x-1/2 text-[#94A3B8] font-bold text-sm z-30 transition-transform duration-500 [transform:translateZ(20px)]">
          ?
        </span>

        {/* Tangled Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-transform duration-500 [transform:translateZ(15px)]" viewBox="0 0 180 180">
          <line x1="26" y1="40" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="26" y1="140" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="78" y1="18" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="154" y1="90" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="126" y1="158" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
          <path
            d="M 85 90 C 80 80, 100 80, 95 90 C 90 100, 80 95, 85 85 C 90 75, 105 85, 100 95 C 95 105, 80 100, 75 90 C 70 80, 90 70, 105 80 C 115 90, 100 110, 85 105 C 70 100, 75 80, 90 75 C 105 70, 110 95, 95 105 C 80 115, 65 90, 80 80"
            stroke="#94A3B8"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      {/* Middle Flow Arrow */}
      <div className="flex items-center justify-center text-[#CBD5E1] mx-1 sm:mx-2 transition-transform duration-500 [transform:translateZ(30px)] group-hover:[transform:translateZ(42px)]">
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Right side: Unified Karvao Box (Destination Card) */}
      <div
        className="w-[38%] flex flex-col items-center gap-2 sm:gap-3 transition-transform duration-500 [transform:translateZ(40px)] group-hover:[transform:translateZ(58px)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full py-5 sm:py-8 px-3 sm:px-4 bg-white border border-[#1264FF]/16 rounded-2xl flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(11,18,32,0.06)] group-hover:shadow-[0_12px_28px_rgba(18,100,255,0.12)] group-hover:border-[#1264FF]/30 transition-all duration-500">
          <span className="text-sm sm:text-base font-black text-[#0B1220] leading-none">KARVAO</span>
          <span className="text-[7px] sm:text-[8px] font-bold text-[#64748B] tracking-[0.2em] leading-none mt-0.5">INDIA</span>
          <div className="w-8 sm:w-10 h-0.5 bg-[#1264FF] rounded-full mt-3 sm:mt-4" />
        </div>
        <span className="text-[9px] sm:text-[10px] font-black text-[#1264FF] tracking-wide text-center uppercase block mt-1 leading-normal transition-transform duration-500 [transform:translateZ(45px)]">
          One System.<br />One Growth Engine.
        </span>
      </div>
    </div>
  )
}
