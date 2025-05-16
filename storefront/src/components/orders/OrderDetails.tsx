import { Card } from "../ui/Card"
import { OrderStatus } from "./OrderStatus"
import { Separator } from "../ui/Separator"

interface OrderDetailsProps {
  order: {
    id: string
    date: string
    status: string
    total: number
    items: Array<{
      id: string
      name: string
      price: number
      quantity: number
      imageUrl: string
    }>
    timeline: Array<{
      status: string
      date: string
      description: string
      location?: string
    }>
    shipping: {
      address: string
      city: string
      country: string
      postalCode: string
    }
  }
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-medium">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <OrderStatus
          orderId={order.id}
          status={order.status}
          timeline={order.timeline}
        />
        
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Shipping Address</h3>
          <p>{order.shipping.address}</p>
          <p>{order.shipping.city}</p>
          <p>{order.shipping.country}</p>
          <p>{order.shipping.postalCode}</p>
        </Card>
      </div>
    </div>
  )
}
