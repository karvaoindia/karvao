'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface MediaItem {
  id: string
  filename: string
  url: string
  altText: string | null
  mimeType: string
  size: number
  folder: string
  createdAt: string
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchMedia() }, [])

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media')
      const data = await res.json()
      setMedia(data.media || [])
    } catch (e) { console.error('Failed') } finally { setLoading(false) }
  }

  const deleteMedia = async (id: string) => {
    if (!confirm('Delete this file?')) return
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    fetchMedia()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  if (loading) return <div className="text-grey text-sm">Loading media...</div>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Media Library</h1>
          <p className="text-sm text-grey mt-1">Upload and manage images and files for your website.</p>
        </div>
        <Button variant="primary" size="sm">
          + Upload File
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map(item => (
          <div key={item.id} className="group relative bg-white border border-border rounded-xl overflow-hidden hover:border-blue-bright/30 transition-all">
            <div className="aspect-square bg-blue-surface flex items-center justify-center">
              {item.mimeType.startsWith('image/') ? (
                <img src={item.url} alt={item.altText || item.filename} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            <div className="p-2">
              <p className="text-[10px] font-semibold text-navy truncate">{item.filename}</p>
              <p className="text-[10px] text-grey">{formatSize(item.size)}</p>
            </div>
            <button
              onClick={() => deleteMedia(item.id)}
              className="absolute top-2 right-2 w-6 h-6 bg-red text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              x
            </button>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <p className="text-sm text-grey text-center py-8">No media files uploaded yet.</p>
      )}
    </div>
  )
}
