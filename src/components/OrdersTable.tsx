'use client'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from "@/components/ui/label";

import { Skeleton } from '@/components/ui/skeleton';
import { Client, ClothingType, Order } from '@/types/types'
import OrderDetailsModal from './OrderDetailsModal';
import { usePaginatedData } from '@/lib/fetch';
import { useTelegram } from '@/lib/telegram';
import useTelegramTheme from '@/lib/theme';

const PAGE_SIZE = 10

const OrdersTable = ({defaultFilter}: {defaultFilter: string}) => {
  const [currentClientId, setCurrentClientId] = useState<number | null>(null);
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState(defaultFilter);
  const [checked, setChecked] = useState(false);
    
  const tg = useTelegram();
  const theme = useTelegramTheme()
 
  useEffect(() => {
    
    if (tg) { 

    tg.ready()
    tg.expand()
    }

  }, [tg, theme])

  // Fetch orders from API
  const {
  data: { orders = [], total = 0 } = {},
  isLoading: isOrdersLoading,
  isError: isOrderError,
} = usePaginatedData(page, PAGE_SIZE, filter);

  // clients
    const { data: clients = [], isLoading: isClientsLoading, isError: isClientError } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: () => fetch('/api/clients').then(res => res.json()),
  });

  // Fetch clothing types 
    const { data: clothingTypes = [], isLoading: isClothingTypeLoading, isError: isClothingTypeError} = useQuery<ClothingType[]>({
    queryKey: ['clothing_types'],
    queryFn: () => 
      fetch('/api/clothing_type').then(res => res.json())
    
  });

  const handleOncheck = () => {
    setFilter(prev => prev === "" ? "3": "")
    setChecked(prev => !prev)
  }
               
  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.full_name : 'Loading...';
  };
  
  const onOpenChange = (val: boolean) => {
     setOpen(val)
  }
  const getClient = () => {
    const client = clients.find(c => c.id === currentClientId)
    return client
  }

  const getClientPhoneNumber = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.phone_number : 'Loading...';
  };

  const getClothingType = (typeId: number) => {
    const type = clothingTypes.find(t => t.id === typeId);
    return type ? type.name : 'Loading...';
  };
  // Toggle order status
  const toggleStatus = async (orderId: number, currentStatus: number) => {
    try {
      const newStatus = currentStatus !== 3 ? 3 : 1;       
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status_id: newStatus })
      });

      if (!response.ok) throw new Error('Status update failed');

      // Update local state
      } catch (err) {
      console.error('Status toggle error:', err);
      }
  };

  const handleArchive = async (orderId: number, currentStatus: number) => {
    try {
      const newStatus = currentStatus !== 6 ? 6 : 1;       
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status_id: newStatus })
      });

      if (!response.ok) throw new Error('Status update failed');

      // Update local state
      } catch (err) {
      console.error('Status toggle error:', err);
      }
  };

    
  const isLoading = isClientsLoading || isOrdersLoading || isClothingTypeLoading;
  const currentClient = (!isLoading && currentClientId) ? getClient() : null;
  const isError = isOrderError || isClientError || isClothingTypeError;
  return (
    <div className="" style={{
      backgroundColor: 'var(--tg-bg-color)',
      color: 'var(--tg-text-color)'
    }}>
        <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Clothing Type</th>
            <th className="text-center p-4">Status</th>
            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                <td className="p-4 text-center"><Skeleton className="h-4 w-4 mx-auto" /></td>
                <td className="p-4 text-center">
                  <Skeleton className="h-8 w-16 inline-block mr-2" />
                  <Skeleton className="h-8 w-16 inline-block" />
                </td>
              </tr>
            ))
          ): isError ? (
          <tr><td>unable to load table</td></tr>
          ) : (
            // Orders data
            orders.map((order : Order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium">{getClientName(order.client_id)}</div>
                    <a href={`tel:${getClientPhoneNumber(order.client_id)}`} className="text-sm text-gray-500 hover:underline">
                      {getClientPhoneNumber(order.client_id)}
                    </a>
                </td>
                <td className="p-4">{getClothingType(order.clothing_type_id)}</td>
                <td className="p-4 text-center">
                  <Checkbox
                    checked={order.status_id === 3}
                    onCheckedChange={() => toggleStatus(order.id, order.status_id)}
                    className="h-5 w-5"
                  />
                </td>
                <td className="p-4 text-center">
                  <Button variant="outline" size="sm" className="mr-2"
                    onClick={ () => {
                        setCurrentClientId(order.client_id)
                        setOpen(true)
  
                      }}
                      style={{
                          backgroundColor: 'var(--tg-button-color)',
                          color: 'var(--tg-button-text-color)'}}
                    >
                    View
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleArchive(order.id, order.status_id)}
                      style={{
                          backgroundColor: 'var(--tg-button-color)',
                          color: 'var(--tg-button-text-color)'}}

                      >
                   {filter === "6" ? "Restore" : "Archive"} 
                  </Button>
                </td>
                  {currentClient &&<OrderDetailsModal open={open} clothingTypeName={getClothingType(order.clothing_type_id)} order={order} onOpenChange={onOpenChange} client={currentClient}/> }
              </tr>
            ))
          )}
        </tbody>
      </table>
      {(!isError && !isLoading) && 
        <div className="flex justify-between  px-4 mt-4">
          <div className=" flex justify-between">
            <Button className="rounded bg-gray-300 h-6" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 0}>
              Prev
            </Button>
              <span className="px-2 my-auto">{page + 1}</span>
            <Button className="rounded bg-gray-300 h-6" onClick={() => setPage(p => (p * PAGE_SIZE < total ? p + 1 : p))} disabled={(page + 1) * PAGE_SIZE >= total}>
              Next
            </Button>
          </div>
          {
            (filter != "6") && (
            <div className="flex items-center space-x-2">
              <Checkbox id="delivered" checked={checked} onCheckedChange={handleOncheck} />
              <Label htmlFor="delivered" className="ml-2">delivered</Label>
            </div>      
            )
          }
        </div>
      }
      </div>
  );
};

export default OrdersTable;
