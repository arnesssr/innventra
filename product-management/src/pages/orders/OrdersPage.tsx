import { useState } from "react"
import { useStore } from "../../store/useStore"
import { OrderList } from "../../components/orders/OrderList"
import { CreateOrderForm } from "../../components/orders/CreateOrderForm"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { OrderAnalytics } from "../../features/orders/OrderAnalytics"

export function OrdersPage() {
  const [isCreating, setIsCreating] = useState(false)
  const stats = useStore(state => state.getOrderStats())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Analytics Overview */}
      <OrderAnalytics />

      {/* Order Creation Form or Order List */}
      {isCreating ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Create New Order</h2>
            <Button variant="ghost" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
          <CreateOrderForm onSuccess={() => setIsCreating(false)} />
        </Card>
      ) : (
        <OrderList />
      )}
    </div>
  )
}
