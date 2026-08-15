import React from 'react'
import Link from 'next/link'

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-blue-surface/30">
      <header className="bg-white border-b border-border py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start focus-visible:ring-2 focus-visible:ring-blue-bright rounded" aria-label="Karvao India Homepage">
            <span className="text-lg font-black text-navy tracking-tight leading-none">KARVAO</span>
            <span className="text-[7px] font-bold text-grey uppercase tracking-[0.25em] leading-none mt-0.5">INDIA</span>
          </Link>
          <Link href="/" className="text-xs font-bold text-grey hover:text-navy transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>
      <main className="flex-grow flex flex-col">{children}</main>
    </div>
  )
}
