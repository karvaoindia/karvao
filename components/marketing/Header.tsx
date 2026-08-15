'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border py-3 shadow-[0_1px_3px_rgba(10,25,49,0.06)]'
          : 'bg-white/80 backdrop-blur-md border-b border-transparent py-4'
      }`}
    >
      <div className="page-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start focus-visible:ring-2 focus-visible:ring-blue-bright rounded" aria-label="Karvao India Homepage">
          <span className="text-2xl font-black text-navy tracking-tight leading-none">
            KARVAO
          </span>
          <span className="text-[8px] font-bold text-grey uppercase tracking-[0.25em] leading-none mt-0.5">
            INDIA
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          <Link href="/solutions" className="text-[14px] font-semibold text-[#475569] hover:text-navy transition-colors inline-flex items-center gap-1 group">
            <span>Solutions</span>
            <svg className="w-3 h-3 text-grey group-hover:text-navy transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link href="/industries" className="text-[14px] font-semibold text-[#475569] hover:text-navy transition-colors inline-flex items-center gap-1 group">
            <span>Industries</span>
            <svg className="w-3 h-3 text-grey group-hover:text-navy transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link href="/how-we-work" className="text-[14px] font-semibold text-[#475569] hover:text-navy transition-colors">
            How We Work
          </Link>
          <Link href="/about" className="text-[14px] font-semibold text-[#475569] hover:text-navy transition-colors">
            About Us
          </Link>
          <Link href="/insights" className="text-[14px] font-semibold text-[#475569] hover:text-navy transition-colors">
            Insights
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/business-score" tabIndex={-1}>
            <Button variant="outline" size="sm">
              Business Score
            </Button>
          </Link>
          <Link href="/quotation" tabIndex={-1}>
            <Button variant="primary" size="sm">
              Get Quotation
            </Button>
          </Link>
        </div>

        {/* Mobile Burger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright rounded"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg px-6 py-6 flex flex-col gap-6"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            <Link href="/solutions" onClick={() => setIsOpen(false)} className="text-base font-semibold text-navy hover:text-blue-bright py-1">
              Solutions
            </Link>
            <Link href="/industries" onClick={() => setIsOpen(false)} className="text-base font-semibold text-navy hover:text-blue-bright py-1">
              Industries
            </Link>
            <Link href="/how-we-work" onClick={() => setIsOpen(false)} className="text-base font-semibold text-navy hover:text-blue-bright py-1">
              How We Work
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-base font-semibold text-navy hover:text-blue-bright py-1">
              About Us
            </Link>
            <Link href="/insights" onClick={() => setIsOpen(false)} className="text-base font-semibold text-navy hover:text-blue-bright py-1">
              Insights
            </Link>
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Link href="/business-score" onClick={() => setIsOpen(false)} tabIndex={-1}>
              <Button variant="outline" className="w-full">
                Business Score
              </Button>
            </Link>
            <Link href="/quotation" onClick={() => setIsOpen(false)} tabIndex={-1}>
              <Button variant="primary" className="w-full">
                Get Quotation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
