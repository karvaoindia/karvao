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

import { HeroSection } from '@/components/marketing/HeroSection'

import { ChallengeVisualCard } from '@/components/marketing/ChallengeVisualCard'
import { IndustriesSection } from '@/components/marketing/IndustriesSection'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Karvao India | Digital Growth Partner for Indian Businesses',
  description: 'We build digital growth systems for Indian businesses — connecting websites, performance ads, CRM, WhatsApp automation, and analytics into one engine.',
  alternates: {
    canonical: '/',
  },
}

async function getContent(key: string, fallback: string, contentMap: Record<string, string>): Promise<string> {
  return contentMap[key] || fallback
}

export default async function HomePage() {
  const contentItems = await prisma.siteContent.findMany({
    select: { key: true, value: true },
  })
  const contentMap = Object.fromEntries(contentItems.map(item => [item.key, item.value]))
  return (
    <div className="w-full bg-[#FAFAF8]">
      {/* 1. HERO */}
      <HeroSection />


      {/* 2. GROWTH CAPABILITY BAR */}
      <GrowthCapabilityBar />

      {/* 3. CHALLENGE SECTION */}
      <section className="py-14 md:py-28 bg-white">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left Text */}
          <div className="w-full flex flex-col items-start gap-5 md:gap-6">
            <RevealOnScroll>
              <span className="text-[11px] font-black tracking-[0.2em] text-blue-bright uppercase block">
                THE CHALLENGE
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="text-[28px] sm:text-[32px] md:text-[44px] font-black tracking-tight text-navy leading-[1.1]">
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

          {/* Right Visual (Interactive 15-Zone 3D Challenge Visual Card) */}
          <RevealOnScroll delay={0.2}>
            <ChallengeVisualCard />
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. BUSINESS GROWTH SCORE DIAGNOSE */}
      <section className="py-14 md:py-28 bg-blue-surface/50 border-y border-[#CCE0FF]/30">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Score Card preview left column */}
          <RevealOnScroll>
            <div className="w-full flex justify-center">
              <Card className="w-full max-w-[460px] border border-border/60 shadow-[0_2px_12px_rgba(10,25,49,0.04)] p-5 sm:p-8 bg-white rounded-3xl flex flex-col gap-4 sm:gap-6">
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
          <div className="w-full flex flex-col items-start gap-5 md:gap-6">
            <RevealOnScroll>
              <span className="text-[11px] font-black tracking-[0.2em] text-blue-bright uppercase block">
                DIAGNOSE
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="text-[28px] sm:text-[32px] md:text-[44px] font-black tracking-tight text-navy leading-[1.1]">
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

      {/* 6. INDUSTRIES SECTION */}
      <IndustriesSection
        headline={await getContent(
          'industries_headline',
          'Built for Indian industries that move fast.',
          contentMap
        )}
      />

      {/* 7. PROJECTS */}
      <ProjectsSection />

      {/* 8. CLIENT REVIEWS */}
      <ClientReviewsSection />
    </div>
  )
}
