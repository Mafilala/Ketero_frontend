'use client';

import { useEffect, useState } from 'react';
import { Client } from '../types/types';
import { ClientTable } from '../components/tables/client_table';
import { useTelegram } from '@/lib/telegram';
import useTelegramTheme from '@/lib/theme';
export default function HomePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const tg = useTelegram();
  const theme = useTelegramTheme()
 
  useEffect(() => {
    
    if (tg) { 

    tg.ready()
    tg.expand()
    }

    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [tg, theme]);

  return (
    <div className="h-full" 
      style={{
        backgroundColor: 'var(--tg-bg-color)',
        color: 'var(--tg-text-color)'
      }}
    >
      <h1 className=""
              >📋 Client List</h1>
      {loading ? (
        <p>Loading clients...</p>
      ) : (
        <ClientTable clients={clients} />
      )}
    </div>
  );
}

