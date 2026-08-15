import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'

interface Project {
  id: string
  name: string
  category: string
  description: string
  image: string
}

const projects: Project[] = [
  {
    id: '1',
    name: 'AutoVerse Digital Platform',
    category: 'Auto Dealers',
    description: 'Complete digital transformation for a leading automobile dealership group — website, CRM, and automated lead follow-up.',
    image: '/projects/auto-dealer.jpg',
  },
  {
    id: '2',
    name: 'HealthFirst Clinic Network',
    category: 'Healthcare',
    description: 'Multi-location clinic booking system with WhatsApp automation and patient engagement workflows.',
    image: '/projects/healthcare.jpg',
  },
  {
    id: '3',
    name: 'FreshBite Restaurant Chain',
    category: 'Restaurants & Food',
    description: 'Online ordering platform with delivery integration, loyalty program, and social media marketing.',
    image: '/projects/restaurant.jpg',
  },
  {
    id: '4',
    name: 'PrimeNest Realty',
    category: 'Real Estate',
    description: 'Property listing portal with lead capture, virtual tour integration, and automated follow-up sequences.',
    image: '/projects/real-estate.jpg',
  },
]

export const ProjectsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-border">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-3">
              PROJECTS
            </span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-navy">
              Projects that drive real results.
            </h2>
          </div>
          <Link href="/solutions" tabIndex={-1}>
            <Button variant="outline" size="sm">
              View All Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(10,25,49,0.08)] hover:border-blue-bright/20"
            >
              {/* Image placeholder */}
              <div className="w-full h-48 bg-blue-surface flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#E8F2FB] to-[#F0F6FF] flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-bright uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-base font-bold text-navy mt-1 mb-2 group-hover:text-blue-bright transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-navy group-hover:text-blue-bright transition-colors">
                    <span>View project</span>
                    <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
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
