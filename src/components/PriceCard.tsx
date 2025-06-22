import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import PriceDetail from './PriceDetail'; 

const  PriceCard = ({order_id}: {order_id: number}) => {
    return (
    <Card className=""
      style={{
      backgroundColor: 'var(--tg-secondary-bg-color)',
      color: 'var(--tg-text-color)',
      borderColor: 'var(--tg-secondary-bg-color)'
    }}
    > 
      <CardHeader>
        <CardTitle>Price Detail</CardTitle>
      </CardHeader>
      <CardContent >
        <PriceDetail order_id={order_id}/>
      </CardContent>
    </Card>
  );
}

export default PriceCard
