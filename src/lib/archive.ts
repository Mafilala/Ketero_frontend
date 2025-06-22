import { OrderResponse } from '@/types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useToggleOrderStatus(page: number, limit: number, filter: string ) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, currentStatus, name}: { orderId: number; currentStatus: number, name:string }) => {
      let newStatus; 
      if (name === "archive") {
          newStatus = currentStatus !== 6 ? 6 : 1;
      } else {
          newStatus = currentStatus !== 3 ? 3 : 1  
      }
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status_id: newStatus }),
      });

      if (!response.ok) throw new Error('Status update failed');

      return { orderId, newStatus };
    },

    onSuccess: ({ orderId, newStatus }) => {
      queryClient.setQueryData(
        ['orders', page, limit, filter],
        (oldData: OrderResponse | undefined) => {
          if (!oldData) return oldData;
          console.log('catching')
          return {
            ...oldData,
            orders: oldData.orders.map(order =>
              order.id === orderId ? { ...order, status_id: newStatus } : order
            ),
          };
        }
      );
    },
  });
}

export default useToggleOrderStatus
