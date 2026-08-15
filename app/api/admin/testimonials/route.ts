import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return NextResponse.json({ testimonials })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      company: body.company,
      role: body.role,
      review: body.review,
      rating: body.rating || 5,
      photoUrl: body.photoUrl || null,
      featured: body.featured || false,
      sortOrder: body.sortOrder || 0,
    },
  })

  return NextResponse.json({ success: true, testimonial })
}
