import { Card } from "../../../components/ui/Card"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../../components/ui/Table"
import { useStore } from "../../../store/useStore"
import { AlertTriangle } from "lucide-react"
import { Button } from "../../../components/ui/Button"
import { useNavigate } from "react-router-dom"

export function StockAlerts() {
  const navigate = useNavigate()
  const inventory = useStore(state => state.inventory)
  const getCategoryName = useStore(state => state.getCategoryName)

  // Filter items that need attention
  const alertItems = Object.values(inventory).filter(item => 
    item.currentStock <= item.minimumStock
  )

  // Navigate to orders tab with pre-filled data
  const handleCreateOrder = (productId: string) => {
    navigate('/app/inventory?tab=orders&action=new&productId=' + productId)
  }

  return (
    <div className="space-y-4">
      <Card>
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
            {alertItems.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium">{item.productName}</TableCell>
                <TableCell>{getCategoryName(item.categoryId)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{item.currentStock}</span>
                    {item.currentStock === 0 ? (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.minimumStock}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertTriangle className="w-4 h-4" />
                    {item.currentStock === 0 ? 'Out of Stock' : 'Low Stock'}
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCreateOrder(item.productId)}
                  >
                    Create Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
