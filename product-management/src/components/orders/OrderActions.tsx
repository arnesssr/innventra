import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useStore } from "../../store/useStore"
import type { Order } from "../../types/orderTypes"

interface OrderActionsProps {
  order: Order
  onView: () => void
}

export function OrderActions({ order, onView }: OrderActionsProps) {
  const updateOrderStatus = useStore(state => state.updateOrderStatus)
  const deleteOrder = useStore(state => state.deleteOrder)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {order.status === 'pending' && (
          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')}>
            Mark as Processing
          </DropdownMenuItem>
        )}
        {order.status === 'processing' && (
          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'completed')}>
            Mark as Completed
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => updateOrderStatus(order.id, 'cancelled')}
          className="text-red-600"
        >
          Cancel Order
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => deleteOrder(order.id)}
          className="text-red-600"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
