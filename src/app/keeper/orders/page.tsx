import OrdersTable from '@/components/OrdersTable';

const OrdersPage = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
      </div>
      
      <div className="">
        <OrdersTable  defaultFilter=""/>
      </div>
    </div>
  );
};

export default OrdersPage;
