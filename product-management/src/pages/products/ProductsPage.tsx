import { Button } from "../../components/ui/Button"
import { Plus, Book, BookOpen, Gift, PenTool, Gamepad } from "lucide-react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"

const categories = [
  { id: 'books', name: 'Books', icon: Book },
  { id: 'bibles', name: 'Bibles', icon: BookOpen },
  { id: 'gifts', name: 'Gifts & Cards', icon: Gift },
  { id: 'stationery', name: 'Stationery', icon: PenTool },
  { id: 'toys', name: 'Toys & Games', icon: Gamepad },
]

export function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const getCurrentTab = () => {
    if (location.pathname.includes('/drafts')) return "drafts"
    if (location.pathname.includes('/categories')) return "categories"
    return "published"
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <Tabs defaultValue={getCurrentTab()} onValueChange={value => navigate(`/products/${value}`)}>
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
      </Tabs>

      <Outlet />

      <Button 
        className="fixed bottom-6 right-6" 
        size="lg"
        onClick={() => navigate('/products/new')}
      >
        <Plus className="mr-2 h-5 w-5" /> Add Product
      </Button>
    </div>
  )
}
