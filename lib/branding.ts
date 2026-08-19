import { prisma } from '@/lib/prisma'

export async function getSiteLogo(): Promise<string | null> {
  try {
    const logoContent = await prisma.siteContent.findUnique({
      where: { key: 'site_logo' },
    })
    return logoContent ? logoContent.value : null
  } catch (error) {
    return null
  }
}
