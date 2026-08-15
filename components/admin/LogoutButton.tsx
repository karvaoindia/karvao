'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const LogoutButton: React.FC = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-neutral-800 transition-colors"
    >
      Sign Out
    </button>
  )
}
