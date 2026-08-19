import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// PUT / PATCH update job listing
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { title, department, location, type, description, requirements, published, sortOrder } = body

    const updatedJob = await prisma.jobListing.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(department !== undefined && { department }),
        ...(location !== undefined && { location }),
        ...(type !== undefined && { type }),
        ...(description !== undefined && { description }),
        ...(requirements !== undefined && { requirements }),
        ...(published !== undefined && { published }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    })

    return NextResponse.json({ job: updatedJob })
  } catch (error) {
    console.error('Error updating job listing:', error)
    return NextResponse.json({ error: 'Failed to update job listing' }, { status: 500 })
  }
}

// DELETE job listing
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.jobListing.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job listing:', error)
    return NextResponse.json({ error: 'Failed to delete job listing' }, { status: 500 })
  }
}
