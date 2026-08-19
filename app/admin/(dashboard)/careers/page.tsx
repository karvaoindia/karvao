'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface JobListing {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements?: string | null
  published: boolean
  sortOrder: number
}

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentJob, setCurrentJob] = useState<Partial<JobListing>>({
    title: '',
    department: 'Engineering',
    location: 'Remote / Hybrid',
    type: 'Full-Time',
    description: '',
    requirements: '',
    published: true,
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/careers')
      if (res.ok) {
        const data = await res.json()
        setJobs(data.jobs || [])
      }
    } catch (err) {
      console.error('Error fetching jobs:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!currentJob.title || !currentJob.department || !currentJob.description) {
      setMessage({ type: 'error', text: 'Please fill in Title, Department, and Description.' })
      return
    }

    try {
      const isNew = !currentJob.id
      const url = isNew ? '/api/admin/careers' : `/api/admin/careers/${currentJob.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentJob),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: `Job listing ${isNew ? 'created' : 'updated'} successfully!` })
        setIsEditing(false)
        setCurrentJob({
          title: '',
          department: 'Engineering',
          location: 'Remote / Hybrid',
          type: 'Full-Time',
          description: '',
          requirements: '',
          published: true,
        })
        fetchJobs()
      } else {
        const errData = await res.json()
        setMessage({ type: 'error', text: errData.error || 'Failed to save job listing.' })
      }
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
    }
  }

  const handleTogglePublish = async (job: JobListing) => {
    try {
      const res = await fetch(`/api/admin/careers/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !job.published }),
      })

      if (res.ok) {
        fetchJobs()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return

    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage({ type: 'success', text: 'Job listing deleted successfully.' })
        fetchJobs()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
            Careers &amp; Jobs CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Manage open positions, culture highlights, and application requirements visible on the Careers page.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              setCurrentJob({
                title: '',
                department: 'Engineering',
                location: 'Remote / Hybrid',
                type: 'Full-Time',
                description: '',
                requirements: '',
                published: true,
              })
              setIsEditing(true)
            }}
            className="bg-[#1264FF] hover:bg-[#0F53D6] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all"
          >
            + Create New Job Listing
          </button>
        )}
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold border ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Editing Form Modal / Section */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#0B1220]">
            {currentJob.id ? 'Edit Job Listing' : 'Create New Job Listing'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={currentJob.title || ''}
                onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Department *
              </label>
              <input
                type="text"
                value={currentJob.department || ''}
                onChange={(e) => setCurrentJob({ ...currentJob, department: e.target.value })}
                placeholder="e.g. Engineering, Performance Marketing"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Location
              </label>
              <input
                type="text"
                value={currentJob.location || ''}
                onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                placeholder="e.g. Remote / Hybrid, Mumbai"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Employment Type
              </label>
              <select
                value={currentJob.type || 'Full-Time'}
                onChange={(e) => setCurrentJob({ ...currentJob, type: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
              Job Description *
            </label>
            <textarea
              rows={4}
              value={currentJob.description || ''}
              onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
              placeholder="Describe the role, impact, and day-to-day responsibilities..."
              className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
              Requirements &amp; Qualifications
            </label>
            <textarea
              rows={3}
              value={currentJob.requirements || ''}
              onChange={(e) => setCurrentJob({ ...currentJob, requirements: e.target.value })}
              placeholder="List key requirements, tech stack experience, or qualification criteria..."
              className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-bold text-[#0B1220] cursor-pointer">
              <input
                type="checkbox"
                checked={currentJob.published ?? true}
                onChange={(e) => setCurrentJob({ ...currentJob, published: e.target.checked })}
                className="w-4 h-4 text-[#1264FF] rounded focus:ring-[#1264FF]"
              />
              <span>Publish Immediately</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="submit"
              className="bg-[#1264FF] hover:bg-[#0F53D6] text-white text-xs font-extrabold px-6 py-2.5 rounded-lg transition-all"
            >
              Save Job Listing
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-xs font-bold px-5 py-2.5 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Jobs List */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0B1220]">All Job Listings ({jobs.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-[#475569]">Loading job listings...</div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#475569]">
            No job listings found. Click &quot;Create New Job Listing&quot; to add your first position.
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {jobs.map((job) => (
              <div key={job.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8FAFC]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-[#0B1220]">{job.title}</h3>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${
                        job.published
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {job.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] font-medium">
                    {job.department} &bull; {job.location} &bull; {job.type}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(job)}
                    className="text-xs font-bold text-[#475569] hover:text-[#0B1220] px-3 py-1.5 rounded-lg border border-[#CBD5E1] transition-colors"
                  >
                    {job.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentJob(job)
                      setIsEditing(true)
                    }}
                    className="text-xs font-bold text-[#1264FF] hover:bg-[#1264FF]/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
