import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"

export function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.includes('published') ? 'published'
    : location.pathname.includes('drafts') ? 'drafts'
    : 'categories'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <Tabs 
        value={currentPath}
        onValueChange={(value) => navigate(`/products/${value}`)}
      >
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
