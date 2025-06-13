import { OrderResponse } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function usePaginatedData(page: number, limit: number, filter: string) {
  return useQuery<OrderResponse>({
    queryKey: ['orders', page, limit, filter],
    queryFn: async () => {
      const params = new URLSearchParams({
        offset: String(page),
        limit: String(limit),
      });

      if (filter) {
        params.append('status', filter);
      }

      const res = await axios.get(`/api/orders?${params.toString()}`);
      const { data, total } = res.data;
      return { orders: data, total };
    },
    placeholderData: (prev) => prev,
  });
}
