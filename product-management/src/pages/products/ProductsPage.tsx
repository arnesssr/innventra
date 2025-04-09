import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ProductsPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => navigate('/products/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <div className="rounded-md border">
        {/* Product table will go here */}
      </div>
    </div>
  )
}
