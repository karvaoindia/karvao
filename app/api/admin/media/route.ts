import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'image/avif',
]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // Format data URLs into lightweight /api/media/${id} links for client consumption
  const formattedMedia = media.map((item) => ({
    id: item.id,
    filename: item.filename,
    url: item.url.startsWith('data:') ? `/api/media/${item.id}` : item.url,
    altText: item.altText,
    mimeType: item.mimeType,
    size: item.size,
    folder: item.folder,
    createdAt: item.createdAt,
  }))

  return NextResponse.json({ media: formattedMedia })
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const folder = (formData.get('folder') as string) || 'uploads'
    const altText = (formData.get('altText') as string) || null

    // Support single file ('file') or multiple files ('files' or multiple 'file')
    const rawFiles: File[] = []
    const filesField = formData.getAll('files') as File[]
    const fileField = formData.getAll('file') as File[]

    if (filesField.length > 0) {
      rawFiles.push(...filesField.filter((f) => f instanceof File && f.size > 0))
    }
    if (fileField.length > 0) {
      for (const f of fileField) {
        if (f instanceof File && f.size > 0 && !rawFiles.includes(f)) {
          rawFiles.push(f)
        }
      }
    }

    if (rawFiles.length === 0) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 })
    }

    // Validate types and sizes
    for (const file of rawFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type (${file.type}). Supported formats: PNG, JPG, JPEG, WEBP, SVG, GIF, AVIF.`,
          },
          { status: 400 }
        )
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the limit.` },
          { status: 400 }
        )
      }
    }

    const savedMedia = []

    for (const file of rawFiles) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const parsedExt = path.extname(file.name)
      const ext = parsedExt || `.${file.type.split('/')[1] || 'jpg'}`
      const baseName = path
        .basename(file.name, parsedExt)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 40)

      const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
      const filename = `${baseName ? `${baseName}-` : ''}${uniqueSuffix}${ext}`

      let isDiskSaved = false
      let localDiskUrl = `/uploads/${filename}`

      // Attempt to save to local public/uploads (works on local servers)
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true })
        }
        const filePath = path.join(uploadsDir, filename)
        await writeFile(filePath, buffer)
        isDiskSaved = true
      } catch (fsErr) {
        // Expected on read-only serverless platforms like Vercel
        isDiskSaved = false
      }

      // If disk write is unsupported (Vercel), store base64 data URL in the database
      const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`
      const storedUrl = isDiskSaved ? localDiskUrl : dataUrl

      const mediaRecord = await prisma.media.create({
        data: {
          filename,
          url: storedUrl,
          mimeType: file.type,
          size: file.size,
          altText: altText || baseName || file.name,
          folder,
        },
      })

      // The publicly accessible URL for the frontend
      const publicUrl = isDiskSaved ? localDiskUrl : `/api/media/${mediaRecord.id}`

      savedMedia.push({
        ...mediaRecord,
        url: publicUrl,
      })
    }

    if (savedMedia.length === 1) {
      return NextResponse.json({
        success: true,
        url: savedMedia[0].url,
        media: savedMedia[0],
      })
    }

    return NextResponse.json({
      success: true,
      urls: savedMedia.map((m) => m.url),
      media: savedMedia,
    })
  } catch (error: any) {
    console.error('Admin media upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image file' },
      { status: 500 }
    )
  }
}
