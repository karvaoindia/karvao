'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface Service {
  id: string
  title: string
  category: string
  description: string
  icon?: string | null
  published: boolean
  sortOrder: number
}

const CATEGORIES = ['BUILD', 'GROW', 'CONVERT', 'AUTOMATE', 'MEASURE']

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentService, setCurrentService] = useState<Partial<Service>>({
    title: '',
    category: 'BUILD',
    description: '',
    published: true,
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data.services || [])
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!currentService.title || !currentService.category || !currentService.description) {
      setMessage({ type: 'error', text: 'Please fill in Title, Category, and Description.' })
      return
    }

    try {
      const isNew = !currentService.id
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${currentService.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentService),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: `Service ${isNew ? 'created' : 'updated'} successfully!` })
        setIsEditing(false)
        setCurrentService({
          title: '',
          category: 'BUILD',
          description: '',
          published: true,
        })
        fetchServices()
      } else {
        const errData = await res.json()
        setMessage({ type: 'error', text: errData.error || 'Failed to save service.' })
      }
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
    }
  }

  const handleTogglePublish = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !service.published }),
      })

      if (res.ok) {
        fetchServices()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage({ type: 'success', text: 'Service deleted successfully.' })
        fetchServices()
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
            Services &amp; Offerings CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Manage services across Build, Grow, Convert, Automate, and Measure categories.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              setCurrentService({
                title: '',
                category: 'BUILD',
                description: '',
                published: true,
              })
              setIsEditing(true)
            }}
            className="bg-[#1264FF] hover:bg-[#0F53D6] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all"
          >
            + Add New Service
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

      {/* Editing Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#0B1220]">
            {currentService.id ? 'Edit Service' : 'Add New Service'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Service Title *
              </label>
              <input
                type="text"
                value={currentService.title || ''}
                onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                placeholder="e.g. Custom Web Applications"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
                Category *
              </label>
              <select
                value={currentService.category || 'BUILD'}
                onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#475569] mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              value={currentService.description || ''}
              onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
              placeholder="Enter service overview and core deliverables..."
              className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1264FF]"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-bold text-[#0B1220] cursor-pointer">
              <input
                type="checkbox"
                checked={currentService.published ?? true}
                onChange={(e) => setCurrentService({ ...currentService, published: e.target.checked })}
                className="w-4 h-4 text-[#1264FF] rounded focus:ring-[#1264FF]"
              />
              <span>Published on Website</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="submit"
              className="bg-[#1264FF] hover:bg-[#0F53D6] text-white text-xs font-extrabold px-6 py-2.5 rounded-lg transition-all"
            >
              Save Service
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

      {/* Services List by Category */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0B1220]">All Services ({services.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-[#475569]">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#475569]">
            No dynamic services added yet. Built-in system services are displayed on the public page by default. Click &quot;Add New Service&quot; to manage custom services.
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {services.map((service) => (
              <div key={service.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8FAFC]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-[#1264FF] bg-[#1264FF]/10 px-2 py-0.5 rounded-full border border-[#1264FF]/15">
                      {service.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0B1220]">{service.title}</h3>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${
                        service.published
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {service.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] font-medium line-clamp-1">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(service)}
                    className="text-xs font-bold text-[#475569] hover:text-[#0B1220] px-3 py-1.5 rounded-lg border border-[#CBD5E1] transition-colors"
                  >
                    {service.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentService(service)
                      setIsEditing(true)
                    }}
                    className="text-xs font-bold text-[#1264FF] hover:bg-[#1264FF]/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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
