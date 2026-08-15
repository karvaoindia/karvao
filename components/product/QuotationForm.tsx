'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quotationSchema, type QuotationInput } from '@/lib/validation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { Select } from '@/components/ui/Select'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

const SERVICES_OPTIONS = [
  { id: 'Website Development', label: 'Website Development', desc: 'Custom, blazing fast websites' },
  { id: 'E-commerce / Shopify', label: 'E-commerce & Shopify', desc: 'Online storefronts with integrations' },
  { id: 'Branding & Identity', label: 'Branding & Design', desc: 'Logos, guidelines, and visual assets' },
  { id: 'SEO', label: 'Search Engine Optimization (SEO)', desc: 'Organic Google search rankings' },
  { id: 'Social Media & Search Ads', label: 'Digital Ads (Meta/Google)', desc: 'Paid lead generation campaigns' },
  { id: 'CRM & Lead Pipelines', label: 'CRM & Sales Enablement', desc: 'Lead tracking and funnel optimization' },
  { id: 'WhatsApp & Workflow Automation', label: 'WhatsApp & CRM Automation', desc: 'Instant reply systems and bot tools' },
  { id: 'Analytics & Dashboards', label: 'Analytics & Tracking', desc: 'GA4, pixels, and automated reports' },
]

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select standard timeline...' },
  { value: 'immediate', label: 'Immediate (Next 30 days)' },
  { value: '1-3-months', label: '1 to 3 Months' },
  { value: '3-6-months', label: '3 to 6 Months' },
  { value: 'exploring', label: 'Just Exploring' },
]

const BUDGET_OPTIONS = [
  { value: '', label: 'Select standard budget range...' },
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-1.5l', label: '₹50,000 - ₹1,50,000' },
  { value: '1.5l-3l', label: '₹1,50,000 - ₹3,00,000' },
  { value: 'above-3l', label: '₹3,00,000+' },
]

export const QuotationForm: React.FC = () => {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuotationInput>({
    resolver: zodResolver(quotationSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', services: [], goals: '', timeline: '', budget: '' },
  })

  const selectedServices = watch('services') || []

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setValue('services', [...selectedServices, serviceId], { shouldValidate: true })
    } else {
      setValue('services', selectedServices.filter((id) => id !== serviceId), { shouldValidate: true })
    }
  }

  const nextStep = async () => {
    let fieldsToValidate: Array<keyof QuotationInput> = []
    if (step === 1) fieldsToValidate = ['name', 'email', 'phone', 'company']
    else if (step === 2) fieldsToValidate = ['services']
    const isValid = await trigger(fieldsToValidate)
    if (isValid) setStep((prev) => prev + 1)
  }

  const prevStep = () => setStep((prev) => prev - 1)

  const onSubmit = async (data: QuotationInput) => {
    setIsSubmitting(true)
    setSubmissionError(null)
    try {
      const response = await fetch('/api/quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const resData = await response.json()
      if (!response.ok) throw new Error(resData.error || 'Something went wrong')
      setIsSubmitted(true)
    } catch (err: any) {
      setSubmissionError(err.message || 'Unable to submit quotation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-green flex items-center justify-center mx-auto mb-6 border border-[#D1FAE5] shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-navy mb-4">Quotation Request Received!</h2>
        <p className="text-[#475569] mb-8 leading-relaxed">
          Thank you for sharing your project goals. Our team will review your business requirements and prepare a custom breakdown. We will reach out within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"><Button variant="outline">Return to Home</Button></Link>
          <Link href="/business-score"><Button variant="primary">Check Growth Score</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto w-full py-8 md:py-12 px-6">
      <div className="mb-8">
        <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-2">Step {step} of 3</span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-navy">
          {step === 1 && "Let's start with your business profile"}
          {step === 2 && 'What capabilities do you need?'}
          {step === 3 && 'Share your goals & budget'}
        </h1>
        <p className="text-sm text-grey mt-1.5">
          {step === 1 && 'Tell us a bit about who you are so we can coordinate.'}
          {step === 2 && 'Select all services that align with your growth objectives.'}
          {step === 3 && 'Help us understand the timeline and scope of your request.'}
        </p>
        <ProgressBar currentStep={step} totalSteps={3} className="mt-6" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {submissionError && (
          <div className="p-4 bg-red/10 border border-red/20 rounded-lg text-sm font-semibold text-red" role="alert">{submissionError}</div>
        )}

        {step === 1 && (
          <Card className="p-6 md:p-8 space-y-5 bg-white border border-border">
            <Input label="Full Name" placeholder="e.g. Rahul Sharma" error={errors.name?.message} {...register('name')} />
            <Input label="Work Email" type="email" placeholder="e.g. rahul@company.com" error={errors.email?.message} {...register('email')} />
            <Input label="Phone Number (Optional)" type="tel" placeholder="e.g. +91 98765 43210" error={errors.phone?.message} {...register('phone')} />
            <Input label="Company Name (Optional)" placeholder="e.g. Sharma Enterprises" error={errors.company?.message} {...register('company')} />
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6 md:p-8 space-y-6 bg-white border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES_OPTIONS.map((service) => (
                <Checkbox key={service.id} label={service.label} description={service.desc} checked={selectedServices.includes(service.id)} onChange={(e) => handleServiceChange(service.id, e.target.checked)} />
              ))}
            </div>
            {errors.services?.message && <p className="text-xs text-red font-semibold mt-2" role="alert">{errors.services.message}</p>}
          </Card>
        )}

        {step === 3 && (
          <Card className="p-6 md:p-8 space-y-5 bg-white border border-border">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="goals" className="text-sm font-semibold text-navy">What are your business goals for this project?</label>
              <textarea id="goals" placeholder="e.g. We want to relaunch our B2B website and connect a WhatsApp chat flow..." rows={4}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-blue-bright focus:ring-2 focus:ring-[#E6F0FF] ${errors.goals ? 'border-red' : 'border-border'}`}
                {...register('goals')}
              />
              {errors.goals?.message && <span className="text-xs text-red font-medium" role="alert">{errors.goals.message}</span>}
            </div>
            <Select label="Expected Project Timeline" options={TIMELINE_OPTIONS} error={errors.timeline?.message} {...register('timeline')} />
            <EstimatedBudgetSelect error={errors.budget?.message} {...register('budget')} />
          </Card>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          {step > 1 ? <Button type="button" variant="outline" onClick={prevStep}>Back</Button> : <div />}
          {step < 3 ? <Button type="button" variant="primary" onClick={nextStep}>Continue</Button> : <Button type="submit" variant="primary" isLoading={isSubmitting}>Submit Request</Button>}
        </div>
      </form>
    </div>
  )
}

const EstimatedBudgetSelect = React.forwardRef<HTMLSelectElement, { error?: string }>((props, ref) => {
  return <Select ref={ref} label="Estimated Budget Range" options={BUDGET_OPTIONS} {...props} />
})
EstimatedBudgetSelect.displayName = 'EstimatedBudgetSelect'
