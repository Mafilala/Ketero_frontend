import { User, CreateUser } from '@/types/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetAllUsers() {
  return useQuery<User[]>({
    queryKey: ['users' ],
    queryFn: async () => {
      const res = await axios.get(`/api/shop_keeper/all`)
      const { data } = res;
      return data;
    }})
}

export const useCreateUser = () => {
    return useMutation<User, Error, CreateUser>({
        mutationFn: async (newUser) => {
           const url = "/api/shop_keeper"
           return axios.post(url, newUser)
        },
       })
}

export const useDeleteUser = () => {
    return useMutation<number, Error, number>({
      mutationFn: async (id) => {
       const url = `api/shop_keeper/?id=${id}`
       return axios.delete(url)
    },
  })
}
