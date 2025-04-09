import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table"
import { Button } from "@/components/ui/Button"
import { Plus, Edit, Trash } from "lucide-react"

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
            {['Electronics', 'Books', 'Clothing'].map((category) => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                <TableCell>24</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="sm"><Trash className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
