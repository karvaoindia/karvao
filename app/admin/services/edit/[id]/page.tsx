import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServiceForm from '@/app/admin/services/EditForm';

export default function EditService() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/services`)
      .then((res) => res.json())
      .then((data) => {
        const svc = data.services.find((s) => s.id === id);
        setInitialData(svc);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!initialData) return <p>Service not found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Service</h1>
      <ServiceForm initialData={initialData} />
    </div>
  );
}
