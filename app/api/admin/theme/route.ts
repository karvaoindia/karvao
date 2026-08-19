import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/adminAuth'

const DEFAULT_THEME = {
  primaryDark: '#0B1220',
  primaryBlue: '#1264FF',
  softBlue: '#EAF2FF',
  purpleAccent: '#BFA7FF',
  backgroundColor: '#FAFBFF',
  glassOpacity: '0.80',
  animationIntensity: 'SUBTLE',
  headingFont: 'Inter, sans-serif',
}

// GET theme config
export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const themeItem = await prisma.siteContent.findUnique({
      where: { key: 'site_theme_config' },
    })

    const theme = themeItem ? JSON.parse(themeItem.value) : DEFAULT_THEME
    return NextResponse.json({ theme })
  } catch (error) {
    console.error('Error fetching theme:', error)
    return NextResponse.json({ theme: DEFAULT_THEME })
  }
}

// POST / PUT update theme config
export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const themeConfig = {
      primaryDark: body.primaryDark || DEFAULT_THEME.primaryDark,
      primaryBlue: body.primaryBlue || DEFAULT_THEME.primaryBlue,
      softBlue: body.softBlue || DEFAULT_THEME.softBlue,
      purpleAccent: body.purpleAccent || DEFAULT_THEME.purpleAccent,
      backgroundColor: body.backgroundColor || DEFAULT_THEME.backgroundColor,
      glassOpacity: body.glassOpacity || DEFAULT_THEME.glassOpacity,
      animationIntensity: body.animationIntensity || DEFAULT_THEME.animationIntensity,
      headingFont: body.headingFont || DEFAULT_THEME.headingFont,
    }

    await prisma.siteContent.upsert({
      where: { key: 'site_theme_config' },
      update: {
        value: JSON.stringify(themeConfig),
        section: 'theme',
        label: 'Site Theme & Visual Design Tokens',
        type: 'json',
      },
      create: {
        key: 'site_theme_config',
        value: JSON.stringify(themeConfig),
        section: 'theme',
        label: 'Site Theme & Visual Design Tokens',
        type: 'json',
      },
    })

    return NextResponse.json({ success: true, theme: themeConfig })
  } catch (error) {
    console.error('Error saving theme:', error)
    return NextResponse.json({ error: 'Failed to save theme config' }, { status: 500 })
  }
}
