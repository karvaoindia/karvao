import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';

export default function CaseStudiesAdmin() {
  const [caseStudies, setCaseStudies] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = async () => {
    const res = await fetch('/api/admin/case-studies');
    const data = await res.json();
    setCaseStudies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    await fetch('/api/admin/case-studies', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchCaseStudies();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Case Studies (Admin)</h1>
      <Link href="/admin/case-studies/create">
        <Button variant="primary">Create New</Button>
      </Link>
      <div className="mt-6 space-y-4">
        {loading ? (
          <p>Loading…</p>
        ) : (
          caseStudies.map((cs) => (
            <div key={cs.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h2 className="font-medium">{cs.title}</h2>
                <p className="text-sm text-gray-600">{cs.client} – {cs.category}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/case-studies/edit/${cs.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(cs.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
