import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Card, CardContent } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Button } from "../../components/ui/Button"
import { Search, Filter, ArrowUpDown, Edit, Archive } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { useNavigate } from "react-router-dom"

export function PublishedProducts() {
  const products = useStore(state => state.products.filter(p => p.status === 'published'))
  const categories = useStore(state => state.categories)
  const getCategoryName = useStore(state => state.getCategoryName)
  const archiveProduct = useStore(state => state.archiveProduct)

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sort, setSort] = useState<'name' | 'price' | 'stock'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all')

  const [productToEdit, setProductToEdit] = useState<string | null>(null)
  const [showConfirmArchive, setShowConfirmArchive] = useState(false)
  const [productToArchive, setProductToArchive] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleEdit = (productId: string) => {
    navigate(`/app/products/${productId}`)
  }

  const handleArchive = (productId: string) => {
    setProductToArchive(productId)
    setShowConfirmArchive(true)
  }

  const confirmArchive = () => {
    if (productToArchive) {
      archiveProduct(productToArchive)
      setShowConfirmArchive(false)
      setProductToArchive(null)
    }
  }

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesPriceRange = (!priceRange.min || product.price >= Number(priceRange.min)) &&
                               (!priceRange.max || product.price <= Number(priceRange.max))
      const matchesStock = stockFilter === 'all' ||
                          (stockFilter === 'low' && product.stock <= 10 && product.stock > 0) ||
                          (stockFilter === 'out' && product.stock <= 0)
      
      return matchesSearch && matchesCategory && matchesPriceRange && matchesStock
    })
    .sort((a, b) => {
      const modifier = sortDir === 'asc' ? 1 : -1
      switch (sort) {
        case 'price': return (a.price - b.price) * modifier
        case 'stock': return (a.stock - b.stock) * modifier
        default: return a.name.localeCompare(b.name) * modifier
      }
    })

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={priceRange.min}
                  onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-24"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={priceRange.max}
                  onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-24"
                />
              </div>

              <Select value={stockFilter} onValueChange={(value: typeof stockFilter) => setStockFilter(value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Stock level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stock levels</SelectItem>
                  <SelectItem value="low">Low stock</SelectItem>
                  <SelectItem value="out">Out of stock</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={sort}
                onValueChange={(value: 'name' | 'price' | 'stock') => {
                  if (sort === value) {
                    setSortDir(current => current === 'asc' ? 'desc' : 'asc')
                  } else {
                    setSort(value)
                    setSortDir('asc')
                  }
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell>KES {product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`${
                    product.stock > 10 ? 'text-green-600' :
                    product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleArchive(product.id)}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showConfirmArchive} onOpenChange={setShowConfirmArchive}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Product</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to archive this product?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowConfirmArchive(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmArchive}>
              Archive
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
