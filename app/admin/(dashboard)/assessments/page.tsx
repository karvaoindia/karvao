import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { getScoreStage } from '@/lib/scoring'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminAssessmentsPage() {
  const assessments = await prisma.assessment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { lead: true, reports: true },
  })

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red bg-red/10 border-red/20'
    if (score < 60) return 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]'
    if (score < 75) return 'text-blue-bright bg-[#F0F6FF] border-[#CCE0FF]'
    return 'text-green bg-[#ECFDF5] border-[#D1FAE5]'
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Growth Assessments</h1>
          <p className="text-sm text-grey mt-1">Review completed diagnostic scores, categories, and report tokens.</p>
        </div>
        <span className="text-sm font-bold text-grey bg-white border border-border px-4 py-2 rounded-lg">
          Total Diagnostics: {assessments.length}
        </span>
      </div>

      <div className="space-y-6">
        {assessments.length > 0 ? (
          assessments.map((asst) => {
            const reportToken = asst.reports[0]?.accessToken
            const stage = getScoreStage(asst.overallScore)

            return (
              <Card key={asst.id} className="bg-white border border-border p-6 md:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-8">
                <div className="space-y-4 flex-grow">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-blue-bright uppercase">
                      Assessment ID: {asst.id.substring(0, 8)}
                    </span>
                    <h3 className="text-lg font-extrabold text-navy mt-1">
                      {asst.lead.company ? `${asst.lead.company} (${asst.lead.name})` : asst.lead.name}
                    </h3>
                    <p className="text-xs text-grey">
                      Contact: {asst.lead.email} {asst.lead.phone ? `| ${asst.lead.phone}` : ''}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center pt-2">
                    <div className="p-2 border border-border rounded-lg">
                      <span className="text-[9px] font-bold text-grey uppercase tracking-tight block">Digital</span>
                      <span className="text-xs font-extrabold text-navy mt-0.5 block">{asst.digitalPresence}/100</span>
                    </div>
                    <div className="p-2 border border-border rounded-lg">
                      <span className="text-[9px] font-bold text-grey uppercase tracking-tight block">Acquisition</span>
                      <span className="text-xs font-extrabold text-navy mt-0.5 block">{asst.acquisition}/100</span>
                    </div>
                    <div className="p-2 border border-border rounded-lg">
                      <span className="text-[9px] font-bold text-grey uppercase tracking-tight block">Conversion</span>
                      <span className="text-xs font-extrabold text-navy mt-0.5 block">{asst.conversion}/100</span>
                    </div>
                    <div className="p-2 border border-border rounded-lg">
                      <span className="text-[9px] font-bold text-grey uppercase tracking-tight block">Automation</span>
                      <span className="text-xs font-extrabold text-navy mt-0.5 block">{asst.automation}/100</span>
                    </div>
                    <div className="p-2 border border-border rounded-lg">
                      <span className="text-[9px] font-bold text-grey uppercase tracking-tight block">Measurement</span>
                      <span className="text-xs font-extrabold text-navy mt-0.5 block">{asst.measurement}/100</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-grey font-medium">
                    Diagnostic date: {new Date(asst.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center md:border-l md:border-border md:pl-8 flex-shrink-0 gap-4">
                  <div className="flex items-center gap-4">
                    <ScoreRing score={asst.overallScore} size={85} strokeWidth={6} />
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-grey uppercase block tracking-wider">Growth Band</span>
                      <span className={`inline-block px-2 py-0.5 text-xs font-extrabold rounded-full border mt-1 ${getScoreColor(asst.overallScore)}`}>
                        {stage}
                      </span>
                    </div>
                  </div>

                  {reportToken ? (
                    <Link href={`/report/${reportToken}`} target="_blank" className="w-full">
                      <button className="w-full bg-navy hover:bg-navy-light text-white py-2 px-4 rounded-lg text-xs font-semibold text-center border border-navy transition-colors">
                        View Shareable Report
                      </button>
                    </Link>
                  ) : (
                    <span className="text-xs font-bold text-grey">No report generated</span>
                  )}
                </div>
              </Card>
            )
          })
        ) : (
          <Card className="p-8 text-center bg-white border border-border">
            <p className="text-grey font-medium">No diagnostics completed yet.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
