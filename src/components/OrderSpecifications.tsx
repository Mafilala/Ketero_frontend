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
      color: 'var(--tg-text-color)'
    }}
    > 
      <CardHeader>
        <CardTitle>Order Specifications</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Clothing Type</p>
          <p>{clothingTypeName || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Style</p>
          <p>{orderDetail?.style || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fabric</p>
          <p>{orderDetail?.fabric || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Color</p>
          <p>{orderDetail?.color || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Due Date</p>
          <p>{order.due_date ? new Date(order.due_date).toLocaleDateString() : 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p>{order.status_id === 2 ? 'Delivered' : 'Pending'}</p>
        </div>
        {order?.order_note && (
          <div className="col-span-3">
            <p className="text-sm text-gray-500">Additional Notes</p>
            <p className="mt-1 bg-gray-50 p-3 rounded-md">{order.order_note}</p>
          </div>
        )} 
      </CardContent>
    </Card>
  );
}
