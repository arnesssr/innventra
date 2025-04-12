import { Link } from "react-router-dom"
import { useStore } from "../../store/useStore"
import { Card, CardContent } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Book, Gift, PenTool, Baby, Package, Plus, ChevronRight, BookOpen } from "lucide-react"

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  books: <Book className="h-5 w-5" />,
  bibles: <BookOpen className="h-5 w-5" />,
  gifts: <Gift className="h-5 w-5" />,
  stationery: <PenTool className="h-5 w-5" />,
  toys: <Baby className="h-5 w-5" />,
}

export function CategoriesPage() {
  const categories = useStore(state => state.categories)
  const products = useStore(state => state.products)

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link to="/products/categories/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => {
          const categoryProducts = products.filter(p => p.category === category.id)
          const publishedCount = categoryProducts.filter(p => p.status === 'published').length
          const draftsCount = categoryProducts.filter(p => p.status === 'draft').length

          return (
            <Link key={category.id} to={`/products/new/${category.id}`}>
              <Card className="group hover:shadow-lg transition-all border border-border/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div className={`
                        p-2.5 rounded-lg w-fit 
                        bg-primary/10 text-primary
                        group-hover:bg-primary/20 transition-colors
                      `}>
                        {CATEGORY_ICONS[category.id] || <Package className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      {categoryProducts.length} items
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span>{publishedCount} published</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                      <span>{draftsCount} drafts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}

        {categories.length === 0 && (
          <Card className="col-span-full p-12 text-center">
            <div className="max-w-sm mx-auto space-y-4">
              <h3 className="text-lg font-semibold">No categories yet</h3>
              <p className="text-muted-foreground">
                Create a category to start adding products
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
