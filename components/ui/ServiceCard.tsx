'use client'

import React from 'react'
import Link from 'next/link'

export interface ServiceData {
  id: string
  title: string
  category: 'BUILD' | 'GROW' | 'CONVERT' | 'AUTOMATE' | 'MEASURE'
  description: string
  icon: React.ReactNode
  tags?: string[]
}

interface ServiceCardProps {
  service: ServiceData
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`Service: ${service.title}`}
      className="group relative w-full h-[320px] sm:h-[340px] rounded-[24px] bg-white/72 backdrop-blur-md border border-white/80 hover:border-[#1264FF]/30 p-6 flex flex-col items-center justify-between text-center shadow-[0_10px_35px_rgba(11,18,32,0.06)] hover:shadow-[0_20px_45px_rgba(18,100,255,0.12)] hover:-translate-y-2 hover:scale-[1.015] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-2 focus-visible:ring-[#1264FF] overflow-hidden select-none"
    >
      {/* Soft background blue-purple glow effect */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#1264FF]/5 group-hover:bg-[#1264FF]/10 blur-2xl transition-all duration-500" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#BFA7FF]/10 group-hover:bg-[#BFA7FF]/15 blur-2xl transition-all duration-500" />

      {/* Category Eyebrow */}
      <div className="w-full flex items-center justify-between z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1264FF] bg-[#1264FF]/10 border border-[#1264FF]/15 px-2.5 py-0.5 rounded-full">
          {service.category}
        </span>
      </div>

      {/* Center Circular Glass Icon Area (Uiverse-inspired composition, Karvao branded) */}
      <div className="relative my-auto flex items-center justify-center z-10">
        {/* Layered purple depth circle behind */}
        <div className="absolute w-[124px] h-[124px] rounded-full bg-[#BFA7FF]/15 blur-sm group-hover:scale-110 transition-transform duration-500" />

        {/* Main circular glass container */}
        <div className="relative w-[112px] h-[112px] rounded-full bg-white/80 backdrop-blur-xl border border-[#1264FF]/20 flex items-center justify-center shadow-[0_10px_30px_rgba(18,100,255,0.09)] group-hover:scale-105 group-hover:border-[#1264FF]/40 group-hover:shadow-[0_14px_35px_rgba(18,100,255,0.18)] transition-all duration-500">
          <div className="w-12 h-12 text-[#1264FF] group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300">
            {service.icon}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col items-center z-10 w-full max-w-[230px]">
        <h3 className="text-lg font-black text-[#0B1220] tracking-tight mb-1.5 leading-snug group-hover:text-[#1264FF] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-xs text-[#475569] leading-relaxed line-clamp-2 font-medium mb-3">
          {service.description}
        </p>

        {/* Explore CTA */}
        <Link
          href="/quotation"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1264FF] hover:text-[#0B1220] transition-colors py-1 px-3 rounded-full bg-[#1264FF]/8 hover:bg-[#1264FF]/15 border border-[#1264FF]/15"
        >
          <span>Explore</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  )
}
