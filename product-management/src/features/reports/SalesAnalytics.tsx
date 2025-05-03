import { Card } from "../../components/ui/Card"
import { useStore } from "../../store/useStore"

export function SalesAnalytics() {
  const orders = useStore(state => state.orders)
  const stats = useStore(state => state.getOrderStats())

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium">Total Revenue</h3>
          <div className="mt-2">
            <p className="text-2xl font-bold">
              ${stats.totalRevenue.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              {orders.length} total orders
            </p>
          </div>
        </Card>
        {/* More stats cards */}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Sales History</h3>
        {/* Sales table implementation */}
      </Card>
    </div>
  )
}
