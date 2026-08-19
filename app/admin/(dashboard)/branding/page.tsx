'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function AdminBrandingPage() {
  const [currentLogo, setCurrentLogo] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchLogo()
  }, [])

  const fetchLogo = async () => {
    try {
      const res = await fetch('/api/admin/branding/logo')
      const data = await res.json()
      setCurrentLogo(data.logoUrl || null)
    } catch (e) {
      console.error('Failed to load logo')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']
    if (!allowed.includes(file.type)) {
      setStatusMessage({ type: 'error', text: 'Invalid file format. Only PNG, JPG, WEBP, and SVG are supported.' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({ type: 'error', text: 'File size exceeds maximum limit of 5MB.' })
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setStatusMessage(null)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setStatusMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const res = await fetch('/api/admin/branding/logo', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload logo')
      }

      setCurrentLogo(data.logoUrl)
      setSelectedFile(null)
      setPreviewUrl(null)
      if (fileInputRef.current) fileInputRef.current.value = ''

      setStatusMessage({ type: 'success', text: 'Logo updated successfully! Changes are live across the website.' })
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || 'An error occurred while saving the logo.' })
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to remove the custom logo? The website will revert to the default text logo.')) {
      return
    }

    setRemoving(true)
    setStatusMessage(null)

    try {
      const res = await fetch('/api/admin/branding/logo', {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to remove logo')
      }

      setCurrentLogo(null)
      setSelectedFile(null)
      setPreviewUrl(null)

      setStatusMessage({ type: 'success', text: 'Custom logo removed. Default text logo restored.' })
    } catch (e: any) {
      setStatusMessage({ type: 'error', text: e.message || 'Failed to remove logo.' })
    } finally {
      setRemoving(false)
    }
  }

  if (loading) {
    return <div className="text-grey text-sm">Loading branding configuration...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-navy">Branding &amp; Logo Settings</h1>
        <p className="text-sm text-grey mt-1">
          Manage the global website logo. Uploading a custom logo will automatically update the header and site brand elements.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-xs text-grey hover:text-navy font-bold ml-4"
          >
            &times;
          </button>
        </div>
      )}

      {/* Website Logo Section */}
      <Card className="p-6 bg-white border border-border space-y-6">
        <div className="border-b border-border pb-4">
          <h2 className="text-lg font-bold text-navy">Website Logo</h2>
          <p className="text-xs text-grey">Supported formats: PNG, JPG, WEBP, SVG (Max 5MB)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Current Logo Preview */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-grey uppercase tracking-wider block">Current Logo</span>
            <div className="w-full h-36 rounded-2xl border-2 border-dashed border-border bg-[#FAFAF8] flex items-center justify-center p-4 relative overflow-hidden">
              {currentLogo ? (
                <img
                  src={currentLogo}
                  alt="Website Logo"
                  className="max-h-24 max-w-full object-contain"
                />
              ) : (
                <div className="text-center flex flex-col items-center gap-1">
                  <img
                    src="/karvao-logo.png"
                    alt="Karvao India Default Logo"
                    className="max-h-20 max-w-full object-contain"
                  />
                  <span className="text-[9px] font-bold text-grey uppercase tracking-widest block">
                    DEFAULT OFFICIAL LOGO
                  </span>
                </div>
              )}
            </div>

            {currentLogo && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={removing}
                className="text-xs text-red border-red/30 hover:bg-red/5 font-semibold"
              >
                {removing ? 'Removing...' : 'Remove Custom Logo'}
              </Button>
            )}
          </div>

          {/* New Logo Upload / Preview */}
          <div className="space-y-4">
            <span className="text-xs font-extrabold text-grey uppercase tracking-wider block">Upload New Logo</span>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload-input"
            />

            <label
              htmlFor="logo-upload-input"
              className="w-full h-36 rounded-2xl border-2 border-dashed border-blue-bright/40 hover:border-blue-bright bg-blue-surface/40 hover:bg-blue-surface/80 transition-all cursor-pointer flex flex-col items-center justify-center p-4 text-center group"
            >
              {previewUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={previewUrl}
                    alt="New Logo Preview"
                    className="max-h-20 max-w-full object-contain"
                  />
                  <span className="text-xs font-bold text-blue-bright">Click to choose a different file</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-blue-bright group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-xs font-bold text-navy">Choose file or drag &amp; drop</span>
                  <span className="text-[10px] text-grey">PNG, JPG, WEBP, SVG up to 5MB</span>
                </div>
              )}
            </label>

            {selectedFile && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-navy truncate max-w-[200px]">
                  {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="font-bold gap-2 text-xs"
                >
                  {uploading ? 'Uploading...' : 'Save Logo'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
