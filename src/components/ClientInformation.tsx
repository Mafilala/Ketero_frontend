import { Client } from '@/types/types';

interface ClientInformationProps {
  client: Client;
}
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function ClientInformation({ client }: ClientInformationProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          Client Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p>{client?.full_name || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p>{client?.phone_number || 'N/A'}</p>
        </div>
        </CardContent>
    </Card>
  );
}
