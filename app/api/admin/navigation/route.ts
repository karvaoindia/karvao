import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

const DEFAULT_NAV = {
  links: [
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],
  ctaLabel: 'Get a Quotation',
  ctaHref: '/quotation',
}

// GET navigation config
export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const navItem = await prisma.siteContent.findUnique({
      where: { key: 'site_navigation_config' },
    })

    const nav = navItem ? JSON.parse(navItem.value) : DEFAULT_NAV
    return NextResponse.json({ nav })
  } catch (error) {
    console.error('Error fetching navigation config:', error)
    return NextResponse.json({ nav: DEFAULT_NAV })
  }
}

// POST update navigation config
export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const navConfig = {
      links: body.links || DEFAULT_NAV.links,
      ctaLabel: body.ctaLabel || DEFAULT_NAV.ctaLabel,
      ctaHref: body.ctaHref || DEFAULT_NAV.ctaHref,
    }

    await prisma.siteContent.upsert({
      where: { key: 'site_navigation_config' },
      update: {
        value: JSON.stringify(navConfig),
        section: 'navigation',
        label: 'Header & Menu Navigation Settings',
        type: 'json',
      },
      create: {
        key: 'site_navigation_config',
        value: JSON.stringify(navConfig),
        section: 'navigation',
        label: 'Header & Menu Navigation Settings',
        type: 'json',
      },
    })

    return NextResponse.json({ success: true, nav: navConfig })
  } catch (error) {
    console.error('Error saving navigation config:', error)
    return NextResponse.json({ error: 'Failed to save navigation config' }, { status: 500 })
  }
}
