import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { CategoryForm } from "../products/CategoryForm"
import { useStore, type Category } from "../../store/useStore"

export function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showNewCategory, setShowNewCategory] = useState(false)
  const categories = useStore(state => state.categories)
  const addCategory = useStore(state => state.addCategory)
  const isCategories = location.pathname === '/products/categories' || location.pathname === '/products'

  const handleSaveCategory = (categoryData: Omit<Category, 'id'>) => {
    addCategory(categoryData)
    setShowNewCategory(false)
  }

  const renderCategories = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => setShowNewCategory(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer hover:bg-accent/50"
            onClick={() => navigate(`/products/categories/${category.id}`)}
          >
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <CategoryForm
        open={showNewCategory}
        onClose={() => setShowNewCategory(false)}
        onSave={handleSaveCategory}
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <Tabs 
        value={location.pathname.includes('categories') ? 'categories' : 
               location.pathname.includes('published') ? 'published' : 'drafts'}
        onValueChange={(value) => navigate(`/products/${value}`)}
      >
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        {isCategories ? renderCategories() : <Outlet />}
      </div>
    </div>
  )
}
