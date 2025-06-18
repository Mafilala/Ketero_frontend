import { Order, OrderDetail } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface OrderSpecificationsProps {
  clothingTypeName: string;
  orderDetail: OrderDetail | undefined;
  order: Order;
}

export default function OrderSpecifications({ 
  clothingTypeName,
  orderDetail,
  order
}: OrderSpecificationsProps) {
  console.log("spec", order)
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
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm underline underline-offset-4 mb-2">አይነት</p>
          <p>{clothingTypeName || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm underline underline-offset-4 mb-2">ስታይል</p>
          <p>{orderDetail?.style || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm underline underline-offset-4 mb-2">ጨርቅ</p>
          <p>{orderDetail?.fabric || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm underline underline-offset-4 mb-2">ከለር</p>
          <p>{orderDetail?.color || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm underline underline-offset-4 mb-2">ቀጠሮ</p>
          <p>{order.due_date ? new Date(order.due_date).toLocaleDateString() : 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm underline underline-offset-4 mb-2">ሁኔታ</p>
          <p>{order.status_id === 2 ? 'Delivered' : 'Pending'}</p>
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
