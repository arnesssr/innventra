import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"

export function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || 'categories'

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <Tabs 
        value={currentPath}
        onValueChange={(value) => navigate(`/app/products/${value}`)}
      >
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
