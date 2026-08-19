'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface BrandLogoProps {
  className?: string
  textClassName?: string
  subtextClassName?: string
  light?: boolean
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  light = false,
}) => {
  const [logoUrl, setLogoUrl] = useState<string>('/karvao-logo-transparent.png')

  useEffect(() => {
    let isMounted = true
    async function fetchLogo() {
      try {
        const res = await fetch('/api/branding/logo')
        if (res.ok) {
          const data = await res.json()
          if (isMounted && data.logoUrl) {
            setLogoUrl(data.logoUrl)
          }
        }
      } catch {
        // Keep default logo
      }
    }
    fetchLogo()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Link
      href="/"
      className={`logo-wrapper inline-flex items-center justify-start h-[28px] sm:h-[32px] md:h-[34px] max-h-[36px] w-auto shrink-0 focus-visible:ring-2 focus-visible:ring-[#1264FF] rounded-lg transition-all hover:opacity-90 ${className}`}
      aria-label="Karvao India Homepage"
    >
      <img
        src={logoUrl}
        alt="KARVAO INDIA"
        decoding="async"
        style={{
          maxHeight: '36px',
          objectFit: 'contain',
          display: 'block'
        }}
        className={`h-[28px] sm:h-[32px] md:h-[34px] max-h-[36px] max-w-[145px] sm:max-w-[170px] md:max-w-[200px] w-auto object-contain shrink-0 transition-all ${
          light ? 'brightness-0 invert' : ''
        }`}
      />
    </Link>
  )
}
