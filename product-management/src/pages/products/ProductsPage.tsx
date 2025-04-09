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
  const isDrafts = location.pathname.includes('/drafts')

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      <Tabs defaultValue={isDrafts ? "drafts" : "published"} onValueChange={(value) => {
        navigate(value === "drafts" ? "/products/drafts" : "/products")
      }}>
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="published">
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
        </TabsContent>
        <TabsContent value="drafts">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Draft products content can be added here */}
          </div>
        </TabsContent>
      </Tabs>

      <Outlet />
    </div>
  )
}
