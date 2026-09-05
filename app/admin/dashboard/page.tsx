import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ caseStudies: 0, services: 0, jobs: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">Case Studies</h2>
            <p className="text-2xl mt-2">{stats.caseStudies}</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">Services</h2>
            <p className="text-2xl mt-2">{stats.services}</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">Jobs</h2>
            <p className="text-2xl mt-2">{stats.jobs}</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">Contact Submissions</h2>
            <p className="text-2xl mt-2">{stats.contacts}</p>
          </div>
        </div>
      )}
    </div>
  );
}
