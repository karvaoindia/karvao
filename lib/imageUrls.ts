const BRAVE_PROXY_HOST = 'imgs.search.brave.com'
const COMMON_IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|svg|bmp|ico|avif|tiff?)(\?.*)?$/i

function base64Decode(str: string): string | null {
  try {
    if (typeof atob === 'function') {
      return atob(str)
    }
  } catch {}
  try {
    return Buffer.from(str, 'base64').toString('utf-8')
  } catch {}
  return null
}

function safeBase64Pad(s: string): string {
  const pad = s.length % 4
  return pad === 0 ? s : s + '='.repeat(4 - pad)
}

function extractBraveOriginalUrl(proxyUrl: string): string | null {
  try {
    const url = new URL(proxyUrl)
    if (!url.hostname.endsWith(BRAVE_PROXY_HOST)) return null

    const segments = url.pathname.split('/').filter(Boolean)

    for (let i = segments.length - 1; i >= 0; i--) {
      const seg = segments[i]
      if (seg.length < 12) continue

      const decoded = base64Decode(safeBase64Pad(seg))
      if (!decoded) continue

      const lower = decoded.toLowerCase()
      if (
        lower.startsWith('http://') ||
        lower.startsWith('https://') ||
        lower.startsWith('data:')
      ) {
        if (lower.startsWith('http')) {
          try {
            const original = new URL(decoded)
            if (COMMON_IMAGE_EXTENSIONS.test(original.pathname)) {
              return original.href
            }
          } catch {}
        }
      }
    }

    for (let i = segments.length - 1; i >= 0; i--) {
      const seg = segments[i]
      if (seg.length < 12) continue

      const decoded = base64Decode(safeBase64Pad(seg))
      if (!decoded) continue

      const lower = decoded.toLowerCase()
      if (lower.startsWith('http://') || lower.startsWith('https://')) {
        try {
          new URL(decoded)
          return decoded
        } catch {}
      }
    }

    return null
  } catch {
    return null
  }
}

export function normalizeImageUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim()
  if (!trimmed) return null

  // Support local relative paths (e.g. /uploads/...)
  if (trimmed.startsWith('/')) {
    return trimmed
  }

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    return null
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
  if (url.protocol === 'http:') {
    url.protocol = 'https:'
  }

  if (url.hostname.endsWith(BRAVE_PROXY_HOST)) {
    const original = extractBraveOriginalUrl(url.href)
    if (original) {
      try {
        const o = new URL(original)
        if (o.protocol === 'http:') o.protocol = 'https:'
        return o.href
      } catch {
        return original
      }
    }
  }

  return url.href
}

export function validateImageUrl(rawUrl: string): {
  valid: boolean
  normalized: string | null
  error?: string
} {
  const trimmed = rawUrl.trim()
  if (!trimmed) return { valid: false, normalized: null, error: 'URL is required' }

  // Support local relative paths (e.g. /uploads/...)
  if (trimmed.startsWith('/')) {
    return { valid: true, normalized: trimmed }
  }

  let parsed: URL
  try {
    parsed = new URL(trimmed)
  } catch {
    return { valid: false, normalized: null, error: 'Invalid URL format' }
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { valid: false, normalized: null, error: 'Only HTTP/HTTPS URLs are allowed' }
  }

  const normalized = normalizeImageUrl(trimmed)
  if (!normalized) {
    return { valid: false, normalized: null, error: 'Could not normalize image URL' }
  }

  return { valid: true, normalized }
}
