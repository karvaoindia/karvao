'use client'

import React, { useState, useEffect } from 'react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'KARVAO India',
    tagline: 'Digital Growth Partner for Businesses',
    contactEmail: 'contact@karvao.in',
    contactPhone: '+91 98765 43210',
    whatsappNumber: '+91 98765 43210',
    address: 'Mumbai, India',
    siteTitle: 'KARVAO India | Digital Growth Partner',
    metaDescription: 'Complete digital growth engines uniting websites, performance marketing, sales CRM, WhatsApp automation and business analytics.',
    analyticsId: '',
    metaPixelId: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings')
        if (res.ok) {
          const data = await res.json()
          if (data.settings) setSettings(data.settings)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Global settings and SEO metadata saved successfully!' })
      } else {
        setMessage({ type: 'error', text: 'Failed to save global settings.' })
      }
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-xs text-[#475569]">Loading Global Settings...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
          Global Business &amp; SEO Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] mt-1">
          Configure contact information, company metadata, global SEO title, meta descriptions, and analytics pixels.
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
        {/* Business Information */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#0B1220] border-b border-[#E2E8F0] pb-3">
            Company Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Metadata */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#0B1220] border-b border-[#E2E8F0] pb-3">
            Global Search Engine Optimization (SEO)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Default Site Title
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Tracking */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#0B1220] border-b border-[#E2E8F0] pb-3">
            Analytics &amp; Pixels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Google Analytics Measurement ID (G-XXXXXXX)
              </label>
              <input
                type="text"
                value={settings.analyticsId}
                onChange={(e) => setSettings({ ...settings, analyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Meta Pixel ID
              </label>
              <input
                type="text"
                value={settings.metaPixelId}
                onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
                placeholder="1234567890"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#1264FF] hover:bg-[#0F53D6] text-white font-extrabold text-xs sm:text-sm h-11 px-8 rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {saving ? 'Saving Settings...' : 'Save Global Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
