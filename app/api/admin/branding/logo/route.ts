import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function GET() {
  try {
    const logoContent = await prisma.siteContent.findUnique({
      where: { key: 'site_logo' },
    })

    return NextResponse.json({
      logoUrl: logoContent ? logoContent.value : null,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch logo' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed formats: PNG, JPG, WEBP, SVG' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 5MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const ext = path.extname(file.name) || `.${file.type.split('/')[1]}`
    const filename = `logo-${Date.now()}${ext}`
    const filePath = path.join(uploadsDir, filename)

    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/${filename}`

    // Save/update in SiteContent
    await prisma.siteContent.upsert({
      where: { key: 'site_logo' },
      update: {
        value: publicUrl,
        updatedAt: new Date(),
      },
      create: {
        key: 'site_logo',
        value: publicUrl,
        section: 'branding',
        label: 'Website Logo',
        type: 'image',
      },
    })

    // Register in Media library
    await prisma.media.create({
      data: {
        filename,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        altText: 'Website Logo',
        folder: 'branding',
      },
    })

    return NextResponse.json({
      success: true,
      logoUrl: publicUrl,
      message: 'Logo updated successfully',
    })
  } catch (error) {
    console.error('Logo upload error:', error)
    return NextResponse.json({ error: 'Failed to upload logo' }, { status: 500 })
  }
}

export async function DELETE() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const existing = await prisma.siteContent.findUnique({
      where: { key: 'site_logo' },
    })

    if (existing) {
      await prisma.siteContent.delete({
        where: { key: 'site_logo' },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Logo removed successfully',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove logo' }, { status: 500 })
  }
}
