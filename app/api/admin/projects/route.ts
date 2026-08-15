import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return NextResponse.json({ projects })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const project = await prisma.project.create({
    data: {
      name: body.name,
      category: body.category,
      description: body.description,
      imageUrl: body.imageUrl || null,
      url: body.url || null,
      featured: body.featured || false,
      sortOrder: body.sortOrder || 0,
    },
  })

  return NextResponse.json({ success: true, project })
}
