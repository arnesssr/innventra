import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { useStore } from "../../store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Button } from "../../components/ui/Button"
import { Search, Filter, Plus, ArrowUpDown, Calendar, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function ProductsPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("name-asc")
  
  const products = useStore(state => state.products)
  const categories = useStore(state => state.categories)

  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || 'categories'

  useEffect(() => {
    // Redirect to categories by default
    if (location.pathname === '/products') {
      navigate('/products/categories')
    }
  }, [location, navigate])

  // Only show products list in published/drafts routes
  const showProductsList = currentPath === 'published' || currentPath === 'drafts'

  // Add this check
  if (location.pathname === '/products') {
    navigate('/products/categories')
    return null
  }

  // Filter products based on status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || product.category === filter
    const matchesStatus = currentPath === 'published' 
      ? product.status === 'published'
      : currentPath === 'drafts' 
      ? product.status === 'draft'
      : true
    return matchesSearch && matchesFilter && matchesStatus
  }).sort((a, b) => {
    switch (sort) {
      case "name-asc": return a.name.localeCompare(b.name)
      case "name-desc": return b.name.localeCompare(a.name)
      case "price-asc": return a.price - b.price
      case "price-desc": return b.price - a.price
      default: return 0
    }
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
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

      {!showProductsList ? (
        <Outlet />
      ) : (
        <>
          {/* Filters and product grid for published/drafts views */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={filter} onValueChange={setFilter} defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Filter by category</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger>
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                      <SelectItem value="price-desc">Price (High-Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <div className="divide-y">
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <div className="p-4 hover:bg-accent/50 transition-colors flex items-center gap-4">
                    {/* Product Image */}
                    {product.images?.[0] && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{product.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>KES {product.price.toLocaleString()}</span>
                        <span>•</span>
                        <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <Card className="p-12 text-center">
              <div className="max-w-sm mx-auto space-y-4">
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
