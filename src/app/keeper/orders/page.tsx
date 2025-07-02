import AuthWrapper from '@/components/authWrapper/wrapper';
import OrdersTable from '@/components/OrdersTable';
import { Suspense } from 'react';

const OrdersPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AuthWrapper>
     <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
      </div>
     
      <div className="">
        <OrdersTable  defaultFilter=""/>
      </div>
    </div>
   </AuthWrapper>
</Suspense>

  );
};

export default OrdersPage;
