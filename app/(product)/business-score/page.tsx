import React from 'react'
import { Metadata } from 'next'
import { AssessmentForm } from '@/components/product/AssessmentForm'

export const metadata: Metadata = {
  title: 'Check Your Business Growth Score',
  description: 'Evaluate your business operations, digital presence, customer acquisition, conversion, automation and measurement. Get an instant score and custom recommendations report.',
}

export default function BusinessScorePage() {
  return (
    <div className="w-full flex-grow flex items-center justify-center py-12 md:py-16 bg-blue-surface/30">
      <AssessmentForm />
    </div>
  )
}
