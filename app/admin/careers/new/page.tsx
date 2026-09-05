import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JobForm from '@/app/admin/careers/EditForm';

export default function NewJob() {
  const router = useRouter();
  const handleSuccess = () => router.push('/admin/careers');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>
      <JobForm />
    </div>
  );
}
