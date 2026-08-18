import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { revalidatePath } from 'next/cache'

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const updated = await prisma.project.update({
    where: { id },
    data: {
      name: body.name,
      category: body.category,
      description: body.description,
      imageUrl: body.imageUrl || null,
      url: body.url || null,
      featured: body.featured,
    },
  })

  revalidatePath('/', 'layout')

  return NextResponse.json({ success: true, project: updated })
}

export async function DELETE(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  await prisma.project.delete({ where: { id } })

  revalidatePath('/', 'layout')

  return NextResponse.json({ success: true })
}
