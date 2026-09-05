import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const [caseStudies, services, jobs, contacts] = await Promise.all([
    prisma.caseStudy.count(),
    prisma.service.count(),
    prisma.jobListing.count(),
    prisma.contactSubmission.count(),
  ]);

  return NextResponse.json({ caseStudies, services, jobs, contacts });
}
