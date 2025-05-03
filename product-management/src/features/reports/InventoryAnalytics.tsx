import { Card } from "../../components/ui/Card"
import { useStore } from "../../store/useStore"
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

export function InventoryAnalytics() {
  const inventory = useStore(state => state.inventory)
  const products = useStore(state => state.products)

  const getInventoryStats = () => {
    const items = Object.values(inventory)
    return {
      totalItems: items.length,
      outOfStock: items.filter(item => item.currentStock === 0).length,
      lowStock: items.filter(item => 
        item.currentStock > 0 && item.currentStock <= item.minimumStock
      ).length,
      totalValue: items.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId)
        return sum + (item.currentStock * (product?.price || 0))
      }, 0)
    }
  }

  const stats = getInventoryStats()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium">Total Inventory Value</h3>
          <div className="mt-2">
            <p className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</p>
          </div>
        </Card>
        {/* More inventory stats */}
      </div>
    </div>
  )
}
