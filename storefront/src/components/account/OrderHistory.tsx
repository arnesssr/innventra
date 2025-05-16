import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Package } from "lucide-react"

export function OrderHistory() {
  const orders = [] // Replace with real data

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-accent/50 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-1">No orders yet</h3>
        <p className="text-muted-foreground mb-4">When you place orders, they will appear here</p>
        <Button>Start Shopping</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="p-4">
          {/* Order card content */}
        </Card>
      ))}
    </div>
  )
}
