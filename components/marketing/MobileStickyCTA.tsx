import React from 'react'
import Link from 'next/link'

export const MobileStickyCTA: React.FC = () => {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-4 py-3 shadow-[0_-4px_16px_rgba(10,25,49,0.08)] flex items-center gap-3 pb-[calc(12px+env(safe-area-inset-bottom))]"
      role="navigation"
      aria-label="Mobile Action Bar"
    >
      <Link
        href="/business-score"
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-white text-navy font-semibold text-xs transition-colors hover:bg-blue-surface active:bg-[#E8F2FB] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright focus-visible:ring-offset-2"
      >
        <span>Business Score</span>
        <svg className="w-4 h-4 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      </Link>

      <Link
        href="/quotation"
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-bright text-white font-semibold text-xs transition-colors hover:bg-primary-hover active:bg-[#0047B3] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright focus-visible:ring-offset-2"
      >
        <span>Get Quotation</span>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  )
}
