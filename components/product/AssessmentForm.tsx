'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { assessmentSchema, type AssessmentInput } from '@/lib/validation'
import { ASSESSMENT_QUESTIONS } from '@/lib/assessmentData'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Radio } from '@/components/ui/Radio'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Card } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'

export const AssessmentForm: React.FC = () => {
  const router = useRouter()
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const isQuestionPhase = currentQuestionIdx < ASSESSMENT_QUESTIONS.length
  const totalSteps = ASSESSMENT_QUESTIONS.length + 1
  const currentStep = currentQuestionIdx + 1

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<AssessmentInput, 'answers'>>({
    resolver: zodResolver(assessmentSchema.omit({ answers: true })),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
    },
  })

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIdx]

  const handleOptionSelect = (score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: score,
    }))

    setTimeout(() => {
      setCurrentQuestionIdx((prev) => prev + 1)
    }, 200)
  }

  const goBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1)
    }
  }

  const onSubmit = async (contactData: Omit<AssessmentInput, 'answers'>) => {
    setIsSubmitting(true)
    setSubmissionError(null)

    const payload: AssessmentInput = {
      ...contactData,
      answers,
    }

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      router.push(`/report/${data.token}`)
    } catch (err: any) {
      setSubmissionError(err.message || 'Unable to save assessment. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full py-8 md:py-12 px-6">
      <div className="mb-8">
        <span className="text-xs font-black tracking-widest text-blue-bright uppercase block mb-2">
          Step {currentStep} of {totalSteps}
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-navy leading-tight">
          {isQuestionPhase
            ? currentQuestion.text
            : 'Almost there! Where should we send your Growth Report?'}
        </h1>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} className="mt-6" />
      </div>

      {submissionError && (
        <div className="mb-6 p-4 bg-red/10 border border-red/20 rounded-lg text-sm font-semibold text-red" role="alert">
          {submissionError}
        </div>
      )}

      {isQuestionPhase ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isChecked = answers[currentQuestion.id] === option.score
              return (
                <Radio
                  key={idx}
                  label={option.text}
                  name={currentQuestion.id}
                  checked={isChecked}
                  onChange={() => handleOptionSelect(option.score)}
                />
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={currentQuestionIdx === 0}
            >
              Back
            </Button>
            <span className="text-xs font-bold text-grey">
              Select an option to proceed
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 md:p-8 space-y-5 bg-white border border-border">
            <Input
              label="Full Name"
              placeholder="e.g. Amit Patel"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Work Email"
              type="email"
              placeholder="e.g. amit@company.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Phone Number (Optional)"
              type="tel"
              placeholder="e.g. +91 99999 88888"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Input
              label="Company Name (Optional)"
              placeholder="e.g. Patel Consulting"
              error={errors.company?.message}
              {...register('company')}
            />
          </Card>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={goBack}>
              Back to Questions
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Generate Growth Report
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
