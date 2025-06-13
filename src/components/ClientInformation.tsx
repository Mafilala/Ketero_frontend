import { Client } from '@/types/types';

interface ClientInformationProps {
  client: Client;
}

export default function ClientInformation({ client }: ClientInformationProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3">Client Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p>{client?.full_name || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p>{client?.phone_number || 'N/A'}</p>
        </div>
        </div>
    </div>
  );
}
