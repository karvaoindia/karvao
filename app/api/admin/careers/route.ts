import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

// GET all job listings
export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jobs = await prisma.jobListing.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

// POST new job listing
export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, department, location, type, description, requirements, published, sortOrder } = body

    if (!title || !department || !description) {
      return NextResponse.json(
        { error: 'Title, department, and description are required' },
        { status: 400 }
      )
    }

    const job = await prisma.jobListing.create({
      data: {
        title,
        department,
        location: location || 'Remote / Hybrid',
        type: type || 'Full-Time',
        description,
        requirements: requirements || null,
        published: published ?? true,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      },
    })

    return NextResponse.json({ job }, { status: 201 })
  } catch (error) {
    console.error('Error creating job listing:', error)
    return NextResponse.json({ error: 'Failed to create job listing' }, { status: 500 })
  }
}
