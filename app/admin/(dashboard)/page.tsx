import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const [totalLeads, totalQuotes, totalAssessments, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.quotation.count(),
    prisma.assessment.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  const leadsGroup = await prisma.lead.groupBy({
    by: ['status'],
    _count: true,
  })

  const statusCounts = leadsGroup.reduce((acc, curr) => {
    acc[curr.status] = curr._count
    return acc
  }, {} as Record<string, number>)

  const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'text-blue-bright bg-[#F0F6FF] border-[#CCE0FF]'
      case 'CONTACTED': return 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]'
      case 'QUALIFIED': return 'text-[#7C3AED] bg-[#F5F3FF] border-[#DDD6FE]'
      case 'PROPOSAL': return 'text-blue-medium bg-[#EFF6FF] border-[#BFDBFE]'
      case 'WON': return 'text-green bg-[#ECFDF5] border-[#D1FAE5]'
      case 'LOST': return 'text-red bg-[#FEF2F2] border-[#FECACA]'
      default: return 'text-[#475569] bg-[#F8FAFC] border-border'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-navy">Dashboard Overview</h1>
        <p className="text-sm text-grey mt-1">Real-time overview of your website leads and client interactions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border border-border flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-grey uppercase tracking-wider block">Total Leads</span>
            <span className="text-4xl font-black text-navy mt-1 block">{totalLeads}</span>
          </div>
          <Link href="/admin/leads" className="text-xs font-bold text-blue-bright hover:text-primary-hover mt-4 block">
            View All Leads &rarr;
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-border flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-grey uppercase tracking-wider block">Project Quotations</span>
            <span className="text-4xl font-black text-navy mt-1 block">{totalQuotes}</span>
          </div>
          <Link href="/admin/quotations" className="text-xs font-bold text-blue-bright hover:text-primary-hover mt-4 block">
            View Quotations &rarr;
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-border flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-grey uppercase tracking-wider block">Growth Assessments</span>
            <span className="text-4xl font-black text-navy mt-1 block">{totalAssessments}</span>
          </div>
          <Link href="/admin/assessments" className="text-xs font-bold text-blue-bright hover:text-primary-hover mt-4 block">
            View Assessments &rarr;
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <Card className="md:col-span-5 p-6 bg-white border border-border space-y-6">
          <h2 className="text-lg font-extrabold text-navy">Lead Pipeline Breakdown</h2>
          <div className="space-y-4">
            {statuses.map((status) => {
              const count = statusCounts[status] || 0
              const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
              return (
                <div key={status} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-grey">{status}</span>
                    <span className="text-navy">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-navy h-full rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="md:col-span-7 p-6 bg-white border border-border space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-navy">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs font-bold text-grey hover:underline">View All</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-grey font-bold text-xs uppercase">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-3 font-semibold text-navy">
                        {lead.name}
                        <span className="block text-[11px] font-normal text-grey mt-0.5">{lead.email}</span>
                      </td>
                      <td className="py-3 text-grey">{lead.company || '—'}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-extrabold rounded-full border uppercase ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-xs text-grey">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', { dateStyle: 'short' })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-grey">No leads captured yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
