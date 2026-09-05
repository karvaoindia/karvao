import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobForm from '@/app/admin/careers/EditForm';

export default function EditJob() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch('/api/admin/careers')
      .then((res) => res.json())
      .then((data) => {
        const job = data.jobs.find((j) => j.id === id);
        setInitialData(job);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!initialData) return <p>Job not found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <JobForm initialData={initialData} />
    </div>
  );
}
