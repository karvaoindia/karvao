import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ submissions });
}
