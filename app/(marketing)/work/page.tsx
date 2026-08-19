import React from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { WorkGrid } from '@/components/marketing/WorkGrid'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | KARVAO India',
  description:
    'Explore real case studies, digital growth engines and transformations powered by KARVAO India.',
  alternates: {
    canonical: '/work',
  },
}

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col justify-between">
      <Header />
      <main className="flex-grow pt-28 sm:pt-36 pb-20 md:pb-28">
        <div className="page-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-black tracking-[0.25em] text-[#1264FF] uppercase block mb-3">
              OUR WORK
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1220] leading-tight mb-4">
              Results that speak louder than promises.
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
              Explore how we design and deploy complete digital growth engines across Indian industries.
            </p>
          </div>

          {/* Interactive Work Filter + Grid */}
          <WorkGrid initialProjects={projects} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
