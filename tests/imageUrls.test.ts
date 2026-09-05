import { describe, it, expect } from 'vitest'
import { normalizeImageUrl, validateImageUrl } from '../lib/imageUrls'

describe('Image URLs utility', () => {
  it('normalizes and validates relative upload paths and data URLs', () => {
    expect(normalizeImageUrl('/uploads/project-hero.png')).toBe('/uploads/project-hero.png')
    expect(normalizeImageUrl('/api/media/abc-123')).toBe('/api/media/abc-123')
    expect(normalizeImageUrl('data:image/png;base64,iVBORw0KGgo=')).toBe('data:image/png;base64,iVBORw0KGgo=')
    expect(validateImageUrl('/uploads/testimonial-avatar.webp')).toEqual({
      valid: true,
      normalized: '/uploads/testimonial-avatar.webp',
    })
    expect(validateImageUrl('/api/media/abc-123')).toEqual({
      valid: true,
      normalized: '/api/media/abc-123',
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
