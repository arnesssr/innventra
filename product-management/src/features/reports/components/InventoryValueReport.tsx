import { Card } from "../../../components/ui/Card"
import { useStore } from "../../../store/useStore"

export function InventoryValueReport() {
  const inventory = useStore(state => state.inventory)
  const products = useStore(state => state.products)

  const getTotalValue = () => {
    return Object.entries(inventory).reduce((total, [productId, item]) => {
      const product = products.find(p => p.id === productId)
      return total + (item.currentStock * (product?.price || 0))
    }, 0)
  }

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Inventory Value Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <p className="text-sm text-muted-foreground">Total Stock Value</p>
          <p className="text-2xl font-bold">${getTotalValue().toFixed(2)}</p>
        </div>
        {/* Add more metrics */}
      </div>
    </Card>
  )
}
