import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const res = await fetch('/api/admin/site-settings');
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/site-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    alert('Settings saved');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <label className="flex flex-col">
          Phone
          <input name="phone" value={settings.phone || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Email
          <input name="email" value={settings.email || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          WhatsApp
          <input name="whatsapp" value={settings.whatsapp || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Address
          <input name="address" value={settings.address || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          LinkedIn
          <input name="linkedin" value={settings.linkedin || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Instagram
          <input name="instagram" value={settings.instagram || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          YouTube
          <input name="youtube" value={settings.youtube || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Primary Color
          <input name="primaryColor" value={settings.primaryColor || ''} onChange={handleChange} className="border p-2 rounded" />
        </label>
        <div className="col-span-2 mt-4">
          <Button type="submit" variant="primary">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
