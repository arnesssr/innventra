import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"  // Fixed import path
import { OrderStatusBadge } from "./OrderStatusBadge"
import { Separator } from "../ui/Separator"  // Fixed import path
import { formatDate } from "../../lib/utils/dateUtils"  // Updated path
import type { Order } from "../../types/orderTypes"

interface OrderDetailsDrawerProps {
  order: Order | null
  open: boolean
  onClose: () => void
}

export function OrderDetailsDrawer({ order, open, onClose }: OrderDetailsDrawerProps) {
  if (!order) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Order #{order.orderNumber}</span>
            <OrderStatusBadge status={order.status} />
          </SheetTitle>
          <span className="text-sm text-muted-foreground">
            Created {formatDate(order.createdAt)}
          </span>
        </SheetHeader>

        {/* Customer Information */}
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Customer Details</h3>
            <div className="text-sm space-y-1">
              <p>{order.customerName}</p>
              <p className="text-muted-foreground">{order.customerEmail}</p>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="text-sm font-medium mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} × ${item.unitPrice}
                    </p>
                  </div>
                  <span className="font-medium">${item.subtotal}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${order.tax}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
