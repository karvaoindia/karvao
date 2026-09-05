import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobForm({ initialData = {} }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData.title || '',
    department: initialData.department || '',
    location: initialData.location || 'Remote / Hybrid',
    type: initialData.type || 'Full-Time',
    description: initialData.description || '',
    requirements: initialData.requirements || '',
    published: initialData.published ?? true,
    sortOrder: initialData.sortOrder ?? 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = initialData.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/careers', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: initialData.id }),
    });
    if (res.ok) {
      router.push('/admin/careers');
    } else {
      alert('Error saving job');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
      <label className="flex flex-col">
        Title
        <input name="title" value={form.title} onChange={handleChange} required className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Department
        <input name="department" value={form.department} onChange={handleChange} required className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Location
        <input name="location" value={form.location} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Type
        <input name="type" value={form.type} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Description
        <textarea name="description" value={form.description} onChange={handleChange} required className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Requirements
        <textarea name="requirements" value={form.requirements} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
        <span>Published</span>
      </label>
      <label className="flex flex-col">
        Sort Order
        <input type="number" name="sortOrder" value={form.sortOrder} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save</button>
    </form>
  );
}
