'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'

export const PrintButton: React.FC = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden md:inline-flex items-center gap-2 print:hidden"
      onClick={() => window.print()}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      <span>Download Report as PDF</span>
    </Button>
  )
}
