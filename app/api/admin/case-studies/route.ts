import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(caseStudies);
}

export async function POST(req) {
  const data = await req.json();
  const created = await prisma.caseStudy.create({ data });
  return NextResponse.json(created);
}

export async function PUT(req) {
  const { id, ...rest } = await req.json();
  const updated = await prisma.caseStudy.update({
    where: { id },
    data: rest,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.caseStudy.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
