'use client'

import React, { useState } from 'react'

interface StatusDropdownProps {
  leadId: string
  initialStatus: string
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({ leadId, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Failed to update')
      setStatus(newStatus)
    } catch (err) {
      console.error(err)
      alert('Failed to update status. Please try again.')
      e.target.value = status
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (val: string) => {
    switch (val) {
      case 'NEW': return 'bg-[#F0F6FF] text-blue-bright border-[#CCE0FF]'
      case 'CONTACTED': return 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]'
      case 'QUALIFIED': return 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]'
      case 'PROPOSAL': return 'bg-[#EFF6FF] text-blue-medium border-[#BFDBFE]'
      case 'WON': return 'bg-[#ECFDF5] text-green border-[#D1FAE5]'
      case 'LOST': return 'bg-[#FEF2F2] text-red border-[#FECACA]'
      default: return 'bg-[#F8FAFC] text-[#475569] border-border'
    }
  }

  return (
    <div className="relative inline-block">
      <select
        value={status}
        disabled={isUpdating}
        onChange={handleStatusChange}
        className={`text-xs font-black uppercase rounded-full px-3 py-1 border outline-none cursor-pointer disabled:opacity-50 text-center ${getStatusColor(status)}`}
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="QUALIFIED">Qualified</option>
        <option value="PROPOSAL">Proposal</option>
        <option value="WON">Won</option>
        <option value="LOST">Lost</option>
      </select>
    </div>
  )
}
