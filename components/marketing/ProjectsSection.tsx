import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { prisma } from '@/lib/prisma'

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
  const contentMap = Object.fromEntries(contentItems.map(item => [item.key, item.value]))
  return (
    <section className="py-20 md:py-24 bg-white border-t border-border">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
              PROJECTS
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-navy leading-tight">
              {contentMap['projects_headline'] || 'Projects that drive real results.'}
            </h2>
          </div>
          <Link href="/solutions" tabIndex={-1}>
            <Button variant="outline" size="sm">
              View All Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(10,25,49,0.08)] hover:border-blue-bright/20 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="w-full h-52 bg-blue-surface flex items-center justify-center overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#E8F2FB] to-[#F0F6FF] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
                    <svg className="w-12 h-12 text-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-blue-bright uppercase tracking-[0.12em]">
                  {project.category}
                </span>
                <h3 className="text-[15px] font-bold text-navy mt-1.5 mb-2 group-hover:text-blue-bright transition-colors leading-snug">
                  {project.name}
                </h3>
                <p className="text-[13px] text-[#475569] leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-navy group-hover:text-blue-bright transition-colors">
                    <span>View project</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
