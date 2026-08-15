import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const dynamic = 'force-dynamic'

export default async function AdminQuotationsPage() {
  const quotations = await prisma.quotation.findMany({
    orderBy: { createdAt: 'desc' },
    include: { lead: true, items: true },
  })

  const getTimelineLabel = (val: string) => {
    switch (val) {
      case 'immediate': return 'Immediate (<30d)'
      case '1-3-months': return '1 to 3 Months'
      case '3-6-months': return '3 to 6 Months'
      case 'exploring': return 'Exploring'
      default: return val
    }
  }

  const getBudgetLabel = (val: string) => {
    switch (val) {
      case 'under-50k': return 'Under ₹50k'
      case '50k-1.5l': return '₹50k - ₹1.5L'
      case '1.5l-3l': return '₹1.5L - ₹3L'
      case 'above-3l': return '₹3L+'
      default: return val
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Quotation Requests</h1>
          <p className="text-sm text-grey mt-1">Review detailed services requirements, budgets, and timelines.</p>
        </div>
        <span className="text-sm font-bold text-grey bg-white border border-border px-4 py-2 rounded-lg">
          Total Requests: {quotations.length}
        </span>
      </div>

      <div className="space-y-6">
        {quotations.length > 0 ? (
          quotations.map((quote) => (
            <Card key={quote.id} className="bg-white border border-border p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-blue-bright uppercase">
                    Quotation #{quote.id.substring(0, 8)}
                  </span>
                  <h3 className="text-lg font-extrabold text-navy mt-1">
                    {quote.lead.company ? `${quote.lead.company} (${quote.lead.name})` : quote.lead.name}
                  </h3>
                  <p className="text-xs text-grey mt-1">
                    Contact: {quote.lead.email} {quote.lead.phone ? `| ${quote.lead.phone}` : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="neutral">Timeline: {getTimelineLabel(quote.timeline)}</Badge>
                  <Badge variant="primary">Budget: {getBudgetLabel(quote.budget)}</Badge>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-grey uppercase tracking-wider block mb-2">Services Requested</span>
                <div className="flex flex-wrap gap-1.5">
                  {quote.items.map((item) => (
                    <Badge key={item.id} variant="neutral">{item.service}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-grey uppercase tracking-wider block">Project Goals</span>
                <p className="text-sm text-[#475569] leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-border">
                  {quote.goals}
                </p>
              </div>

              <div className="text-xs text-grey font-medium">
                Submitted on: {new Date(quote.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center bg-white border border-border">
            <p className="text-grey font-medium">No quotation requests submitted yet.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
