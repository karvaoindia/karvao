import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ media })
}
