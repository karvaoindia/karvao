import React from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ProjectCard } from '@/components/ui/ProjectCard'

export const ProjectsSection: React.FC = async () => {
  const [projects, contentItems] = await Promise.all([
    prisma.project.findMany({
      orderBy: { sortOrder: 'asc' },
      take: 4,
    }),
    prisma.siteContent.findMany({
      where: { section: 'projects' },
      select: { key: true, value: true },
    }),
  ])

  const contentMap = Object.fromEntries(
    contentItems.map((item) => [item.key, item.value])
  )

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFF] border-t border-border" id="projects">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8 mb-10 md:mb-14">
          <div>
            <span className="text-xs font-black tracking-widest text-[#1264FF] uppercase block mb-3">
              PROJECTS
            </span>
            <h2 className="text-[24px] sm:text-3xl md:text-[40px] font-extrabold tracking-tight text-[#0B1220] leading-tight">
              {contentMap['projects_headline'] || 'Results that speak louder than promises.'}
            </h2>
          </div>

          <Link href="/work">
            <span className="group inline-flex items-center justify-center gap-2 bg-[#0B1220] hover:bg-[#1A263B] text-white font-bold text-xs sm:text-sm h-11 px-6 rounded-full shadow-md transition-all duration-300 active:scale-[0.98]">
              <span>View All Projects</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </Link>
        </div>

        {/* 4 Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
