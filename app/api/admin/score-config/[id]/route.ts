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

  const updated = await prisma.scoreCategory.update({
    where: { id },
    data: {
      weight: body.weight,
      label: body.label,
      description: body.description,
    },
  })

  return NextResponse.json({ success: true, category: updated })
}
