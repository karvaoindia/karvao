'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname === '/') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      // Only force scroll to top if there is no explicit URL hash anchor (e.g. #industries)
      if (!window.location.hash) {
        window.scrollTo(0, 0)
      }
    }
  }, [pathname])

  return null
}
