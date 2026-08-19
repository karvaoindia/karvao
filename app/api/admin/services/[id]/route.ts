import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// PUT update service
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { title, category, description, icon, published, sortOrder } = body

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(category !== undefined && { category: category.toUpperCase() }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(published !== undefined && { published }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    })

    return NextResponse.json({ service: updatedService })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

// DELETE service
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.service.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
