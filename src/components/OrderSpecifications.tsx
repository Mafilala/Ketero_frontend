import { Order, OrderDetail } from '@/types/types';

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
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3">Order Specifications</h3>
      <div className="grid grid-cols-3 gap-4">
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
{/*        {orderDetail?.notes && (
          <div className="col-span-3">
            <p className="text-sm text-gray-500">Additional Notes</p>
            <p className="mt-1 bg-gray-50 p-3 rounded-md">{orderDetail.notes}</p>
          </div>
        )} */}
      </div>
    </div>
  );
}
