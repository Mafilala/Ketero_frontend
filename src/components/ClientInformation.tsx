import { Client } from '@/types/types';

interface ClientInformationProps {
  client: Client;
}
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function ClientInformation({ client }: ClientInformationProps) {
  return (
    <Card className=""
      style={{
      backgroundColor: 'var(--tg-secondary-bg-color)',
      color: 'var(--tg-text-color)',
      borderColor: 'var(--tg-secondary-bg-color)'
      }}

    >
      <CardHeader>
        <CardTitle>
          Client Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm">Name</p>
          <p>{client?.full_name || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm ">Phone</p>
          {client?.phone_number ? (
            <p>
              <a href={`tel:${client.phone_number}`}>
                {client.phone_number}
              </a>
            </p>
          ) : (
            <p>N/A</p>
)}        </div>
        </CardContent>
    </Card>
  );
}
