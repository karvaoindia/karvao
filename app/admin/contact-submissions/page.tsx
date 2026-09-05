import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ContactSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    const res = await fetch('/api/admin/contact-submissions');
    const data = await res.json();
    setSubmissions(data.submissions || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const exportCSV = () => {
    const headers = ['ID', 'Lead ID', 'Message', 'Created At'];
    const rows = submissions.map((s: any) => [s.id, s.leadId, `"${s.message.replace(/"/g, '""')}"`, s.createdAt]);
    const csvContent = [headers, ...rows]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contact_submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Submissions</h1>
      <Button onClick={exportCSV} className="mb-4">Export CSV</Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Lead ID</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s: any) => (
              <tr key={s.id}>
                <td className="p-2 border">{s.id}</td>
                <td className="p-2 border">{s.leadId}</td>
                <td className="p-2 border break-words max-w-xs">{s.message}</td>
                <td className="p-2 border">{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
