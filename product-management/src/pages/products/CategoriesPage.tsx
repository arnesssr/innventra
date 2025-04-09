import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { useStore } from "../../store/useStore"

export function CategoriesPage() {
  const categories = [
    { id: 'books', name: 'Books', count: 0 },
    { id: 'bibles', name: 'Bibles', count: 0 },
    { id: 'gifts', name: 'Gifts & Cards', count: 0 },
    { id: 'stationery', name: 'Stationery', count: 0 },
    { id: 'toys', name: 'Toys & Games', count: 0 }
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.count}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Products</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
