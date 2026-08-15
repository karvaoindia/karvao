import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { calculateScores, CATEGORY_LABELS } from '@/lib/scoring'
import { getRecommendations } from '@/lib/recommendations'
import { Button } from '@/components/ui/Button'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PrintButton } from '@/components/product/PrintButton'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ token: string }>
}

export const metadata: Metadata = {
  title: 'Your Business Growth Report',
  description: 'View your customized business growth score diagnostic breakdown, key opportunity areas, and deterministic growth recommendations.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ReportPage({ params }: PageProps) {
  const { token } = await params

  const report = await prisma.report.findUnique({
    where: { accessToken: token },
    include: {
      assessment: {
        include: {
          lead: true,
        },
      },
    },
  })

  if (!report) {
    notFound()
  }

  const { assessment } = report
  const { lead } = assessment

  const scores = {
    digitalPresence: assessment.digitalPresence,
    acquisition: assessment.acquisition,
    conversion: assessment.conversion,
    automation: assessment.automation,
    measurement: assessment.measurement,
  }

  const scoringResult = calculateScores(scores)
  const recommendations = getRecommendations(scores)

  const getScoreColorClass = (val: number) => {
    if (val < 40) return { text: 'text-red bg-red/10 border-red/20', bar: 'bg-red' }
    if (val < 60) return { text: 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]', bar: 'bg-[#F59E0B]' }
    if (val < 75) return { text: 'text-blue-bright bg-[#F0F6FF] border-[#CCE0FF]', bar: 'bg-blue-bright' }
    return { text: 'text-green bg-[#ECFDF5] border-[#D1FAE5]', bar: 'bg-green' }
  }

  return (
    <div className="w-full bg-blue-surface/30 print:bg-white min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-6 space-y-8 print:p-0">
        
        {/* REPORT HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-2">
              Growth Diagnostic Report
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-navy">
              {lead.company || 'Your Business'}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-grey mt-2">
              <span>Client: <strong className="text-navy">{lead.name}</strong></span>
              <span className="hidden md:inline">&bull;</span>
              <span>Email: <strong className="text-navy">{lead.email}</strong></span>
              {lead.phone && (
                <>
                  <span className="hidden md:inline">&bull;</span>
                  <span>Phone: <strong className="text-navy">{lead.phone}</strong></span>
                </>
              )}
              <span className="hidden md:inline">&bull;</span>
              <span>Generated: <strong className="text-navy">{new Date(report.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</strong></span>
            </div>
          </div>
          <PrintButton />
        </div>

        {/* OVERALL SCORE DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-4 p-6 bg-white border border-border flex flex-col items-center justify-center text-center">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-grey mb-4">
              Overall Score
            </h2>
            <ScoreRing score={scoringResult.overallScore} size={150} strokeWidth={10} />
            <div className="mt-4">
              <span className="text-xs font-bold text-grey block uppercase tracking-wider">Growth Stage</span>
              <span className="text-lg font-black text-navy mt-0.5 block">{scoringResult.stage}</span>
            </div>
          </Card>

          <Card className="md:col-span-8 p-6 bg-white border border-border flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-navy mb-3">Diagnostic Summary</h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Your business has completed the Karvao Growth Diagnostic. Based on your answers, your organization stands at the <strong className="text-navy">{scoringResult.stage}</strong> stage with an overall growth index of <strong className="text-navy">{scoringResult.overallScore}/100</strong>.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
              <div className="p-4 bg-[#F0F6FF] border border-[#CCE0FF] rounded-xl">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-bright block">Strongest Area</span>
                <span className="text-sm font-extrabold text-navy block mt-1">{scoringResult.strongestArea}</span>
              </div>
              <div className="p-4 bg-[#FFF7ED] border-[#FED7AA] border rounded-xl">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#EA580C] block">Key Opportunity</span>
                <span className="text-sm font-extrabold text-navy block mt-1">{scoringResult.biggestOpportunity}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* CATEGORY SCORES BREAKDOWN */}
        <Card className="p-6 md:p-8 bg-white border border-border">
          <h2 className="text-xl font-extrabold text-navy mb-6">Growth Vector Analysis</h2>
          <div className="space-y-6">
            {(Object.keys(scores) as Array<keyof typeof scores>).map((categoryKey) => {
              const scoreVal = scores[categoryKey]
              const colors = getScoreColorClass(scoreVal)
              const label = CATEGORY_LABELS[categoryKey]

              return (
                <div key={categoryKey} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-navy">{label}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${colors.text}`}>
                      {scoreVal}/100
                    </span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors.bar}`}
                      style={{ width: `${scoreVal}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* CUSTOM RECOMMENDATIONS */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-navy">Custom Recommendations</h2>
            <p className="text-sm text-grey mt-1">
              Actions recommended by the deterministic growth engine based on scores under 50.
            </p>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="p-6 bg-white border border-border flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-bright block">
                        {CATEGORY_LABELS[rec.category]}
                      </span>
                      <Badge variant={rec.priority === 'High' ? 'danger' : 'neutral'}>
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <h3 className="text-base font-extrabold text-navy leading-snug">
                      {rec.title}
                    </h3>
                    <ul className="space-y-2 pt-2">
                      {rec.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#475569] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-bright mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-white border border-border">
              <div className="w-12 h-12 rounded-full bg-[#F0F6FF] text-blue-bright flex items-center justify-center mx-auto mb-4 border border-[#CCE0FF]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy mb-1">Excellent Growth Foundation!</h3>
              <p className="text-sm text-grey max-w-md mx-auto">
                All your business categories scored above 50. Keep optimizing and monitoring analytics to maintain this advanced scaling speed.
              </p>
            </Card>
          )}
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="bg-navy text-white rounded-2xl p-8 md:p-10 text-center flex flex-col items-center gap-6 print:hidden">
          <span className="text-xs font-black tracking-widest text-blue-light uppercase block">
            NEXT STEPS
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Ready to implement these recommendations?
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-lg leading-relaxed">
            Let&apos;s build these growth vector updates. Request a custom project quote covering your needed items, or coordinate with a specialist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link href="/quotation" className="flex-grow sm:flex-grow-0">
              <Button variant="primary" className="w-full">
                Get a Quote for Your Fixes
              </Button>
            </Link>
            <Link href="/" className="flex-grow sm:flex-grow-0">
              <Button variant="outline" className="w-full text-white border-[#475569] hover:bg-[#1E3A5F]">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
