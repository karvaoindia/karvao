'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Project {
  id: string
  name: string
  category: string
  description: string
  imageUrl: string | null
  url: string | null
  featured: boolean
  sortOrder: number
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', category: '', description: '', imageUrl: '', url: '', featured: false })

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (e) { console.error('Failed') } finally { setLoading(false) }
  }

  const saveProject = async (id?: string) => {
    const method = id ? 'PATCH' : 'POST'
    const url = id ? `/api/admin/projects/${id}` : '/api/admin/projects'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setEditing(null)
    setForm({ name: '', category: '', description: '', imageUrl: '', url: '', featured: false })
    fetchProjects()
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    fetchProjects()
  }

  if (loading) return <div className="text-grey text-sm">Loading projects...</div>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">Projects</h1>
          <p className="text-sm text-grey mt-1">Manage your project showcase.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => { setEditing('new'); setForm({ name: '', category: '', description: '', imageUrl: '', url: '', featured: false }) }}>
          + Add Project
        </Button>
      </div>

      {(editing === 'new' || editing) && (
        <Card className="p-6 bg-white border border-border space-y-4">
          <h3 className="font-bold text-navy">{editing === 'new' ? 'New Project' : 'Edit Project'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Project Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-navy">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-lg text-sm text-navy focus:outline-none focus:border-blue-bright min-h-[80px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Image URL" value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} />
            <Input label="Project URL" value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-navy">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
            Featured
          </label>
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={() => saveProject(editing === 'new' ? undefined : editing)}>Save</Button>
            <Button variant="outline" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {projects.map(p => (
          <Card key={p.id} className="p-5 bg-white border border-border flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-bright uppercase">{p.category}</span>
              <h3 className="text-sm font-bold text-navy">{p.name}</h3>
              <p className="text-xs text-grey line-clamp-1 mt-0.5">{p.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {p.featured && <span className="text-[10px] font-bold text-green bg-[#ECFDF5] px-2 py-0.5 rounded-full">Featured</span>}
              <button onClick={() => { setEditing(p.id); setForm({ name: p.name, category: p.category, description: p.description, imageUrl: p.imageUrl || '', url: p.url || '', featured: p.featured }) }} className="text-xs font-bold text-blue-bright hover:underline">Edit</button>
              <button onClick={() => deleteProject(p.id)} className="text-xs font-bold text-red hover:underline">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
