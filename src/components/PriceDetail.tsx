import {  Price } from '@/types/types';
import {useQuery,  useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { X } from "lucide-react"
import {Input} from "@/components/ui/input"
import { useState, useEffect } from 'react';

const PriceDetail = ({order_id}: {order_id: number}) => {

  const [form, setForm] = useState({
    price: '',
    paid: '',
  });

  const [editing, setEditing] = useState(false)

  const { data: priceDetail , isLoading: isPriceDetailLoading, isError: isPriceDetailError } = useQuery<Price>({
    queryKey: ['price_detail', order_id],
    queryFn: () => fetch(`/api/price_detail?order_id=${order_id}`).then(res => res.json()),
  });

  // When priceDetail loads, update the form
  useEffect(() => {
    if (priceDetail && priceDetail.price !== undefined && priceDetail.paid !== undefined) {
      setForm({
        price: String(priceDetail.price),
        paid: String(priceDetail.paid),
      });
    }
  }, [priceDetail]);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`/api/price_detail?order_id=${order_id}`, {
        price: form.price,
        paid: form.paid,
      })
      return res.data
    },
    onSuccess: () => {
      setEditing(false)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const deitailNames: string[] = ['price', 'paid'];
  if (isPriceDetailLoading) {
    return (
    <div>Loading</div>
    )
  }

  if (isPriceDetailError) {
    <div>Unable to laod price detail</div>
  }
  return (
    <div className="flex justify-between align-bottom">
      {deitailNames.map((field: string) => (
        <div key={field}>
          <p className="text-sm underline underline-offset-4 mb-2">
            {{
              
              price: 'ዋጋ',
              paid: 'ቀብድ',
            }[field]}
          </p>
          {editing ? (
            <Input
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="border rounded px-1 py-0 max-w-16"
            />
          ) : (
            <p>{form[field as keyof typeof form] || 'N/A'}</p>
          )}
        </div>
      ))}

      <div className="flex gap-2 self-end ">
        {editing ? (
          <>
            <Button
              onClick={() => mutation.mutate()}
              style={{
                backgroundColor: 'var(--tg-button-color)',
                color: 'var(--tg-button-text-color)'
            }}
              disabled={mutation.isPending}
              size="sm"

            >
              {mutation.isPending ? 'Updating...' : 'Update'}
            </Button>
            <Button
              onClick={() => {
                setEditing(false)
                setForm({
                  price: String(priceDetail!.price),
                  paid: String(priceDetail!.paid)
                })
              }}
              size="sm"
               style={{
                  backgroundColor: 'var(--tg-button-color)',
                  color: 'var(--tg-button-text-color)'
               }}
            >
              <X />Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setEditing(true)}
            style={{
                backgroundColor: 'var(--tg-button-color)',
                color: 'var(--tg-button-text-color)'
            }}
            size="sm"

          >
            Edit
          </Button>
        )}
      </div>
    </div>
  )
}
  export default PriceDetail 
