import { useStore } from "../../store/useStore"
import { Card } from "../../components/ui/Card"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Box as BoxIcon, AlertTriangle, MinusCircle, TrendingUp } from "lucide-react"

export function InventoryReport() {
  const inventory = useStore(state => state.inventory)
  const products = useStore(state => state.products)

  const stats = {
    totalValue: Object.values(inventory).reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId)
      return sum + (item.currentStock * (product?.price || 0))
    }, 0),
    outOfStock: Object.values(inventory).filter(item => item.currentStock === 0).length,
    lowStock: Object.values(inventory).filter(item => 
      item.currentStock > 0 && item.currentStock <= item.minimumStock
    ).length,
    totalProducts: products.length
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BoxIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <p className="text-2xl font-bold">{stats.lowStock}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MinusCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold">{stats.outOfStock}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Stock Level Details</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Min. Stock</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(inventory).map(item => {
              const product = products.find(p => p.id === item.productId)
              return (
                <TableRow key={item.productId}>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{item.currentStock}</TableCell>
                  <TableCell>{item.minimumStock}</TableCell>
                  <TableCell>
                    ${((product?.price || 0) * item.currentStock).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {item.currentStock === 0 ? (
                      <span className="text-red-500">Out of Stock</span>
                    ) : item.currentStock <= item.minimumStock ? (
                      <span className="text-yellow-500">Low Stock</span>
                    ) : (
                      <span className="text-green-500">In Stock</span>
                    )}
                  </TableCell>
                </TableRow>
              )}
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
