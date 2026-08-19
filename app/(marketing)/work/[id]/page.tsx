import React from 'react'
import { Metadata } from 'next'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } }).catch(() => null)

  return {
    title: project ? `${project.name} | KARVAO Work` : 'Project Showcase | KARVAO India',
    description: project?.description || 'Explore KARVAO India client case studies and digital growth outcomes.',
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params

  // Try fetching project from database
  const project = await prisma.project.findUnique({ where: { id } }).catch(() => null)

  // Fallback demo projects if database entry not found
  const fallbackProject = !project
    ? {
        id,
        name: 'Growth Engine System',
        category: 'BUILD & GROW',
        description: 'Complete digital transformation connecting high-performance web engineering, paid acquisition, and automated customer qualification pipelines.',
        imageUrl: null,
        url: null,
      }
    : project

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 sm:pt-36 pb-20 md:pb-28">
        <div className="page-container max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Breadcrumb navigation */}
          <div className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1264FF] hover:text-[#0B1220] transition-colors"
            >
              <span>&larr;</span>
              <span>Back to Work Showcase</span>
            </Link>
          </div>

          {/* Project Header Container */}
          <div className="p-8 sm:p-12 rounded-[28px] bg-white/80 backdrop-blur-xl border border-[#1264FF]/15 shadow-[0_10px_35px_rgba(11,18,32,0.05)] relative overflow-hidden mb-10">
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#1264FF]/8 blur-3xl" />

            <div className="relative z-10 space-y-4">
              <span className="text-xs font-black tracking-[0.25em] text-[#1264FF] uppercase block">
                {fallbackProject.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-tight">
                {fallbackProject.name}
              </h1>
              <p className="text-base text-[#475569] font-medium leading-relaxed max-w-2xl">
                {fallbackProject.description}
              </p>

              {fallbackProject.url && (
                <div className="pt-2">
                  <a
                    href={fallbackProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1264FF] hover:bg-[#0F53D6] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full shadow-md transition-all"
                  >
                    <span>Visit Live Website</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-[#1264FF]/12 shadow-sm">
              <span className="text-[11px] font-black text-[#1264FF] uppercase tracking-wider block mb-1">
                Category
              </span>
              <p className="text-sm font-bold text-[#0B1220]">{fallbackProject.category}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-[#1264FF]/12 shadow-sm">
              <span className="text-[11px] font-black text-[#1264FF] uppercase tracking-wider block mb-1">
                Strategy
              </span>
              <p className="text-sm font-bold text-[#0B1220]">Full-Stack Growth System</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-[#1264FF]/12 shadow-sm">
              <span className="text-[11px] font-black text-[#1264FF] uppercase tracking-wider block mb-1">
                Partner
              </span>
              <p className="text-sm font-bold text-[#0B1220]">KARVAO India</p>
            </div>
          </div>

          {/* Call to Action Banner */}
          <div className="p-8 rounded-[24px] bg-gradient-to-br from-[#0B1220] via-[#122240] to-[#0B1220] text-white text-center shadow-lg">
            <h3 className="text-xl font-extrabold mb-2">Want similar results for your business?</h3>
            <p className="text-xs text-white/70 mb-5">
              Let&apos;s evaluate your current growth stack and design your custom system.
            </p>
            <Link
              href="/quotation"
              className="inline-flex items-center gap-2 bg-[#1264FF] hover:bg-[#0F53D6] text-white font-extrabold text-xs sm:text-sm h-10 px-6 rounded-full shadow-md transition-all"
            >
              <span>Get a Quotation</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
