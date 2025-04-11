import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface CategoryProductsListProps {
  category: string;
}

export function CategoryProductsList({ category }: CategoryProductsListProps) {
  const navigate = useNavigate()
  const products = useStore(state => 
    state.products.filter(p => p.category === category && p.status === 'published')
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold capitalize">{category}</h2>
        <Button onClick={() => navigate(`/products/add/${category}`)}>
          <Plus className="h-4 w-4 mr-2" /> Add {category}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>KES {product.price.toLocaleString()}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
