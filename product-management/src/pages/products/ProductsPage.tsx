import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"

export function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to published if we're at /products root
  if (location.pathname === '/products') {
    navigate('/products/published')
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => navigate('/products/new')}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <Tabs defaultValue="published" onValueChange={(value) => navigate(`/products/${value}`)}>
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
