import { Button } from "../../components/ui/Button"
import { Plus, Book, BookOpen, Gift, PenTool, Gamepad } from "lucide-react"
import { useNavigate, Outlet } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"

const categories = [
  { id: 'books', name: 'Books', icon: Book },
  { id: 'bibles', name: 'Bibles', icon: BookOpen },
  { id: 'gifts', name: 'Gifts & Cards', icon: Gift },
  { id: 'stationery', name: 'Stationery', icon: PenTool },
  { id: 'toys', name: 'Toys & Games', icon: Gamepad },
]

export function ProductsPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ id, name, icon: Icon }) => (
          <Card key={id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <Icon className="h-4 w-4 inline-block mr-2" />
                {name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => navigate(`/products/${id}/add`)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add {name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Outlet />
    </div>
  )
}
