import { OrderCard } from "./OrderCard"

interface OrderListProps {
  orders: Array<{
    id: string
    date: string
    status: string
    total: number
    items: Array<{
      id: string
      name: string
      quantity: number
    }>
  }>
  onOrderSelect: (orderId: string) => void
}

export function OrderList({ orders, onOrderSelect }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard 
          key={order.id} 
          order={order} 
          onSelect={onOrderSelect}
        />
      ))}
    </div>
  )
}
