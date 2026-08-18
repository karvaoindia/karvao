import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { GrowthSystemVisual } from '@/components/marketing/GrowthSystemVisual'
import { SolutionsSection } from '@/components/marketing/SolutionsSection'
import { GrowthCapabilityBar } from '@/components/marketing/GrowthCapabilityBar'
import { ProjectsSection } from '@/components/marketing/ProjectsSection'
import { ClientReviewsSection } from '@/components/marketing/ClientReviewsSection'
import { RevealOnScroll, AnimateBar } from '@/components/marketing/HomeAnimations'
import { prisma } from '@/lib/prisma'

async function getContent(key: string, fallback: string, contentMap: Record<string, string>): Promise<string> {
  return contentMap[key] || fallback
}

export default async function HomePage() {
  const contentItems = await prisma.siteContent.findMany({
    select: { key: true, value: true },
  })
  const contentMap = Object.fromEntries(contentItems.map(item => [item.key, item.value]))
  return (
    <div className="w-full bg-white">
      {/* 1. HERO */}
      <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden bg-white">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Hero Left Content */}
          <div className="w-full flex flex-col items-start gap-6">
            <RevealOnScroll>
              <span className="text-[11px] font-black tracking-[0.2em] text-blue-bright uppercase block">
                DIGITAL GROWTH PARTNER FOR BUSINESSES
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-black tracking-tight text-navy leading-[1.02]">
                Build better.<br />
                Grow smarter.<br />
                Scale with<br />
                <span className="text-blue-bright">systems.</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-[15px] md:text-[17px] text-[#475569] max-w-md leading-relaxed">
                {await getContent('hero_subheadline', 'We help businesses build their digital presence, generate demand, improve conversions, automate operations and measure what drives growth.', contentMap)}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-2">
                <Link href="/quotation" className="flex-1 sm:flex-none">
                  <Button variant="primary" size="lg" className="w-full gap-2 font-bold">
                    <span>Get a Quotation</span>
                    <span className="text-sm">&rarr;</span>
                  </Button>
                </Link>
                <Link href="/business-score" className="flex-1 sm:flex-none">
                  <Button variant="outline" size="lg" className="w-full gap-2 font-bold">
                    <span>Check Your Business Score</span>
                    <span className="text-sm">&rarr;</span>
                  </Button>
                </Link>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.4}>
              {/* Core Capability Labels */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-bold text-grey mt-4 select-none">
                <span>Website</span>
                <span className="w-1.5 h-1.5 bg-blue-bright/40 rounded-full"></span>
                <span>Marketing</span>
                <span className="w-1.5 h-1.5 bg-blue-bright/40 rounded-full"></span>
                <span>CRM</span>
                <span className="w-1.5 h-1.5 bg-blue-bright/40 rounded-full"></span>
                <span>Automation</span>
                <span className="w-1.5 h-1.5 bg-blue-bright/40 rounded-full"></span>
                <span>Analytics</span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Hero Right Visual Column */}
          <div className="w-full flex items-center justify-center">
            <GrowthSystemVisual />
          </div>
        </div>
      </section>

      {/* 2. GROWTH CAPABILITY BAR */}
      <GrowthCapabilityBar />

      {/* 3. CHALLENGE SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left Text */}
          <div className="w-full flex flex-col items-start gap-6">
            <RevealOnScroll>
              <span className="text-[11px] font-black tracking-[0.2em] text-blue-bright uppercase block">
                THE CHALLENGE
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="text-[32px] md:text-[44px] font-black tracking-tight text-navy leading-[1.1]">
                {await getContent('challenge_headline', 'Growth gets complicated when everything works separately.', contentMap)}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-[15px] md:text-[17px] text-[#475569] leading-relaxed max-w-md">
                {await getContent('challenge_subheadline', 'Your website, marketing, customer follow-up and reporting shouldn\'t operate as disconnected pieces.', contentMap)}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <p className="text-sm md:text-base font-black text-blue-bright mt-2">
                {await getContent('challenge_cta', 'Karvao connects the system.', contentMap)}
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Visual (Tangled vs One Growth Engine) */}
          <RevealOnScroll delay={0.2}>
            <div className="relative w-full max-w-[520px] h-[340px] flex items-center justify-between px-8 bg-white border border-border/60 rounded-3xl py-10 shadow-[0_2px_12px_rgba(10,25,49,0.04)]">
              {/* Left side: Tangled network */}
              <div className="relative w-[190px] h-[190px]">
                {/* Google */}
                <div className="absolute top-[24px] left-[10px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
                {/* FB */}
                <div className="absolute bottom-[24px] left-[10px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20">
                  <svg className="w-4 h-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                {/* Insta */}
                <div className="absolute top-[2px] left-[78px] -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20">
                  <svg className="w-4 h-4 text-[#E4405F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                {/* WhatsApp */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[10px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20">
                  <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.743 1.451 5.4 0 9.794-4.395 9.797-9.799.002-2.618-1.01-5.08-2.853-6.927C16.483 1.83 14.025.816 11.412.815 6.015.815 1.62 5.207 1.618 10.607c-.001 1.688.449 3.336 1.3 4.783L1.932 20.35l4.715-1.196z"/>
                  </svg>
                </div>
                {/* Mail */}
                <div className="absolute bottom-[6px] left-[110px] w-9 h-9 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.06)] z-20">
                  <svg className="w-4 h-4 text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>

                <span className="absolute bottom-[20px] left-[78px] -translate-x-1/2 text-grey font-bold text-sm z-30">?</span>

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 180 180">
                  <line x1="26" y1="40" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="26" y1="140" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="78" y1="18" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="154" y1="90" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
                  <line x1="126" y1="158" x2="90" y2="90" stroke="#E2E8F0" strokeWidth="1" />
                  <path
                    d="M 85 90 C 80 80, 100 80, 95 90 C 90 100, 80 95, 85 85 C 90 75, 105 85, 100 95 C 95 105, 80 100, 75 90 C 70 80, 90 70, 105 80 C 115 90, 100 110, 85 105 C 70 100, 75 80, 90 75 C 105 70, 110 95, 95 105 C 80 115, 65 90, 80 80"
                    stroke="#94A3B8"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Middle Arrow */}
              <div className="flex items-center justify-center text-[#CBD5E1] mx-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Right side: Unified Karvao Box */}
              <div className="w-[200px] flex flex-col items-center gap-3">
                <div className="w-full py-8 px-4 bg-white border border-border/60 rounded-2xl flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(10,25,49,0.04)]">
                  <span className="text-base font-black text-navy leading-none">KARVAO</span>
                  <span className="text-[8px] font-bold text-grey tracking-[0.2em] leading-none mt-0.5">INDIA</span>
                  <div className="w-10 h-0.5 bg-blue-bright rounded-full mt-4" />
                </div>
                <span className="text-[10px] font-black text-blue-bright tracking-wide text-center uppercase block mt-1 leading-normal">
                  One System.<br />One Growth Engine.
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. BUSINESS GROWTH SCORE DIAGNOSE */}
      <section className="py-20 md:py-28 bg-blue-surface/50 border-y border-[#CCE0FF]/30">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Score Card preview left column */}
          <RevealOnScroll>
            <div className="w-full flex justify-center">
              <Card className="w-full max-w-[460px] border border-border/60 shadow-[0_2px_12px_rgba(10,25,49,0.04)] p-8 bg-white rounded-3xl flex flex-col gap-6">
                <div className="border-b border-border/60 pb-4">
                  <span className="text-[10px] font-black text-grey uppercase tracking-[0.15em] block">Business Growth Score</span>
                </div>
                <div className="flex items-center gap-8 justify-between">
                  <div className="flex-shrink-0">
                    <ScoreRing score={64} size={130} strokeWidth={9} />
                  </div>
                  <div className="flex-1 flex flex-col gap-3.5 w-full">
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="flex justify-between text-[11px] font-bold text-grey">
                        <span>Digital Presence</span>
                        <span className="text-navy">78/100</span>
                      </div>
                      <div className="w-full h-2 bg-[#E2E8F0]/60 rounded-full overflow-hidden">
                        <AnimateBar width="78%" color="#0066FF" delay={0.1} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="flex justify-between text-[11px] font-bold text-grey">
                        <span>Lead Generation</span>
                        <span className="text-navy">72/100</span>
                      </div>
                      <div className="w-full h-2 bg-[#E2E8F0]/60 rounded-full overflow-hidden">
                        <AnimateBar width="72%" color="#0066FF" delay={0.2} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="flex justify-between text-[11px] font-bold text-grey">
                        <span>Conversion &amp; Sales</span>
                        <span className="text-navy">55/100</span>
                      </div>
                      <div className="w-full h-2 bg-[#E2E8F0]/60 rounded-full overflow-hidden">
                        <AnimateBar width="55%" color="#F59E0B" delay={0.3} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="flex justify-between text-[11px] font-bold text-grey">
                        <span>Automation</span>
                        <span className="text-navy">48/100</span>
                      </div>
                      <div className="w-full h-2 bg-[#E2E8F0]/60 rounded-full overflow-hidden">
                        <AnimateBar width="48%" color="#EF4444" delay={0.4} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="flex justify-between text-[11px] font-bold text-grey">
                        <span>Measurement</span>
                        <span className="text-navy">66/100</span>
                      </div>
                      <div className="w-full h-2 bg-[#E2E8F0]/60 rounded-full overflow-hidden">
                        <AnimateBar width="66%" color="#0066FF" delay={0.5} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Color legend */}
                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border/60">
                  <span className="text-[9px] font-bold text-grey uppercase tracking-[0.12em]">Key:</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#475569]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-bright inline-block" /> Strong
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#475569]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B] inline-block" /> Average
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#475569]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-red inline-block" /> Needs Attention
                  </span>
                </div>
              </Card>
            </div>
          </RevealOnScroll>

          {/* Right Text */}
          <div className="w-full flex flex-col items-start gap-6">
            <RevealOnScroll>
              <span className="text-[11px] font-black tracking-[0.2em] text-blue-bright uppercase block">
                DIAGNOSE
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="text-[32px] md:text-[44px] font-black tracking-tight text-navy leading-[1.1]">
                {await getContent('score_headline', 'How ready is your business for growth?', contentMap)}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-[15px] md:text-[17px] text-[#475569] leading-relaxed max-w-lg">
                {await getContent('score_subheadline', 'Get a quick assessment of your digital presence, customer acquisition, conversion, automation and measurement.', contentMap)}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <div className="flex flex-col items-start gap-4 w-full mt-2">
                <Link href="/business-score" tabIndex={-1}>
                  <Button variant="primary" size="lg" className="gap-2 font-bold">
                    <span>Check Your Business Score</span>
                    <span className="text-sm">&rarr;</span>
                  </Button>
                </Link>
                <div className="flex items-center gap-x-2 gap-y-1 text-[11px] font-bold text-grey mt-1 select-none">
                  <span>Takes less than 2 minutes</span>
                  <span>&bull;</span>
                  <span>Get instant report</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 5. SOLUTIONS SECTION */}
      <SolutionsSection />

      {/* 6. INDUSTRIES */}
      <section className="py-20 md:py-28 bg-white border-t border-border" id="industries">
        <div className="page-container">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-4">
                INDUSTRIES
              </span>
              <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-navy leading-tight">
                {await getContent('industries_headline', 'Built around how your business works.', contentMap)}
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <button aria-label="Previous industries" className="w-10 h-10 rounded-full border border-border/60 bg-white flex items-center justify-center text-grey shadow-[0_1px_4px_rgba(10,25,49,0.04)] hover:border-blue-bright hover:text-blue-bright hover:shadow-[0_2px_8px_rgba(0,102,255,0.1)] transition-all flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {[
                { name: 'Auto Dealers', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 17h14v-4H5v4zm0 0a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM6 9l2-4h8l2 4H6z" /> },
                { name: 'Clinics & Healthcare', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3zm2 6h4m-2-2v4" /> },
                { name: 'Restaurants & Food', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v20M18 8v14M18 4a3 3 0 00-3 3v5a3 3 0 006 0V7a3 3 0 00-3-3zM6 3v8a3 3 0 003 3h0a3 3 0 003-3V3M9 3v8" /> },
                { name: 'Real Estate', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
                { name: 'Retail & D2C', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /> },
                { name: 'Education', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /> },
              ].map((ind) => (
                <div key={ind.name} className="group flex flex-col items-center gap-3 min-w-[130px] text-center cursor-default">
                  <div className="w-[72px] h-[72px] rounded-2xl bg-blue-surface/80 border border-[#CCE0FF]/40 flex items-center justify-center group-hover:border-blue-bright/50 group-hover:bg-[#EBF4FF] group-hover:shadow-[0_4px_16px_rgba(0,102,255,0.08)] transition-all duration-300">
                    <svg className="w-7 h-7 text-blue-medium group-hover:text-blue-bright transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {ind.icon}
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold text-navy group-hover:text-blue-bright transition-colors">{ind.name}</span>
                </div>
              ))}

              <button aria-label="Next industries" className="w-10 h-10 rounded-full border border-border/60 bg-white flex items-center justify-center text-grey shadow-[0_1px_4px_rgba(10,25,49,0.04)] hover:border-blue-bright hover:text-blue-bright hover:shadow-[0_2px_8px_rgba(0,102,255,0.1)] transition-all flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="flex items-center justify-center gap-2 mt-8">
              <span className="text-xs font-bold text-grey">1 / 6</span>
              <div className="flex items-center gap-1.5">
                {[0,1,2,3,4,5].map((i) => (
                  <span key={i} className={`block rounded-full transition-all ${ i === 0 ? 'w-4 h-1.5 bg-blue-bright' : 'w-1.5 h-1.5 bg-[#CBD5E1]'}`} />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. PROJECTS */}
      <ProjectsSection />

      {/* 8. CLIENT REVIEWS */}
      <ClientReviewsSection />
    </div>
  )
}
