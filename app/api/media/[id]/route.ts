import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params

    if (!id) {
      return new Response('Missing media ID', { status: 400 })
    }

    const media = await prisma.media.findUnique({
      where: { id },
    })

    if (!media) {
      return new Response('Media not found', { status: 404 })
    }

    // 1. If stored as Base64 Data URL (serverless persistent fallback for Vercel)
    if (media.url && media.url.startsWith('data:')) {
      const commaIndex = media.url.indexOf(',')
      if (commaIndex !== -1) {
        const header = media.url.substring(0, commaIndex)
        const base64Content = media.url.substring(commaIndex + 1)
        const mimeType = header.match(/data:([^;]+);/)?.[1] || media.mimeType || 'image/jpeg'
        const buffer = Buffer.from(base64Content, 'base64')

        return new Response(buffer, {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Length': buffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      }
    }

    // 2. If stored as a local /uploads/ file path
    if (media.url && media.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', media.url)
      if (existsSync(filePath)) {
        const buffer = await readFile(filePath)
        return new Response(buffer, {
          status: 200,
          headers: {
            'Content-Type': media.mimeType || 'image/jpeg',
            'Content-Length': buffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      }
    }

    // 3. If external HTTP/HTTPS URL
    if (media.url && (media.url.startsWith('http://') || media.url.startsWith('https://'))) {
      return NextResponse.redirect(media.url, { status: 302 })
    }

    return new Response('Media file unavailable', { status: 404 })
  } catch (err: any) {
    console.error('Error serving media file:', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
