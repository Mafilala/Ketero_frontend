import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useVerifyTg = (shouldSkip:boolean,  queryObj:Record<string, string>) => {
    return useQuery({
    queryKey: ['verifyTelegram', queryObj.hash],
    queryFn: async () => {
      const res = await axios.get('/api/auth')
      return res.data
    },
    enabled: !shouldSkip && !!queryObj.hash,
  })
}
