import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/marketing/Header'
import { Footer } from '@/components/marketing/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col justify-between">
      <Header />

      <main className="flex-grow flex items-center justify-center pt-28 pb-20 px-4">
        <div className="max-w-lg w-full p-8 sm:p-12 rounded-[28px] bg-white/80 backdrop-blur-xl border border-[#1264FF]/15 text-center shadow-[0_12px_40px_rgba(11,18,32,0.06)] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#1264FF]/8 blur-3xl" />

          <div className="relative z-10">
            <span className="text-4xl sm:text-5xl font-black text-[#1264FF] block mb-2 tracking-tight">
              404
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] mb-3">
              Page not found
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed mb-8">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#0B1220] hover:bg-[#1A2638] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
              >
                Back Home
              </Link>
              <Link
                href="/quotation"
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#1264FF] hover:bg-[#0F53D6] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
              >
                Get a Quotation
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
