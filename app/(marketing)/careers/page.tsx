import React from 'react'
import { Metadata } from 'next'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers & Opportunities | KARVAO India',
  description: 'Join KARVAO India and build the future of full-stack growth systems for Indian businesses.',
  alternates: {
    canonical: '/careers',
  },
}

export const revalidate = 60

const VALUES = [
  {
    title: 'Execution Over Promises',
    description: 'We believe in real deliverables, clean engineering, and measurable growth for our clients.',
  },
  {
    title: 'Integrated Systems Mindset',
    description: 'We build end-to-end engines connecting websites, marketing, sales CRM, and automation.',
  },
  {
    title: 'Speed & Mastery',
    description: 'We work with modern stacks, fast iterations, and an uncompromising standard for quality.',
  },
]

export default async function CareersPage() {
  const jobs = await prisma.jobListing
    .findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
    .catch(() => [])

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 sm:pt-36 pb-20 md:pb-28">
        <div className="page-container max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-16 relative">
            <div
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[450px] h-[220px] rounded-full blur-3xl opacity-50 z-0"
              style={{
                background:
                  'radial-gradient(circle at 20% 20%, rgba(18, 100, 255, 0.08), transparent 45%), radial-gradient(circle at 80% 80%, rgba(191, 167, 255, 0.12), transparent 45%)',
              }}
            />

            <div className="relative z-10">
              <span className="text-xs font-black tracking-[0.25em] text-[#1264FF] uppercase block mb-3">
                CAREERS
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1220] leading-tight mb-4">
                Build the future of growth with us.
              </h1>
              <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
                At KARVAO, we unite engineering, performance marketing, and business automation to empower fast-moving Indian companies.
              </p>
            </div>
          </div>

          {/* Why KARVAO & Values */}
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1220] tracking-tight text-center mb-8">
              What We Value
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map((val) => (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-white/75 backdrop-blur-md border border-[#1264FF]/12 shadow-[0_6px_20px_rgba(11,18,32,0.04)] hover:-translate-y-1 hover:border-[#1264FF]/25 transition-all duration-300"
                >
                  <h3 className="text-base font-extrabold text-[#0B1220] mb-2">{val.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed font-medium">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Open Positions Section */}
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-black tracking-[0.2em] text-[#1264FF] uppercase block mb-2">
                OPEN POSITIONS
              </span>
              <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">
                Current Opportunities
              </h2>
            </div>

            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 sm:p-8 rounded-[24px] bg-white/80 backdrop-blur-xl border border-[#1264FF]/15 shadow-sm hover:border-[#1264FF]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-[#1264FF] bg-[#1264FF]/10 border border-[#1264FF]/15 px-2.5 py-0.5 rounded-full">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-bold text-[#475569] bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {job.location}
                        </span>
                        <span className="text-[10px] font-bold text-[#475569] bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-[#0B1220]">{job.title}</h3>
                      <p className="text-xs text-[#475569] leading-relaxed font-medium line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    <Link
                      href="/quotation"
                      className="group inline-flex items-center justify-center gap-2 bg-[#1264FF] hover:bg-[#0F53D6] text-white font-extrabold text-xs h-10 px-5 rounded-full shadow-sm transition-all whitespace-nowrap"
                    >
                      <span>Apply Now</span>
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-12 rounded-[28px] bg-white/80 backdrop-blur-xl border border-[#1264FF]/15 text-center shadow-[0_10px_35px_rgba(11,18,32,0.05)]">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] mb-3">
                  We&apos;re always open to meeting ambitious people.
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto mb-6 leading-relaxed">
                  Whether you specialize in web development, performance marketing, CRM systems, or WhatsApp automation, we would love to connect.
                </p>
                <Link
                  href="/quotation"
                  className="group inline-flex items-center justify-center gap-2 bg-[#1264FF] hover:bg-[#0F53D6] text-white font-extrabold text-xs sm:text-sm h-11 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <span>Apply / Contact Team</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
