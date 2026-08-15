import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { quotationSchema } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = quotationSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    // Database transaction to upsert lead and create quotation
    const quotation = await prisma.$transaction(async (tx) => {
      // Find or create lead
      let lead = await tx.lead.findUnique({
        where: { email: data.email },
      })

      if (lead) {
        lead = await tx.lead.update({
          where: { id: lead.id },
          data: {
            name: data.name,
            phone: data.phone || lead.phone,
            company: data.company || lead.company,
            status: 'NEW', // reset to NEW on new submission
          },
        })
      } else {
        lead = await tx.lead.create({
          data: {
            email: data.email,
            name: data.name,
            phone: data.phone || null,
            company: data.company || null,
            status: 'NEW',
          },
        })
      }

      // Create Quotation
      const quote = await tx.quotation.create({
        data: {
          leadId: lead.id,
          goals: data.goals,
          timeline: data.timeline,
          budget: data.budget,
          status: 'PENDING',
          items: {
            create: data.services.map((service) => ({
              service,
            })),
          },
        },
        include: {
          items: true,
        },
      })

      return quote
    })

    console.log(`[EMAIL DISPATCH] Mock Email Sent: New Quotation ${quotation.id} for ${data.name} (${data.email})`)

    return NextResponse.json({ success: true, quotationId: quotation.id })
  } catch (error: any) {
    console.error('Error handling quotation submission:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    )
  }
}
