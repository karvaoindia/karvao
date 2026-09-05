import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServiceForm({ initialData = {} }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData.title || '',
    category: initialData.category || '',
    description: initialData.description || '',
    subtitle: initialData.subtitle || '',
    icon: initialData.icon || '',
    imageUrl: initialData.imageUrl || '',
    accentColor: initialData.accentColor || '',
    ctaText: initialData.ctaText || '',
    ctaUrl: initialData.ctaUrl || '',
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
    const res = await fetch('/api/admin/services', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: initialData.id }),
    });
    if (res.ok) {
      router.push('/admin/services');
    } else {
      alert('Error saving service');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
      <label className="flex flex-col">
        Title
        <input name="title" value={form.title} onChange={handleChange} className="border p-2 rounded" required />
      </label>
      <label className="flex flex-col">
        Category
        <input name="category" value={form.category} onChange={handleChange} className="border p-2 rounded" required />
      </label>
      <label className="flex flex-col">
        Description
        <textarea name="description" value={form.description} onChange={handleChange} className="border p-2 rounded" required />
      </label>
      <label className="flex flex-col">
        Subtitle
        <input name="subtitle" value={form.subtitle} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Icon URL
        <input name="icon" value={form.icon} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Image URL
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        Accent Color
        <input name="accentColor" value={form.accentColor} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        CTA Text
        <input name="ctaText" value={form.ctaText} onChange={handleChange} className="border p-2 rounded" />
      </label>
      <label className="flex flex-col">
        CTA URL
        <input name="ctaUrl" value={form.ctaUrl} onChange={handleChange} className="border p-2 rounded" />
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
