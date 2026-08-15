import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const categories = await prisma.scoreCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      questions: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  return NextResponse.json({ categories })
}
