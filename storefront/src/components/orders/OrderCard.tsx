import { OrderStatusBadge } from "./OrderStatusBadge"
import { Button } from "../ui/Button"
import { ChevronRight } from "lucide-react"
import { Card } from "../ui/Card"

interface OrderCardProps {
  order: {
    id: string
    date: string
    status: string
    total: number
    items: Array<{
      id: string
      name: string
      quantity: number
    }>
  }
  onSelect: (orderId: string) => void
}

export function OrderCard({ order, onSelect }: OrderCardProps) {
  return (
    <Card className="cursor-pointer" onClick={() => onSelect(order.id)}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
            <p className="text-lg font-semibold mt-1">${order.total.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <OrderStatusBadge status={order.status as any} />
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </p>
      </div>
    </Card>
  )
}
