import {  OrderDetail } from '@/types/types';
import {  useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { X } from "lucide-react"
import {Input} from "@/components/ui/input"

import { useState } from 'react';
const OrderDetails = ({orderDetail} : {orderDetail : OrderDetail}) => {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    style: orderDetail?.style || 0,
    fabric: orderDetail?.fabric || 0,
    color: orderDetail?.color || 0,
  })

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`/api/order_detail?order_id=${orderDetail.order_id}`, {
        style: form.style,
        fabric: form.fabric,
        color: form.color,
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
  const deitailNames: string[] = ['style', 'fabric', 'color']; 
  return (
    <div className="flex justify-between align-bottom">
      {deitailNames.map((field: string) => (
        <div key={field}>
          <p className="text-sm underline underline-offset-4 mb-2">
            {{
              style: 'ስታይል',
              fabric: 'ጨርቅ',
              color: 'ከለር',
            }[field]}
          </p>
          {editing ? (
            <Input
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="border rounded px-1 py-0 max-w-12"
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
                  style: orderDetail?.style || 0,
                  fabric: orderDetail?.fabric || 0,
                  color: orderDetail?.color || 0,
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
  export default OrderDetails
