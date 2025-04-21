import { useStore } from "../../../store/useStore"
import { Card } from "../../../components/ui/Card"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../../components/ui/Table"
import { Button } from "../../../components/ui/Button"
import { ShoppingCart, AlertTriangle, XCircle, Bell } from "lucide-react"
import type { AlertType } from "../../../types/inventoryTypes"

/**
 * StockAlerts Component
 * Displays alerts for low stock and out of stock items
 * Allows quick reordering of items that need attention
 */
export function StockAlerts(): JSX.Element {  // Add proper return type
  const inventory = useStore(state => state.inventory)
  const categories = useStore(state => state.categories)

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'out_of_stock':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case 'reorder_point':
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  const alerts = Object.values(inventory)
    .filter(item => {
      const threshold = item.alertThreshold || item.minimumStock
      return item.currentStock <= threshold
    })
    .map(item => ({
      id: item.productId,
      productId: item.productId,
      productName: item.productName,
      type: item.currentStock === 0 ? 'out_of_stock' as AlertType : 'low_stock' as AlertType,
      threshold: item.alertThreshold || item.minimumStock,
      currentStock: item.currentStock,
      category: categories.find(c => c.id === item.categoryId)?.name || 'Unknown'
    }))
    .sort((a, b) => {
      // Sort by severity: out of stock first, then low stock
      if (a.type === 'out_of_stock' && b.type !== 'out_of_stock') return -1
      if (b.type === 'out_of_stock' && a.type !== 'out_of_stock') return 1
      return a.currentStock - b.currentStock
    })

  return (  // Make sure to return JSX
    <Card className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Alert Type</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Current Stock</TableCell>
            <TableCell>Threshold</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map(alert => (
            <TableRow key={alert.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getAlertIcon(alert.type)}
                  <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                </div>
              </TableCell>
              <TableCell>{alert.productName}</TableCell>
              <TableCell>{alert.category}</TableCell>
              <TableCell>{alert.currentStock}</TableCell>
              <TableCell>{alert.threshold}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Create Order
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {alerts.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No stock alerts at this time
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
