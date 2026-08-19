'use client'

import React, { useState, useEffect } from 'react'

interface NavLink {
  label: string
  href: string
}

export default function AdminNavigationPage() {
  const [links, setLinks] = useState<NavLink[]>([
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ])
  const [ctaLabel, setCtaLabel] = useState('Get a Quotation')
  const [ctaHref, setCtaHref] = useState('/quotation')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    async function loadNav() {
      try {
        const res = await fetch('/api/admin/navigation')
        if (res.ok) {
          const data = await res.json()
          if (data.nav) {
            setLinks(data.nav.links || [])
            setCtaLabel(data.nav.ctaLabel || 'Get a Quotation')
            setCtaHref(data.nav.ctaHref || '/quotation')
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadNav()
  }, [])

  const handleLinkChange = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...links]
    newLinks[index][field] = value
    setLinks(newLinks)
  }

  const handleAddLink = () => {
    setLinks([...links, { label: 'New Link', href: '/' }])
  }

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links, ctaLabel, ctaHref }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Navigation settings saved successfully!' })
      } else {
        setMessage({ type: 'error', text: 'Failed to save navigation settings.' })
      }
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-xs text-[#475569]">Loading Navigation Settings...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
          Header &amp; Navigation Customizer
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] mt-1">
          Manage header menu items, ordering, target routes, and primary CTA button.
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
        {/* Main Menu Links */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h2 className="text-base font-bold text-[#0B1220]">Main Header Links</h2>
            <button
              type="button"
              onClick={handleAddLink}
              className="text-xs font-bold text-[#1264FF] hover:bg-[#1264FF]/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-4">
            {links.map((link, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="w-1/3 px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => handleLinkChange(index, 'href', e.target.value)}
                  placeholder="URL Path (/services)"
                  className="w-1/2 px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#0B1220] border-b border-[#E2E8F0] pb-3">
            Primary Header CTA Button
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                CTA Label
              </label>
              <input
                type="text"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                CTA Destination URL
              </label>
              <input
                type="text"
                value={ctaHref}
                onChange={(e) => setCtaHref(e.target.value)}
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
            {saving ? 'Saving Navigation...' : 'Save Navigation Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
