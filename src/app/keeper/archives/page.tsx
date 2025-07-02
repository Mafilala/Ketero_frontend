'use client'
import OrdersTable from '@/components/OrdersTable';

const OrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Archived Orders</h1>
      </div>
      
      <div className="">
        <OrdersTable defaultFilter="6" />
      </div>
    </div>
  );
};

export default OrdersPage;
