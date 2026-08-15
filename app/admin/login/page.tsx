'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Invalid credentials')
      }

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-neutral-900 tracking-tight leading-none">
            KARVAO
          </span>
          <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.25em] leading-none mt-1">
            INDIA ADMIN
          </span>
        </div>

        <Card className="p-6 md:p-8 bg-white border border-neutral-150 shadow-md">
          <h1 className="text-xl font-bold text-neutral-900 mb-6 text-center">Sign in to Dashboard</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-100 rounded-lg text-xs font-semibold text-red-600" role="alert">
                {error}
              </div>
            )}

            <Input
              label="Username"
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="secondary" className="w-full mt-2" isLoading={isLoading}>
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
