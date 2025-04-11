import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { useStore } from "../../store/useStore"
import { AlertTriangle } from "lucide-react"

export function InventoryList() {
  const inventory = useStore(state => state.inventory)
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Current Stock</TableCell>
            <TableCell>Minimum Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(inventory).map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.categoryId}</TableCell>
              <TableCell>{item.currentStock}</TableCell>
              <TableCell>{item.minimumStock}</TableCell>
              <TableCell>
                {item.currentStock <= item.minimumStock && (
                  <div className="flex items-center text-amber-500">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Low Stock
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Button size="sm">Adjust Stock</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
