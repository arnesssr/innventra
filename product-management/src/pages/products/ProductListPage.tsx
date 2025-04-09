import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"

export function ProductListPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Product rows will be mapped here */}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
