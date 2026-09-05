import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { unlink } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

interface Params {
  params: Promise<{ id: string }>
}

export async function DELETE(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params

    const media = await prisma.media.findUnique({
      where: { id },
    })

    if (!media) {
      return NextResponse.json({ error: 'Media item not found' }, { status: 404 })
    }

    // If file is stored in /uploads/, delete it from local disk
    if (media.url && media.url.startsWith('/uploads/')) {
      const filename = path.basename(media.url)
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename)
      if (existsSync(filePath)) {
        await unlink(filePath).catch((err) => {
          console.warn('Failed to delete physical file:', err)
        })
      }
    }

    await prisma.media.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to delete media file' },
      { status: 500 }
    )
  }
}
