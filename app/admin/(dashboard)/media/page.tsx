'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { compressImageFile } from '@/components/admin/ImageUpload'

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
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media')
      const data = await res.json()
      setMedia(data.media || [])
    } catch (e) {
      console.error('Failed to fetch media')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadError(null)
    setUploadProgress(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`)

    try {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImageFile(files[i])
        formData.append('files', compressed)
      }
      formData.append('folder', selectedFolder === 'all' ? 'uploads' : selectedFolder)

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload files')
      }

      await fetchMedia()
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err: any) {
      setUploadError(err.message || 'Error occurred while uploading files.')
    } finally {
      setUploading(false)
      setUploadProgress(null)
    }
  }

  const deleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file permanently?')) return
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMedia((prev) => prev.filter((item) => item.id !== id))
        if (previewItem?.id === id) setPreviewItem(null)
      } else {
        alert('Failed to delete file.')
      }
    } catch (e) {
      console.error('Delete failed', e)
    }
  }

  const copyUrlToClipboard = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const folders = ['all', ...Array.from(new Set(media.map((m) => m.folder || 'uploads')))]

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  if (loading) {
    return <div className="text-grey text-sm">Loading media library...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Media Library</h1>
          <p className="text-sm text-grey mt-1">
            Upload images from your device, manage media assets, and copy links.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/gif,image/avif"
            onChange={(e) => handleUploadFiles(e.target.files)}
            className="hidden"
          />
          <Button
            variant="primary"
            size="sm"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? 'Uploading...' : '+ Upload File(s)'}
          </Button>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUploadFiles(e.dataTransfer.files)
          }
        }}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-white ${
          isDragging
            ? 'border-[#1264FF] bg-[#1264FF]/5 scale-[1.01]'
            : 'border-[#CBD5E1] hover:border-[#1264FF]/60 hover:bg-[#F8FAFC]'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-[#1264FF]/10 text-[#1264FF] flex items-center justify-center mb-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-navy">
            {uploadProgress || 'Drag & drop image files here, or click to browse'}
          </h3>
          <p className="text-xs text-grey">
            Supports PNG, JPG, JPEG, WEBP, SVG, GIF up to 10MB each. Multiple files supported.
          </p>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-4 rounded-xl text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center justify-between">
          <span>{uploadError}</span>
          <button
            onClick={() => setUploadError(null)}
            className="text-red-700 hover:text-red-900 text-sm font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-border">
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media files by name..."
            className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs text-navy focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-grey mr-1">Folder:</span>
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedFolder === folder
                  ? 'bg-blue-bright text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {folder.charAt(0).toUpperCase() + folder.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white border border-border rounded-xl overflow-hidden hover:border-blue-bright/50 hover:shadow-md transition-all flex flex-col"
          >
            {/* Thumbnail */}
            <div
              onClick={() => setPreviewItem(item)}
              className="aspect-square bg-blue-surface flex items-center justify-center cursor-pointer overflow-hidden relative"
            >
              {item.mimeType.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.altText || item.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <svg
                  className="w-8 h-8 text-blue-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="text-[11px] font-bold text-white bg-black/60 px-2 py-1 rounded-md backdrop-blur-xs">
                  View
                </span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="p-2.5 flex-1 flex flex-col justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-navy truncate" title={item.filename}>
                  {item.filename}
                </p>
                <div className="flex items-center justify-between text-[10px] text-grey mt-0.5">
                  <span>{formatSize(item.size)}</span>
                  <span className="font-mono uppercase text-[9px] bg-slate-100 px-1 py-0.2 rounded">
                    {item.folder}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => copyUrlToClipboard(item)}
                  className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded transition-colors text-center ${
                    copiedId === item.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#F1F5F9] hover:bg-blue-bright hover:text-white text-[#475569]'
                  }`}
                >
                  {copiedId === item.id ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  type="button"
                  onClick={() => deleteMedia(item.id)}
                  title="Delete image"
                  className="w-6 h-6 rounded bg-red-50 hover:bg-red text-red hover:text-white transition-colors text-xs font-bold flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <Card className="p-12 text-center bg-white border border-border">
          <p className="text-sm text-grey">
            {searchQuery
              ? 'No media files matching your search.'
              : 'No media files uploaded yet. Drag and drop images above to upload.'}
          </p>
        </Card>
      )}

      {/* Full Preview Modal */}
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-border animate-in fade-in zoom-in-95"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-navy truncate text-sm max-w-[80%]">
                {previewItem.filename}
              </h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-navy font-bold flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            <div className="p-6 bg-slate-900 flex items-center justify-center overflow-auto max-h-[60vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewItem.url}
                alt={previewItem.filename}
                className="max-w-full max-h-[55vh] object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-white border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5 text-grey text-left w-full sm:w-auto">
                <p>
                  Size: <strong className="text-navy">{formatSize(previewItem.size)}</strong>
                </p>
                <p>
                  Path: <span className="font-mono text-navy select-all">{previewItem.url}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => copyUrlToClipboard(previewItem)}
                >
                  {copiedId === previewItem.id ? 'Copied URL!' : 'Copy URL'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMedia(previewItem.id)}
                  className="text-red hover:bg-red/10 border-red/30"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
