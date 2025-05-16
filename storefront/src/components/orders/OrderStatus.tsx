import { OrderStatusBadge } from "./OrderStatusBadge"
import { OrderTimeline } from "./OrderTimeline"
import { Card } from "../ui/Card"

interface OrderStatusProps {
  orderId: string
  status: string
  timeline: Array<{
    status: string
    date: string
    description: string
    location?: string
  }>
}

export function OrderStatus({ orderId, status, timeline }: OrderStatusProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Order Status</p>
          <p className="text-lg font-semibold mt-1">#{orderId}</p>
        </div>
        <OrderStatusBadge status={status as any} />
      </div>
      <OrderTimeline events={timeline} />
    </Card>
  )
}
