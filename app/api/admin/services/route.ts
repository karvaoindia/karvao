import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/adminAuth';

// GET all services
export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const services = await prisma.service.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] });
  return NextResponse.json({ services });
}

// POST new service
export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { title, category, description, icon, published, sortOrder } = body;
  if (!title || !category || !description) {
    return NextResponse.json({ error: 'Title, category, and description are required' }, { status: 400 });
  }
  const service = await prisma.service.create({
    data: {
      title,
      category: category.toUpperCase(),
      description,
      icon: icon || null,
      published: published ?? true,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
    },
  });
  return NextResponse.json({ service }, { status: 201 });
}

// PUT update existing service
export async function PUT(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const { id, title, category, description, icon, published, sortOrder } = data;
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  const updated = await prisma.service.update({
    where: { id },
    data: {
      title,
      category: category?.toUpperCase(),
      description,
      icon,
      published,
      sortOrder: sortOrder ? Number(sortOrder) : undefined,
    },
  });
  return NextResponse.json({ service: updated });
}

// DELETE a service
export async function DELETE(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  const deleted = await prisma.service.delete({ where: { id } });
  return NextResponse.json({ service: deleted });
}
