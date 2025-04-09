import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { Book, BookOpen, Gift, PenTool, Gamepad, Plus } from "lucide-react"
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/Dialog"
import { Input } from "../../components/ui/Input"

export function CategoriesPage() {
  const navigate = useNavigate()
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  
  const handleAddNew = (categoryId: string) => {
    navigate(`/products/new/${categoryId}`) // Navigate to form with category
  }

  const handleAddCategory = () => {
    // Add validation and save logic here
    setIsNewCategoryOpen(false)
    setNewCategory({ name: '', description: '' })
  }

  const categories = [
    { id: 'bibles', name: 'Bibles', icon: BookOpen, description: 'Holy Bibles in different versions and formats' },
    { id: 'books', name: 'Books', icon: Book, description: 'Christian literature and study materials' },
    { id: 'gifts', name: 'Gifts & Cards', icon: Gift, description: 'Christian gifts and greeting cards' },
    { id: 'stationery', name: 'Stationery', icon: PenTool, description: 'Office and school supplies' },
    { id: 'toys', name: 'Toys & Games', icon: Gamepad, description: 'Educational toys and games' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Dialog open={isNewCategoryOpen} onOpenChange={setIsNewCategoryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label>Category Name</label>
                <Input
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div className="space-y-2">
                <label>Description</label>
                <textarea
                  className="w-full rounded-md border p-2"
                  value={newCategory.description}
                  onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                />
              </div>
              <Button onClick={handleAddCategory}>Save Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
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
    </div>
  )
}
