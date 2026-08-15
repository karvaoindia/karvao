'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface ScoreCategory {
  id: string
  key: string
  label: string
  weight: number
  description: string | null
  sortOrder: number
  questions: ScoreQuestion[]
}

interface ScoreQuestion {
  id: string
  questionText: string
  options: { text: string; score: number }[]
  sortOrder: number
}

export default function AdminScoreConfigPage() {
  const [categories, setCategories] = useState<ScoreCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/score-config')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (e) { console.error('Failed') } finally { setLoading(false) }
  }

  const updateCategory = async (id: string, weight: number) => {
    await fetch(`/api/admin/score-config/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weight }),
    })
    fetchCategories()
  }

  if (loading) return <div className="text-grey text-sm">Loading score configuration...</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-navy">Score Configuration</h1>
        <p className="text-sm text-grey mt-1">Manage assessment categories, weights, questions, and scoring options.</p>
      </div>

      <div className="space-y-6">
        {categories.map(cat => (
          <Card key={cat.id} className="p-6 bg-white border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-blue-bright uppercase tracking-wider">Category Key: {cat.key}</span>
                <h3 className="text-lg font-bold text-navy">{cat.label}</h3>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-grey">Weight:</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  defaultValue={cat.weight}
                  onBlur={e => updateCategory(cat.id, Number(e.target.value))}
                  className="w-20 px-2 py-1 border border-border rounded text-sm text-navy text-center focus:outline-none focus:border-blue-bright"
                />
              </div>
            </div>

            {cat.questions.map(q => (
              <div key={q.id} className="p-4 bg-[#F8FAFC] rounded-lg mb-3 border border-[#E2E8F0]">
                <p className="text-sm font-semibold text-navy mb-2">{q.questionText}</p>
                <div className="space-y-1">
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-[#475569]">{opt.text}</span>
                      <span className="font-mono text-blue-bright bg-[#F0F6FF] px-2 py-0.5 rounded">{opt.score}pts</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  )
}
