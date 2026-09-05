'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface ContentItem {
  id: string
  key: string
  value: string
  section: string
  label: string
  type: string
}

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      setContent(data.content || [])
    } catch (e) {
      console.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (id: string, value: string) => {
    setSaving(id)
    try {
      await fetch(`/api/admin/content/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      })
      setContent((prev) => prev.map((c) => (c.id === id ? { ...c, value } : c)))
    } catch (e) {
      console.error('Failed to save')
    } finally {
      setSaving(null)
    }
  }

  const sections = ['all', ...Array.from(new Set(content.map((c) => c.section)))]
  const filtered = filter === 'all' ? content : content.filter((c) => c.section === filter)

  if (loading) {
    return <div className="text-grey text-sm">Loading content...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-navy">Content Manager</h1>
        <p className="text-sm text-grey mt-1">
          Edit all website content and media assets from here. Changes appear on the live site immediately.
        </p>
      </div>

      {/* Section filter */}
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filter === s
                ? 'bg-blue-bright text-white'
                : 'bg-white border border-border text-[#475569] hover:border-blue-bright'
            }`}
          >
            {s === 'all' ? 'All Sections' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Content items */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isImage =
            item.type === 'image' ||
            item.key.toLowerCase().includes('image') ||
            item.key.toLowerCase().includes('logo') ||
            item.key.toLowerCase().includes('banner') ||
            item.key.toLowerCase().includes('photo')

          return (
            <Card key={item.id} className="p-5 bg-white border border-border">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-bright uppercase tracking-wider">
                      {item.section}
                    </span>
                    <h3 className="text-sm font-bold text-navy">{item.label}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-grey bg-[#F1F5F9] px-2 py-0.5 rounded">
                    {item.key}
                  </span>
                </div>

                {isImage ? (
                  <div className="pt-1">
                    <ImageUpload
                      value={item.value}
                      onChange={(url) => updateContent(item.id, url)}
                      folder="content"
                      helperText="Select or upload an image file from your device."
                    />
                  </div>
                ) : item.type === 'textarea' ? (
                  <textarea
                    defaultValue={item.value}
                    onBlur={(e) => updateContent(item.id, e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-navy focus:outline-none focus:border-blue-bright focus:ring-2 focus:ring-[#E6F0FF] min-h-[80px]"
                  />
                ) : (
                  <input
                    type="text"
                    defaultValue={item.value}
                    onBlur={(e) => updateContent(item.id, e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-navy focus:outline-none focus:border-blue-bright focus:ring-2 focus:ring-[#E6F0FF]"
                  />
                )}

                {saving === item.id && (
                  <span className="text-xs text-blue-bright font-semibold">Saving changes...</span>
                )}
              </div>
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <p className="text-sm text-grey text-center py-8">
            No content items found. Seed the database first.
          </p>
        )}
      </div>
    </div>
  )
}
