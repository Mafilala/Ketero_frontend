import { Order, OrderDetail } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import OrderDetails from './OrderDetail'; 

interface OrderSpecificationsProps {
  clothingTypeName: string;
  orderDetail: OrderDetail | undefined;
  order: Order;
}

  // fetch price detail


export default function OrderSpecifications({ 
  clothingTypeName,
  orderDetail,
  order
}: OrderSpecificationsProps) {
  

    return (
    <Card className=""
      style={{
      backgroundColor: 'var(--tg-secondary-bg-color)',
      color: 'var(--tg-text-color)',
      borderColor: 'var(--tg-secondary-bg-color)'
    }}
    > 
      <CardHeader>
        <CardTitle>Order Specifications</CardTitle>
        <CardTitle className="mt-4">{clothingTypeName || 'N/A'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orderDetail && <OrderDetails orderDetail={orderDetail}/>}
        <div className='flex justify-between'>
          <div>
            <p className="">ቀጠሮ: {order.due_date ? new Date(order.due_date).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div>
            <p className="">ሁኔታ: {order.status_id === 2 ? 'Delivered' : 'Pending'}</p>
          </div>
        </div>

        {order?.order_note && (
          <div className="col-span-3">
            <p className="text-sm underline underline-offset-4 mb-2">ማስታወሻ</p>
            <p className="mt-1  rounded-md">{order.order_note}</p>
          </div>
        )} 
      </CardContent>
    </Card>
  );
}
