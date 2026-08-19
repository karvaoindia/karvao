'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BrandLogo } from '@/components/ui/BrandLogo'

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAFAF8]/80 backdrop-blur-xl border-b border-[#0A0A0A]/5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
          : 'bg-transparent border-b border-transparent py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Left: KARVAO Brand */}
        <BrandLogo />

        {/* Center/Right: Services, Solutions, Work, About, Careers */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Main Navigation"
        >
          <Link
            href="/services"
            className="text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0A0A0A] transition-colors px-3.5 py-2 rounded-full hover:bg-[#0A0A0A]/[0.04]"
          >
            Services
          </Link>
          <Link
            href="/solutions"
            className="text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0A0A0A] transition-colors px-3.5 py-2 rounded-full hover:bg-[#0A0A0A]/[0.04]"
          >
            Solutions
          </Link>
          <Link
            href="/work"
            className="text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0A0A0A] transition-colors px-3.5 py-2 rounded-full hover:bg-[#0A0A0A]/[0.04]"
          >
            Work
          </Link>
          <Link
            href="/about"
            className="text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0A0A0A] transition-colors px-3.5 py-2 rounded-full hover:bg-[#0A0A0A]/[0.04]"
          >
            About
          </Link>
          <Link
            href="/careers"
            className="text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0A0A0A] transition-colors px-3.5 py-2 rounded-full hover:bg-[#0A0A0A]/[0.04]"
          >
            Careers
          </Link>
        </nav>

        {/* Right CTA: Get a Quotation → */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/quotation"
            className="group inline-flex items-center justify-center gap-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white text-xs sm:text-sm font-semibold h-10 px-5 rounded-full shadow-[0_2px_10px_rgba(10,10,10,0.1)] hover:shadow-[0_4px_16px_rgba(10,10,10,0.2)] transition-all duration-300 active:scale-[0.98]"
          >
            <span>Get a Quotation</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-1 text-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5367E8] rounded-xl hover:bg-[#0A0A0A]/[0.04] transition-colors"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-[#FAFAF8]/95 backdrop-blur-xl border-b border-[#0A0A0A]/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-[#0A0A0A] hover:text-[#5367E8] py-2.5 px-3 rounded-lg hover:bg-[#0A0A0A]/[0.04] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/solutions"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-[#0A0A0A] hover:text-[#5367E8] py-2.5 px-3 rounded-lg hover:bg-[#0A0A0A]/[0.04] transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="/work"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-[#0A0A0A] hover:text-[#5367E8] py-2.5 px-3 rounded-lg hover:bg-[#0A0A0A]/[0.04] transition-colors"
            >
              Work
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-[#0A0A0A] hover:text-[#5367E8] py-2.5 px-3 rounded-lg hover:bg-[#0A0A0A]/[0.04] transition-colors"
            >
              About
            </Link>
            <Link
              href="/careers"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-[#0A0A0A] hover:text-[#5367E8] py-2.5 px-3 rounded-lg hover:bg-[#0A0A0A]/[0.04] transition-colors"
            >
              Careers
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#0A0A0A]/10">
            <Link
              href="/quotation"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] text-white font-semibold py-3 px-6 rounded-full shadow-sm text-sm"
            >
              <span>Get a Quotation</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
