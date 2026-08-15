'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  review: string
  rating: number
  photoUrl: string | null
  featured: boolean
  sortOrder: number
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', company: '', role: '', review: '', rating: 5, photoUrl: '', featured: false })

  useEffect(() => { fetchTestimonials() }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials')
      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } catch (e) { console.error('Failed') } finally { setLoading(false) }
  }

  const saveTestimonial = async (id?: string) => {
    const method = id ? 'PATCH' : 'POST'
    const url = id ? `/api/admin/testimonials/${id}` : '/api/admin/testimonials'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setEditing(null)
    setForm({ name: '', company: '', role: '', review: '', rating: 5, photoUrl: '', featured: false })
    fetchTestimonials()
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    fetchTestimonials()
  }

  if (loading) return <div className="text-grey text-sm">Loading testimonials...</div>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Testimonials</h1>
          <p className="text-sm text-grey mt-1">Manage client reviews displayed on the website.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => { setEditing('new'); setForm({ name: '', company: '', role: '', review: '', rating: 5, photoUrl: '', featured: false }) }}>
          + Add Testimonial
        </Button>
      </div>

      {(editing === 'new' || editing) && (
        <Card className="p-6 bg-white border border-border space-y-4">
          <h3 className="font-bold text-navy">{editing === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Client Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Company" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
            <Input label="Role" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-navy">Review</label>
            <textarea value={form.review} onChange={e => setForm(p => ({ ...p, review: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-lg text-sm text-navy focus:outline-none focus:border-blue-bright min-h-[80px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Rating (1-5)" type="number" value={String(form.rating)} onChange={e => setForm(p => ({ ...p, rating: Number(e.target.value) }))} />
            <Input label="Photo URL" value={form.photoUrl} onChange={e => setForm(p => ({ ...p, photoUrl: e.target.value }))} />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-navy">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
            Featured
          </label>
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={() => saveTestimonial(editing === 'new' ? undefined : editing)}>Save</Button>
            <Button variant="outline" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {testimonials.map(t => (
          <Card key={t.id} className="p-5 bg-white border border-border flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-navy">{t.name}</h3>
                <span className="text-xs text-grey">- {t.role}, {t.company}</span>
              </div>
              <p className="text-xs text-grey line-clamp-2 mt-1">{t.review}</p>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({length: 5}).map((_, i) => (
                  <span key={i} className={`text-xs ${i < t.rating ? 'text-[#F59E0B]' : 'text-[#E2E8F0]'}`}>&#9733;</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              {t.featured && <span className="text-[10px] font-bold text-green bg-[#ECFDF5] px-2 py-0.5 rounded-full">Featured</span>}
              <button onClick={() => { setEditing(t.id); setForm({ name: t.name, company: t.company, role: t.role, review: t.review, rating: t.rating, photoUrl: t.photoUrl || '', featured: t.featured }) }} className="text-xs font-bold text-blue-bright hover:underline">Edit</button>
              <button onClick={() => deleteTestimonial(t.id)} className="text-xs font-bold text-red hover:underline">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
