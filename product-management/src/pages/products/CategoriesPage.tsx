import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { useStore } from "../../store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"

export function CategoriesPage() {
  const navigate = useNavigate()
  const categories = useStore(state => state.categories)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => navigate('/products/categories/new')}>
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.description}</p>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/products/categories/${category.id}`)}
                >
                  View Products
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
