import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { assessmentSchema } from '@/lib/validation'
import { calculateScores } from '@/lib/scoring'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = assessmentSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, company, answers } = result.data

    // Each category has exactly 1 question, so the category score is the answer value
    const categoryScores = {
      digitalPresence: typeof answers['q1_digital_presence'] === 'number' ? answers['q1_digital_presence'] : 0,
      acquisition: typeof answers['q2_acquisition'] === 'number' ? answers['q2_acquisition'] : 0,
      conversion: typeof answers['q3_conversion'] === 'number' ? answers['q3_conversion'] : 0,
      automation: typeof answers['q4_automation'] === 'number' ? answers['q4_automation'] : 0,
      measurement: typeof answers['q5_measurement'] === 'number' ? answers['q5_measurement'] : 0,
    }

    const scoringResult = calculateScores(categoryScores)

    const report = await prisma.$transaction(async (tx) => {
      let lead = await tx.lead.findUnique({
        where: { email },
      })

      if (lead) {
        lead = await tx.lead.update({
          where: { id: lead.id },
          data: {
            name,
            phone: phone || lead.phone,
            company: company || lead.company,
            status: 'NEW',
          },
        })
      } else {
        lead = await tx.lead.create({
          data: {
            email,
            name,
            phone: phone || null,
            company: company || null,
            status: 'NEW',
          },
        })
      }

      const assessment = await tx.assessment.create({
        data: {
          leadId: lead.id,
          answers: answers as any,
          digitalPresence: categoryScores.digitalPresence,
          brand: 0,
          acquisition: categoryScores.acquisition,
          conversion: categoryScores.conversion,
          automation: categoryScores.automation,
          measurement: categoryScores.measurement,
          overallScore: scoringResult.overallScore,
        },
      })

      const token = crypto.randomUUID()

      const rep = await tx.report.create({
        data: {
          assessmentId: assessment.id,
          accessToken: token,
        },
      })

      return rep
    })

    console.log(`[EMAIL DISPATCH] Mock Email Sent: Diagnostic Report generated with token ${report.accessToken} for ${name} (${email})`)

    return NextResponse.json({
      success: true,
      token: report.accessToken,
      overallScore: scoringResult.overallScore,
    })
  } catch (error: any) {
    console.error('Error handling assessment submission:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    )
  }
}
