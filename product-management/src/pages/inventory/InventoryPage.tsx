import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { useState } from "react"

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export function InventoryPage() {
  const [inventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Product 1', sku: 'SKU001', stock: 45, status: 'In Stock' },
    { id: '2', name: 'Product 2', sku: 'SKU002', stock: 5, status: 'Low Stock' },
  ])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Update Stock</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'In Stock' ? 'default' : 'destructive'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Update Stock</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
