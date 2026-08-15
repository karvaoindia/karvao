import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const updated = await prisma.testimonial.update({
    where: { id },
    data: {
      name: body.name,
      company: body.company,
      role: body.role,
      review: body.review,
      rating: body.rating,
      photoUrl: body.photoUrl || null,
      featured: body.featured,
    },
  })

  return NextResponse.json({ success: true, testimonial: updated })
}

export async function DELETE(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  await prisma.testimonial.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
