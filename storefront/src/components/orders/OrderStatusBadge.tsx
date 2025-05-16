import { cn } from "../../lib/utils"

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      statusStyles[status]
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
