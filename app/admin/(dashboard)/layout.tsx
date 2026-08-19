import React from 'react'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* Responsive Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-y-auto h-auto lg:h-screen min-w-0">
        <header className="bg-white border-b border-border py-3.5 px-4 sm:px-6 md:px-8 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-grey uppercase tracking-wider">
            Control Panel
          </h2>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Logged in as Admin</span>
            <span className="sm:hidden">Admin</span>
          </div>
        </header>

        <main className="p-4 sm:p-6 md:p-8 flex-grow overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
