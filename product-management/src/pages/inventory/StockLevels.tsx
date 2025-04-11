import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { useStore } from "../../store/useStore"
import { AlertTriangle, CheckCircle, ShoppingCart } from "lucide-react"
import { Input } from "../../components/ui/Input"
import { useState } from "react"

export function StockLevels() {
  const inventory = useStore(state => state.inventory)
  const updateMinimumStock = useStore(state => state.updateMinimumStock)

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= 0) return { label: 'Out of Stock', color: 'text-red-500', icon: AlertTriangle }
    if (current <= minimum) return { label: 'Low Stock', color: 'text-amber-500', icon: AlertTriangle }
    return { label: 'In Stock', color: 'text-green-500', icon: CheckCircle }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Current Stock</TableCell>
            <TableCell>Min. Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(inventory).map((item) => {
            const status = getStockStatus(item.currentStock, item.minimumStock)
            
            return (
              <TableRow key={item.productId}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.categoryId}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.minimumStock}
                    onChange={e => updateMinimumStock(item.productId, parseInt(e.target.value))}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <div className={`flex items-center ${status.color}`}>
                    <status.icon className="h-4 w-4 mr-2" />
                    {status.label}
                  </div>
                </TableCell>
                <TableCell>
                  {item.currentStock <= item.minimumStock && (
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Reorder
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
