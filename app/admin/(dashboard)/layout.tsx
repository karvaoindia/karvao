import React from 'react'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { LogoutButton } from '@/components/admin/LogoutButton'
import Link from 'next/link'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuth = await isAdminAuthenticated()

  if (!isAuth) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex-shrink-0 flex flex-col justify-between p-6">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight leading-none text-white">KARVAO</span>
            <span className="text-[7px] font-bold text-blue-light uppercase tracking-[0.25em] leading-none mt-0.5">INDIA ADMIN</span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-4 pt-2">CRM</span>
            <Link href="/admin" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Overview
            </Link>
            <Link href="/admin/leads" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Leads
            </Link>
            <Link href="/admin/quotations" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Quotations
            </Link>
            <Link href="/admin/assessments" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Assessments
            </Link>

            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-4 pt-4">CMS</span>
            <Link href="/admin/content" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Content
            </Link>
            <Link href="/admin/projects" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Projects
            </Link>
            <Link href="/admin/testimonials" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Testimonials
            </Link>
            <Link href="/admin/score-config" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Score Config
            </Link>
            <Link href="/admin/media" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F] transition-colors">
              Media
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer with Logout */}
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-y-auto h-screen">
        <header className="bg-white border-b border-border py-4 px-8 flex items-center justify-between">
          <h2 className="text-sm font-bold text-grey uppercase tracking-wider">Control Panel</h2>
          <div className="flex items-center gap-2 text-sm text-[#475569] font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-green animate-pulse" />
            <span>Logged in as Admin</span>
          </div>
        </header>
        <main className="p-8 flex-grow">
          {children}
        </main>
      </div>
    </div>
  )
}
