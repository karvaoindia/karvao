'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'

export interface ProjectData {
  id: string
  name: string
  category: string
  description: string
  imageUrl?: string | null
  url?: string | null
  featured?: boolean
}

interface ProjectCardProps {
  project: ProjectData
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    // If user clicks a link inside card, don't flip
    if ((e.target as HTMLElement).closest('a')) return
    setIsFlipped((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // If active element is link, don't flip
      if ((e.target as HTMLElement).tagName === 'A') return
      e.preventDefault()
      setIsFlipped((prev) => !prev)
    }
  }, [])

  // Extract key metric from description if available
  const extractMetric = (desc: string): string | null => {
    const match = desc.match(/(\d+(\.\d+)?(x|×|%|\+|\sMQLs|\sROAS)[^.\n]*)/i)
    return match ? match[1].trim() : null
  }

  const metric = extractMetric(project.description)
  const detailUrl = `/work/${project.id}`

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`Project card for ${project.name}. Press enter or tap to flip.`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="group relative w-full h-[420px] sm:h-[440px] rounded-[28px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#1264FF] [perspective:1200px]"
    >
      {/* 3D Flip Outer Body */}
      <div
        className={`relative w-full h-full rounded-[28px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] shadow-[0_10px_30px_rgba(11,18,32,0.06)] group-hover:shadow-[0_20px_45px_rgba(11,18,32,0.12)] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ==================== FRONT SIDE ==================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden bg-[#0B1220] border border-white/10 [backface-visibility:hidden] flex flex-col justify-between"
          style={{ WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Project Image / Visual Background */}
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.name || 'Karvao India Client Project'}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0B1220] via-[#122240] to-[#1264FF]/30 flex flex-col items-center justify-center p-6 relative overflow-hidden">
              {/* Subtle background graphic */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#1264FF]/10 blur-2xl pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#1264FF] mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-widest text-[#1264FF] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                {project.category}
              </span>
            </div>
          )}

          {/* Front Bottom Glass Banner */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0B1220]/90 via-[#0B1220]/60 to-transparent backdrop-blur-[2px] flex items-end justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-[#1264FF] uppercase tracking-[0.18em] block mb-1">
                {project.category}
              </span>
              <h3 className="text-xl font-black text-white tracking-tight drop-shadow-sm">
                {project.name}
              </h3>
            </div>

            {/* Interaction Hint Badge */}
            <span className="text-[10px] font-bold text-white/70 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full px-2.5 py-1 backdrop-blur-md flex items-center gap-1 transition-colors">
              <span>Details</span>
              <span className="text-xs">⟲</span>
            </span>
          </div>
        </div>

        {/* ==================== BACK SIDE ==================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[28px] p-7 flex flex-col items-center justify-between text-center border border-[rgba(18,100,255,0.18)] bg-[rgba(255,255,255,0.96)] backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_12px_35px_rgba(11,18,32,0.07)] overflow-hidden"
          style={{ WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Soft background glow */}
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#1264FF]/5 blur-3xl pointer-events-none" />

          {/* Top: Category */}
          <div className="w-full pt-1">
            <span className="text-[11px] font-extrabold text-[#1264FF] uppercase tracking-[0.2em] block">
              {project.category}
            </span>
          </div>

          {/* Center: Title + Metric + Description */}
          <div className="flex flex-col items-center my-auto max-w-[260px]">
            <h3 className="text-2xl font-black text-[#0B1220] tracking-tight mb-3 leading-snug">
              {project.name}
            </h3>

            {/* Metric pill if present */}
            {metric && (
              <span className="inline-flex items-center text-xs font-black text-[#1264FF] bg-[#1264FF]/10 border border-[#1264FF]/20 px-3 py-1 rounded-full mb-3">
                {metric}
              </span>
            )}

            <p className="text-[14px] text-[#475569] leading-relaxed line-clamp-4 font-medium">
              {project.description}
            </p>
          </div>

          {/* Bottom: View Project CTA */}
          <div className="w-full pb-1">
            <Link
              href={detailUrl}
              onClick={(e) => e.stopPropagation()}
              className="group/btn inline-flex items-center justify-center gap-2 text-sm font-extrabold text-[#1264FF] hover:text-[#0B1220] transition-colors py-2 px-4 rounded-full bg-[#1264FF]/10 hover:bg-[#1264FF]/15 border border-[#1264FF]/20"
            >
              <span>View Project</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
