import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { Plus, Edit, Trash } from "lucide-react"

type Category = {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export function CategoryPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Categories will be loaded from API */}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
