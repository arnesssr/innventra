import { Badge } from "../ui/Badge"
import { cn } from "../../lib/utils"
import type { OrderStatus } from "../../types/orderTypes"

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  completed: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  refunded: "bg-purple-500/10 text-purple-500 border-purple-500/20"
}

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "capitalize",
        statusStyles[status],
        className
      )}
    >
      {status}
    </Badge>
  )
}
