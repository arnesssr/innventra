import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { Book, BookOpen, Gift, PenTool, Gamepad } from "lucide-react"

export function CategoriesPage() {
  const navigate = useNavigate()
  
  const handleAddNew = (categoryId: string) => {
    navigate(`/products/new/${categoryId}`) // Navigate to form with category
  }

  const categories = [
    { id: 'bibles', name: 'Bibles', icon: BookOpen, description: 'Holy Bibles in different versions and formats' },
    { id: 'books', name: 'Books', icon: Book, description: 'Christian literature and study materials' },
    { id: 'gifts', name: 'Gifts & Cards', icon: Gift, description: 'Christian gifts and greeting cards' },
    { id: 'stationery', name: 'Stationery', icon: PenTool, description: 'Office and school supplies' },
    { id: 'toys', name: 'Toys & Games', icon: Gamepad, description: 'Educational toys and games' }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map(({ id, name, icon: Icon, description }) => (
        <Card key={id} className="hover:bg-accent/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <CardTitle className="text-lg">{name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/products/categories/${id}`)}
              >
                View Products
              </Button>
              <Button onClick={() => handleAddNew(id)}>
                Add New
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
