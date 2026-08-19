'use client'

import React, { useRef, useCallback } from 'react'

interface SolutionItem {
  id: string
  label: string
  icon: React.ReactNode
  bullets: string[]
}

const Glass3DCard: React.FC<{ item: SolutionItem }> = ({ item }) => {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const animFrameRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate subtle tilt angle (max 6deg)
    const rotateX = -((y - centerY) / centerY) * 6
    const rotateY = ((x - centerX) / centerX) * 6

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
    }

    animFrameRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`)
        cardRef.current.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`)
        cardRef.current.style.setProperty('--mouse-x', `${x.toFixed(0)}px`)
        cardRef.current.style.setProperty('--mouse-y', `${y.toFixed(0)}px`)
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
    }
    if (cardRef.current) {
      cardRef.current.style.setProperty('--rotate-x', '0deg')
      cardRef.current.style.setProperty('--rotate-y', '0deg')
      cardRef.current.style.setProperty('--mouse-x', '50%')
      cardRef.current.style.setProperty('--mouse-y', '50%')
    }
  }, [])

  return (
    <a
      ref={cardRef}
      href={`/solutions#${item.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-[32px] p-6 text-center select-none outline-none focus-visible:ring-2 focus-visible:ring-[#1264FF] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] h-[350px] sm:h-[360px] w-full overflow-hidden"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform:
          'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 246, 255, 0.80) 100%)',
        border: '1px solid rgba(18, 100, 255, 0.14)',
        boxShadow:
          '0 10px 30px rgba(11, 18, 32, 0.04), 0 2px 10px rgba(18, 100, 255, 0.03)',
      }}
    >
      {/* 1. GLASS INNER PANEL */}
      <div
        className="pointer-events-none absolute inset-[7px] rounded-[25px] transition-all duration-500 border border-white/90"
        style={{
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* 2. HOVER SPOTLIGHT RADIAL HIGHLIGHT */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(18, 100, 255, 0.09), transparent 80%)',
        }}
      />

      {/* 3. DECORATIVE LAYERED GLASS CIRCLES (Uiverse 3D Depth Characteristic) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="absolute -top-10 -right-10 w-36 h-36 rounded-full border border-white/40 filter blur-[2px] transition-transform duration-700 ease-out"
          style={{
            background: 'rgba(18, 100, 255, 0.05)',
            transform: 'translate3d(0, 0, 20px)',
          }}
        />
        <div
          className="absolute -top-5 -right-5 w-26 h-26 rounded-full border border-white/50 filter blur-[1px] transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            background: 'rgba(18, 100, 255, 0.07)',
            transform: 'translate3d(0, 0, 40px)',
          }}
        />
        <div
          className="absolute top-1 right-1 w-18 h-18 rounded-full border border-white/60 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:-translate-y-2"
          style={{
            background: 'rgba(18, 100, 255, 0.09)',
            transform: 'translate3d(0, 0, 60px)',
          }}
        />
        <div
          className="absolute top-4 right-4 w-11 h-11 rounded-full backdrop-blur-md border border-white/80 transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:-translate-y-3"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            transform: 'translate3d(0, 0, 80px)',
          }}
        />
        <div
          className="absolute top-7 right-7 w-5 h-5 rounded-full transition-transform duration-700 ease-out group-hover:translate-x-4 group-hover:-translate-y-4"
          style={{
            background: 'rgba(18, 100, 255, 0.22)',
            transform: 'translate3d(0, 0, 100px)',
          }}
        />
      </div>

      {/* 4. BALANCED CENTERED CONTENT COMPOSITION */}
      <div
        className="relative z-10 flex flex-col items-center justify-between h-full w-full my-auto"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top: Icon + Title */}
        <div className="flex flex-col items-center w-full pt-1" style={{ transformStyle: 'preserve-3d' }}>
          {/* Glass Icon Container */}
          <div
            className="w-[58px] h-[58px] rounded-[18px] flex items-center justify-center mb-3.5 border border-[#1264FF]/16 transition-all duration-500 shadow-[0_8px_24px_rgba(18,100,255,0.08)] group-hover:border-[#1264FF]/30 group-hover:shadow-[0_12px_28px_rgba(18,100,255,0.16)]"
            style={{
              background: 'rgba(234, 242, 255, 0.88)',
              color: '#1264FF',
              transform: 'translate3d(0, 0, 35px)',
            }}
          >
            {item.icon}
          </div>

          {/* Card Title */}
          <h3
            className="text-xl font-extrabold text-[#0B1220] tracking-wide uppercase mb-3 transition-transform duration-500"
            style={{ transform: 'translate3d(0, 0, 30px)' }}
          >
            {item.label}
          </h3>
        </div>

        {/* Middle: Editorial Service List */}
        <ul
          className="flex flex-col items-center justify-center gap-1.5 text-[14px] text-[#334155] font-medium leading-normal w-full my-auto transition-transform duration-500"
          style={{ transform: 'translate3d(0, 0, 25px)' }}
        >
          {item.bullets.map((bullet, idx) => (
            <li key={idx} className="tracking-tight text-center">
              {bullet}
            </li>
          ))}
        </ul>

        {/* Bottom: Explore CTA */}
        <div
          className="inline-flex items-center justify-center gap-1.5 text-[14px] font-bold text-[#1264FF] pb-1 transition-transform duration-500"
          style={{ transform: 'translate3d(0, 0, 20px)' }}
        >
          <span>Explore</span>
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </div>
    </a>
  )
}

export const SolutionsSection: React.FC = () => {
  const solutions: SolutionItem[] = [
    {
      id: 'build',
      label: 'BUILD',
      icon: (
        <svg className="w-6 h-6 text-[#1264FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      bullets: ['Website Development', 'E-commerce', 'Shopify', 'Branding'],
    },
    {
      id: 'grow',
      label: 'GROW',
      icon: (
        <svg className="w-6 h-6 text-[#1264FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      bullets: ['SEO', 'Social Media', 'Meta Ads', 'Google Ads'],
    },
    {
      id: 'convert',
      label: 'CONVERT',
      icon: (
        <svg className="w-6 h-6 text-[#1264FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      bullets: ['CRM', 'Lead Management', 'Conversion Systems', 'Sales Enablement'],
    },
    {
      id: 'automate',
      label: 'AUTOMATE',
      icon: (
        <svg className="w-6 h-6 text-[#1264FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      bullets: ['WhatsApp Automation', 'Workflow Automation', 'Integrations', 'Chatbots'],
    },
    {
      id: 'measure',
      label: 'MEASURE',
      icon: (
        <svg className="w-6 h-6 text-[#1264FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
          />
        </svg>
      ),
      bullets: ['Analytics', 'Tracking', 'Reporting', 'Dashboards'],
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFF] border-t border-border" id="solutions">
      <div className="page-container">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-black tracking-widest text-[#1264FF] uppercase block mb-3">
            SOLUTIONS
          </span>
          <h2 className="text-[24px] sm:text-3xl md:text-[40px] font-extrabold tracking-tight text-[#0B1220] leading-tight">
            Everything your business needs to move forward.
          </h2>
        </div>

        {/* 5 Cards Grid — 1 row desktop, 2-3 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6 items-stretch">
          {solutions.map((item) => (
            <Glass3DCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
