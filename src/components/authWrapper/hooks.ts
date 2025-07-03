import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useVerifyTg = (shouldSkip:boolean,  queryObj:string) => {
    return useQuery({
    queryKey: ['verifyTelegram', queryObj],
    queryFn: async () => {
      const res = await axios.post('/api/auth', {initData: queryObj})
      return res.data
    },
    enabled: !shouldSkip && queryObj != '',
  })
}
