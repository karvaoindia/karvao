import ServiceForm from '@/app/admin/services/EditForm';

export default function NewService() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Service</h1>
      <ServiceForm />
    </div>
  );
}
