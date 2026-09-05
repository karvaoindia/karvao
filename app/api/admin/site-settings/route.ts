import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const settings = await prisma.siteSettings.findFirst();
  return NextResponse.json(settings ?? {});
}

export async function PUT(request: Request) {
  const data = await request.json();
  const updated = await prisma.siteSettings.upsert({
    where: { id: data.id ?? '' },
    update: data,
    create: data,
  });
  return NextResponse.json(updated);
}
