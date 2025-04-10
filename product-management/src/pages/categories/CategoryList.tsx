import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Plus } from "lucide-react"

const DEFAULT_CATEGORIES = [
  {
    id: 'bibles',
    name: 'Bibles',
    description: 'Holy Bibles in different versions and formats'
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Christian literature and study materials'
  },
  {
    id: 'gifts',
    name: 'Gifts & Cards',
    description: 'Christian gifts and greeting cards'
  },
  {
    id: 'stationery',
    name: 'Stationery',
    description: 'Office and school supplies'
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    description: 'Educational toys and games'
  },
  {
    id: 'music',
    name: 'Music & Media',
    description: 'Christian music and multimedia resources'
  }
]

export function CategoriesPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => navigate('/products/categories/new')}>
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEFAULT_CATEGORIES.map((category) => (
          <Card key={category.id} className="cursor-pointer hover:bg-accent/50" 
                onClick={() => navigate(`/products/categories/${category.id}`)}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
