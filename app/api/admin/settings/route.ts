import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

const DEFAULT_SETTINGS = {
  companyName: 'KARVAO India',
  tagline: 'Digital Growth Partner for Businesses',
  contactEmail: 'contact@karvao.in',
  contactPhone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  address: 'Mumbai, India',
  siteTitle: 'KARVAO India | Digital Growth Partner',
  metaDescription: 'Complete digital growth engines uniting websites, performance marketing, sales CRM, WhatsApp automation and business analytics.',
  analyticsId: '',
  metaPixelId: '',
}

// GET global settings
export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settingsItem = await prisma.siteContent.findUnique({
      where: { key: 'global_site_settings' },
    })

    const settings = settingsItem ? JSON.parse(settingsItem.value) : DEFAULT_SETTINGS
    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error fetching global settings:', error)
    return NextResponse.json({ settings: DEFAULT_SETTINGS })
  }
}

// POST update global settings
export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const settings = {
      ...DEFAULT_SETTINGS,
      ...body,
    }

    await prisma.siteContent.upsert({
      where: { key: 'global_site_settings' },
      update: {
        value: JSON.stringify(settings),
        section: 'settings',
        label: 'Global Site & SEO Settings',
        type: 'json',
      },
      create: {
        key: 'global_site_settings',
        value: JSON.stringify(settings),
        section: 'settings',
        label: 'Global Site & SEO Settings',
        type: 'json',
      },
    })

    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Error saving global settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
