import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const logoContent = await prisma.siteContent.findUnique({
      where: { key: 'site_logo' },
    })

    return NextResponse.json({
      logoUrl: logoContent ? logoContent.value : null,
    })
  } catch (error) {
    return NextResponse.json({ logoUrl: null }, { status: 500 })
  }
}
