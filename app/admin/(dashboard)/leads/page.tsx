import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { StatusDropdown } from '@/components/admin/StatusDropdown'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Leads Directory</h1>
          <p className="text-sm text-grey mt-1">Manage client profiles, status milestones, and registrations.</p>
        </div>
        <span className="text-sm font-bold text-grey bg-white border border-border px-4 py-2 rounded-lg">
          Total Leads: {leads.length}
        </span>
      </div>

      <Card className="bg-white border border-border p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-grey font-bold text-xs uppercase">
                <th className="pb-3 pl-2">Name & Contact</th>
                <th className="pb-3">Company</th>
                <th className="pb-3">Registration Date</th>
                <th className="pb-3 text-center">Lifecycle Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F8FAFC]">
                    <td className="py-4 pl-2">
                      <span className="font-bold text-navy block">{lead.name}</span>
                      <span className="text-xs text-grey block mt-0.5">{lead.email}</span>
                      {lead.phone && <span className="text-xs text-grey block mt-0.5">{lead.phone}</span>}
                    </td>
                    <td className="py-4 text-[#475569] font-medium">{lead.company || '—'}</td>
                    <td className="py-4 text-grey">
                      {new Date(lead.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="py-4 text-center">
                      <StatusDropdown leadId={lead.id} initialStatus={lead.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="py-8 text-center text-grey font-medium">No leads captured yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
