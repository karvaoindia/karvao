import React from 'react'
import { Metadata } from 'next'
import { QuotationForm } from '@/components/product/QuotationForm'

export const metadata: Metadata = {
  title: 'Get a Project Quotation',
  description: 'Tell us about your business goals, target timelines, and required digital services. Get a custom quotation tailored for your growth needs.',
}

export default function QuotationPage() {
  return (
    <div className="w-full flex-grow flex items-center justify-center py-12 md:py-16 bg-neutral-50/50">
      <QuotationForm />
    </div>
  )
}
