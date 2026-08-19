'use client'

import React, { useState, useMemo } from 'react'
import { ProjectCard, ProjectData } from '@/components/ui/ProjectCard'

const CATEGORIES = ['All', 'Build', 'Grow', 'Convert', 'Automate', 'Measure']

export const WorkGrid: React.FC<{ initialProjects: ProjectData[] }> = ({
  initialProjects,
}) => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return initialProjects
    return initialProjects.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [initialProjects, activeCategory])

  return (
    <div className="space-y-10">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                isActive
                  ? 'bg-[#1264FF] text-white shadow-md shadow-[#1264FF]/20 scale-[1.03]'
                  : 'bg-white text-[#475569] hover:text-[#0B1220] hover:bg-[#EAF2FF]/60 border border-border'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-border rounded-3xl p-8">
          <p className="text-[#0B1220] font-bold text-lg mb-2">No projects found in this category.</p>
          <button
            onClick={() => setActiveCategory('All')}
            className="text-xs font-bold text-[#1264FF] hover:underline"
          >
            Reset filter to view all projects
          </button>
        </div>
      )}
    </div>
  )
}
