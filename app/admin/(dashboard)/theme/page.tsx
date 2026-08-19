'use client'

import React, { useState, useEffect } from 'react'

export default function AdminThemePage() {
  const [theme, setTheme] = useState({
    primaryDark: '#0B1220',
    primaryBlue: '#1264FF',
    softBlue: '#EAF2FF',
    purpleAccent: '#BFA7FF',
    backgroundColor: '#FAFBFF',
    glassOpacity: '0.80',
    animationIntensity: 'SUBTLE',
    headingFont: 'Inter, sans-serif',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    async function loadTheme() {
      try {
        const res = await fetch('/api/admin/theme')
        if (res.ok) {
          const data = await res.json()
          if (data.theme) setTheme(data.theme)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadTheme()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Theme & Visual settings saved successfully! Changes are live across the website.' })
      } else {
        setMessage({ type: 'error', text: 'Failed to save theme settings.' })
      }
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-xs text-[#475569]">Loading Theme Editor...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
          Visual Theme &amp; Design System Editor
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] mt-1">
          Customize KARVAO brand colors, glassmorphism opacity, typography, and animation intensity.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold border ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand Colors Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#0B1220] border-b border-[#E2E8F0] pb-3">
            Brand Palette &amp; Colors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1.5">
                Primary Dark (Navy)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.primaryDark}
                  onChange={(e) => setTheme({ ...theme, primaryDark: e.target.value })}
                  className="w-10 h-10 rounded border border-[#CBD5E1] cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryDark}
                  onChange={(e) => setTheme({ ...theme, primaryDark: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-mono w-32 focus:ring-2 focus:ring-[#1264FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1.5">
                Primary Electric Blue
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.primaryBlue}
                  onChange={(e) => setTheme({ ...theme, primaryBlue: e.target.value })}
                  className="w-10 h-10 rounded border border-[#CBD5E1] cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryBlue}
                  onChange={(e) => setTheme({ ...theme, primaryBlue: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-mono w-32 focus:ring-2 focus:ring-[#1264FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1.5">
                Soft Ambient Blue
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.softBlue}
                  onChange={(e) => setTheme({ ...theme, softBlue: e.target.value })}
                  className="w-10 h-10 rounded border border-[#CBD5E1] cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.softBlue}
                  onChange={(e) => setTheme({ ...theme, softBlue: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-mono w-32 focus:ring-2 focus:ring-[#1264FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1.5">
                Light Purple Accent
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.purpleAccent}
                  onChange={(e) => setTheme({ ...theme, purpleAccent: e.target.value })}
                  className="w-10 h-10 rounded border border-[#CBD5E1] cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.purpleAccent}
                  onChange={(e) => setTheme({ ...theme, purpleAccent: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-mono w-32 focus:ring-2 focus:ring-[#1264FF]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Glassmorphism & Animations */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#0B1220] border-b border-[#E2E8F0] pb-3">
            Glassmorphism &amp; Animation Control
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Glass Surface Opacity ({Math.round(parseFloat(theme.glassOpacity || '0.8') * 100)}%)
              </label>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={theme.glassOpacity}
                onChange={(e) => setTheme({ ...theme, glassOpacity: e.target.value })}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#1264FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Animation Intensity
              </label>
              <select
                value={theme.animationIntensity}
                onChange={(e) => setTheme({ ...theme, animationIntensity: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              >
                <option value="OFF">OFF (Static)</option>
                <option value="SUBTLE">SUBTLE (Recommended)</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="STRONG">STRONG</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3">
          <h3 className="text-xs font-bold uppercase text-[#475569]">Live Design Token Preview</h3>
          <div
            className="p-6 rounded-xl border flex items-center justify-between transition-all"
            style={{
              backgroundColor: theme.primaryDark,
              borderColor: 'rgba(255,255,255,0.15)',
            }}
          >
            <div>
              <span
                className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full block w-max mb-1"
                style={{ backgroundColor: `${theme.primaryBlue}20`, color: theme.primaryBlue }}
              >
                THEME ENGINE
              </span>
              <h4 className="text-lg font-bold text-white">KARVAO India Design Token</h4>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-full text-xs font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: theme.primaryBlue }}
            >
              Action Button
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#1264FF] hover:bg-[#0F53D6] text-white font-extrabold text-xs sm:text-sm h-11 px-8 rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {saving ? 'Saving Theme...' : 'Save Theme & Design System'}
          </button>
        </div>
      </form>
    </div>
  )
}
