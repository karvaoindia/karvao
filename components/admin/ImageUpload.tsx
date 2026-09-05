'use client'

import React, { useState, useRef, useEffect } from 'react'

interface MediaItem {
  id: string
  filename: string
  url: string
  mimeType: string
  size: number
  folder: string
  createdAt: string
}

interface ImageUploadProps {
  label?: string
  value?: string | null
  onChange: (url: string) => void
  folder?: string
  aspectRatio?: 'video' | 'avatar' | 'square' | 'wide' | 'auto'
  helperText?: string
  className?: string
  required?: boolean
}

// Client-side image compression helper to ensure fast uploads on Vercel
export async function compressImageFile(file: File, maxDimension = 1920, quality = 0.85): Promise<File> {
  if (typeof window === 'undefined') return file
  // Keep SVG vectors and GIF animations untouched
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        let { width, height } = img
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/webp'
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const ext = outputType === 'image/webp' ? '.webp' : '.png'
              const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, '') + ext, {
                type: outputType,
              })
              resolve(newFile)
            } else {
              resolve(file)
            }
          },
          outputType,
          quality
        )
      }
      img.onerror = () => resolve(file)
    }
    reader.onerror = () => resolve(file)
  })
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  folder = 'uploads',
  aspectRatio = 'auto',
  helperText,
  className = '',
  required = false,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'url'>('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState(value || '')
  
  // Library Modal / Drawer state
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [libraryItems, setLibraryItems] = useState<MediaItem[]>([])
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const [searchLibrary, setSearchLibrary] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUrlInput(value || '')
  }, [value])

  const fetchLibrary = async () => {
    setLoadingLibrary(true)
    try {
      const res = await fetch('/api/admin/media')
      if (res.ok) {
        const data = await res.json()
        setLibraryItems(data.media || [])
      }
    } catch (err) {
      console.error('Failed to load library media', err)
    } finally {
      setLoadingLibrary(false)
    }
  }

  const handleOpenLibrary = () => {
    setLibraryOpen(true)
    fetchLibrary()
  }

  const handleFileSelection = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]

    // Validate type
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'image/avif',
    ]
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image (PNG, JPG, WEBP, SVG, GIF, AVIF).')
      return
    }

    setUploadError(null)
    setUploading(true)

    try {
      // Compress and optimize image to ensure instant upload and compliance with serverless limits
      const processedFile = await compressImageFile(file)

      const formData = new FormData()
      formData.append('file', processedFile)
      formData.append('folder', folder)

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      onChange(data.url)
      setUrlInput(data.url)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading image.')
    } finally {
      setUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files)
    }
  }

  const handleRemove = () => {
    onChange('')
    setUrlInput('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
    }
  }

  // Aspect ratio classes
  const aspectClasses = {
    avatar: 'w-24 h-24 rounded-full mx-auto',
    video: 'w-full aspect-video rounded-xl',
    square: 'w-full max-w-[240px] aspect-square rounded-xl',
    wide: 'w-full aspect-[21/9] rounded-xl',
    auto: 'w-full max-h-56 rounded-xl',
  }[aspectRatio]

  const filteredLibrary = libraryItems.filter((item) =>
    item.filename.toLowerCase().includes(searchLibrary.toLowerCase())
  )

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-navy flex items-center gap-1">
            {label}
            {required && <span className="text-red font-bold">*</span>}
          </label>
          {value && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              ✓ Image Selected
            </span>
          )}
        </div>
      )}

      {/* Existing Value Preview */}
      {value ? (
        <div className="relative p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col sm:flex-row items-center gap-4">
          <div
            className={`relative overflow-hidden bg-white border border-[#CBD5E1] shadow-xs flex items-center justify-center shrink-0 ${aspectClasses}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.currentTarget as HTMLElement).style.display = 'none'
              }}
            />
          </div>

          <div className="flex-1 min-w-0 w-full">
            <p className="text-xs font-mono text-[#0B1220] truncate bg-white px-2.5 py-1.5 rounded-lg border border-[#E2E8F0]">
              {value}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-[#1264FF] hover:bg-[#1264FF]/10 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Replace Image
              </button>
              <button
                type="button"
                onClick={handleOpenLibrary}
                className="text-xs font-bold text-[#475569] hover:bg-[#F1F5F9] px-3 py-1.5 rounded-lg border border-[#CBD5E1] transition-colors"
              >
                Change from Library
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Upload / Input Box */
        <div className="space-y-2">
          {/* Method Tabs */}
          <div className="flex items-center gap-1 border-b border-[#E2E8F0] pb-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'upload'
                  ? 'bg-[#1264FF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0B1220] hover:bg-[#F1F5F9]'
              }`}
            >
              Upload from Device
            </button>
            <button
              type="button"
              onClick={handleOpenLibrary}
              className="px-3 py-1 rounded-md text-[#475569] hover:text-[#0B1220] hover:bg-[#F1F5F9] transition-colors inline-flex items-center gap-1"
            >
              <span>From Media Library</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'url'
                  ? 'bg-[#1264FF] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0B1220] hover:bg-[#F1F5F9]'
              }`}
            >
              Paste Image URL
            </button>
          </div>

          {/* TAB 1: Drag & Drop / Browse */}
          {activeTab === 'upload' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#1264FF] bg-[#1264FF]/5 scale-[1.01]'
                  : 'border-[#CBD5E1] hover:border-[#1264FF]/60 hover:bg-[#F8FAFC]'
              } ${uploading ? 'pointer-events-none opacity-70' : ''}`}
            >
              {uploading ? (
                <div className="flex flex-col items-center justify-center py-3 gap-2">
                  <svg
                    className="animate-spin h-7 w-7 text-[#1264FF]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <p className="text-xs font-bold text-[#0B1220]">Uploading image...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-10 h-10 rounded-full bg-[#1264FF]/10 text-[#1264FF] flex items-center justify-center mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-[#0B1220]">
                    Drag &amp; drop your image here, or{' '}
                    <span className="text-[#1264FF] underline">browse</span>
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    PNG, JPG, WEBP, SVG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Paste URL */}
          {activeTab === 'url' && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleApplyUrl()
                  }
                }}
                placeholder="https://example.com/image.jpg or /uploads/image.png"
                className="flex-1 px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="bg-[#1264FF] hover:bg-[#0F53D6] text-white text-xs font-extrabold px-4 py-2 rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/gif,image/avif"
        onChange={(e) => handleFileSelection(e.target.files)}
        className="hidden"
      />

      {/* Error Message */}
      {uploadError && (
        <p className="text-xs font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          {uploadError}
        </p>
      )}

      {/* Helper text */}
      {helperText && <p className="text-[11px] text-[#64748B]">{helperText}</p>}

      {/* ==================== MEDIA LIBRARY MODAL ==================== */}
      {libraryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B1220]">Choose from Media Library</h3>
                <p className="text-xs text-[#64748B]">Select an existing image from your server.</p>
              </div>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] flex items-center justify-center text-sm font-bold transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <input
                type="text"
                value={searchLibrary}
                onChange={(e) => setSearchLibrary(e.target.value)}
                placeholder="Search images by filename..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-xs focus:outline-none focus:ring-2 focus:ring-[#1264FF] bg-white"
              />
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              {loadingLibrary ? (
                <div className="py-12 text-center text-xs text-[#64748B]">Loading media...</div>
              ) : filteredLibrary.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#64748B]">
                  No images found. Upload one from your computer first.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {filteredLibrary.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onChange(item.url)
                        setUrlInput(item.url)
                        setLibraryOpen(false)
                      }}
                      className={`group relative aspect-square rounded-xl overflow-hidden border transition-all text-left bg-[#F8FAFC] flex flex-col items-center justify-center ${
                        value === item.url
                          ? 'border-[#1264FF] ring-2 ring-[#1264FF]'
                          : 'border-[#CBD5E1] hover:border-[#1264FF]/60 hover:shadow-md'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-[10px] text-white truncate font-medium">
                          {item.filename}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex justify-end">
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="px-4 py-2 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg text-xs font-bold text-[#475569] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
