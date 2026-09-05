import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CareersAdmin() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    const res = await fetch('/api/admin/careers');
    const data = await res.json();
    setJobs(data.jobs || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job listing?')) return;
    await fetch('/api/admin/careers', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchJobs();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Careers (Admin)</h1>
      <Link href="/admin/careers/new">
        <Button variant="primary" className="mb-4">Add New Job</Button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Published</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job: any) => (
              <tr key={job.id}>
                <td className="p-2 border">{job.title}</td>
                <td className="p-2 border">{job.department}</td>
                <td className="p-2 border text-center">{job.published ? '✅' : '❌'}</td>
                <td className="p-2 border space-x-2">
                  <Link href={`/admin/careers/edit/${job.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(job.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
