'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { LogoutButton } from './LogoutButton'

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navContent = (
    <div className="flex flex-col justify-between h-full p-6">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/karvao-logo-transparent.png"
              alt="Karvao India"
              className="h-7 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[7px] font-bold text-[#6575F2] uppercase tracking-[0.2em] px-1 py-0.5 rounded bg-white/10">
              ADMIN
            </span>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-white/70 hover:text-white"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider px-3 pt-2">
            CRM &amp; Operations
          </span>
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors flex items-center justify-between"
          >
            <span>Overview</span>
          </Link>
          <Link
            href="/admin/leads"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors flex items-center justify-between"
          >
            <span>Leads Management</span>
          </Link>
          <Link
            href="/admin/quotations"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors flex items-center justify-between"
          >
            <span>Quotations</span>
          </Link>
          <Link
            href="/admin/assessments"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors flex items-center justify-between"
          >
            <span>Business Score Leads</span>
          </Link>

          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider px-3 pt-4">
            Content CMS
          </span>
          <Link
            href="/admin/content"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Homepage &amp; Text
          </Link>
          <Link
            href="/admin/services"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Services &amp; Offerings
          </Link>
          <Link
            href="/admin/projects"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Work &amp; Case Studies
          </Link>
          <Link
            href="/admin/careers"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Careers &amp; Openings
          </Link>
          <Link
            href="/admin/testimonials"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Client Testimonials
          </Link>

          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider px-3 pt-4">
            Design &amp; Storefront
          </span>
          <Link
            href="/admin/theme"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Visual Theme Customizer
          </Link>
          <Link
            href="/admin/navigation"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Header &amp; Navigation
          </Link>
          <Link
            href="/admin/branding"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Logo &amp; Brand Assets
          </Link>
          <Link
            href="/admin/media"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Media Library
          </Link>

          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider px-3 pt-4">
            Settings
          </span>
          <Link
            href="/admin/score-config"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Score Quiz Config
          </Link>
          <Link
            href="/admin/settings"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors"
          >
            Global Site &amp; SEO
          </Link>
        </nav>
      </div>

      <LogoutButton />
    </div>
  )

  return (
    <>
      {/* Mobile Bar Toggle */}
      <div className="lg:hidden bg-[#0A0F1D] text-white py-3 px-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <img
            src="/karvao-logo-transparent.png"
            alt="Karvao India"
            className="h-6 w-auto object-contain brightness-0 invert"
          />
          <span className="text-[8px] font-bold text-[#6575F2] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/10">
            ADMIN
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle admin menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0A0F1D] text-white flex-shrink-0 flex-col justify-between">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[80vw] bg-[#0A0F1D] text-white flex-col flex h-full z-10 shadow-2xl">
            {navContent}
          </aside>
        </div>
      )}
    </>
  )
}
