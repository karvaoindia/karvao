import { describe, it, expect } from 'vitest'
import { normalizeImageUrl, validateImageUrl } from '../lib/imageUrls'

describe('Image URLs utility', () => {
  it('normalizes and validates relative upload paths', () => {
    expect(normalizeImageUrl('/uploads/project-hero.png')).toBe('/uploads/project-hero.png')
    expect(validateImageUrl('/uploads/testimonial-avatar.webp')).toEqual({
      valid: true,
      normalized: '/uploads/testimonial-avatar.webp',
    })
  })

  it('normalizes external https URLs', () => {
    expect(normalizeImageUrl('https://example.com/photo.jpg')).toBe('https://example.com/photo.jpg')
    expect(validateImageUrl('https://example.com/photo.jpg')).toEqual({
      valid: true,
      normalized: 'https://example.com/photo.jpg',
    })
  })

  it('rejects invalid or empty URLs', () => {
    expect(normalizeImageUrl('')).toBeNull()
    expect(validateImageUrl('')).toEqual({
      valid: false,
      normalized: null,
      error: 'URL is required',
    })
    expect(validateImageUrl('invalid-url-without-slash')).toEqual({
      valid: false,
      normalized: null,
      error: 'Invalid URL format',
    })
  })
})
