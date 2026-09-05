import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const res = await fetch('/api/admin/services');
    const data = await res.json();
    setServices(data.services || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await fetch('/api/admin/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchServices();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Services (Admin)</h1>
      <Link href="/admin/services/new">
        <Button variant="primary" className="mb-4">Add New Service</Button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Published</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((svc: any) => (
              <tr key={svc.id}>
                <td className="p-2 border">{svc.title}</td>
                <td className="p-2 border">{svc.category}</td>
                <td className="p-2 border text-center">{svc.published ? '✅' : '❌'}</td>
                <td className="p-2 border space-x-2">
                  <Link href={`/admin/services/edit/${svc.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(svc.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
