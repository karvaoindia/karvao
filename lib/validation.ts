import { z } from 'zod'

export const quotationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  goals: z.string().min(10, 'Please describe your goals in at least 10 characters'),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().min(1, 'Please select a budget'),
})

export type QuotationInput = z.infer<typeof quotationSchema>

export const assessmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  answers: z.record(z.string(), z.any()),
})

export type AssessmentInput = z.infer<typeof assessmentSchema>
