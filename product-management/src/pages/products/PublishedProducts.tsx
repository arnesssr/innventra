import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Card, CardContent } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Button } from "../../components/ui/Button"
import { Filter, ArrowUpDown, Edit, Archive, MinusCircle, PlusCircle, Loader2, FileDown } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { useNavigate } from "react-router-dom"
import { Checkbox } from "../../components/ui/Checkbox"
import { useToast } from "../../components/ui/use-toast"

/**
 * PublishedProducts Component
 * Displays a filterable, sortable table of published products with quick actions
 * Features:
 * - Category filtering
 * - Price range filtering
 * - Stock level filtering
 * - Quick stock adjustments
 * - Archive functionality
 * - Bulk actions
 * - Loading states
 * - Error handling
 * - Export functionality
 */
export function PublishedProducts() {
  // Get products and store actions
  const products = useStore(state => state.products.filter(p => p.status === 'published'))
  const categories = useStore(state => state.categories)
  const getCategoryName = useStore(state => state.getCategoryName)
  const archiveProduct = useStore(state => state.archiveProduct)
  const adjustProductStock = useStore(state => state.adjustProductStock)

  // Filter and sort state
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sort, setSort] = useState<'name' | 'price' | 'stock'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all')

  // Dialog state for archive confirmation
  const [showConfirmArchive, setShowConfirmArchive] = useState(false)
  const [productToArchive, setProductToArchive] = useState<string | null>(null)

  // Bulk actions state
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  // Loading and error state
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { toast } = useToast() // temporary fix

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  /**
   * Handles navigation to edit product page
   */
  const handleEdit = (productId: string) => {
    navigate(`/app/products/${productId}`)
  }

  /**
   * Opens archive confirmation dialog
   */
  const handleArchive = (productId: string) => {
    setProductToArchive(productId)
    setShowConfirmArchive(true)
  }

  /**
   * Confirms and executes product archival
   */
  const confirmArchive = () => {
    if (productToArchive) {
      archiveProduct(productToArchive)
      setShowConfirmArchive(false)
      setProductToArchive(null)
    }
  }

  /**
   * Updates product stock with optimistic update
   */
  const handleQuickStockAdjust = async (productId: string, adjustment: number) => {
    try {
      await adjustProductStock(productId, adjustment)
      toast({
        title: "Stock updated",
        description: "Product stock has been adjusted successfully."
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update stock. Please try again.",
        variant: "destructive"
      })
    }
  }

  /**
   * Handles selecting all products
   */
  const handleSelectAll = (checked: boolean) => {
    setSelectedProducts(checked ? filteredProducts.map(p => p.id) : [])
  }

  /**
   * Handles selecting a single product
   */
  const handleSelectProduct = (productId: string, checked: boolean) => {
    setSelectedProducts(prev => 
      checked ? [...prev, productId] : prev.filter(id => id !== productId)
    )
  }

  /**
   * Handles bulk archival of selected products
   */
  const handleBulkArchive = () => {
    selectedProducts.forEach(id => archiveProduct(id))
    setSelectedProducts([])
  }

  /**
   * Handles exporting product data to CSV
   */
  const handleExport = () => {
    const exportData = filteredProducts.map(product => ({
      Name: product.name,
      Category: getCategoryName(product.category),
      Price: product.price,
      Stock: product.stock,
      Status: product.status,
      LastUpdated: product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'Not updated'
    }))

    const csv = [
      Object.keys(exportData[0]).join(','), // Header
      ...exportData.map(row => Object.values(row).join(',')) // Data rows
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `products-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  /**
   * Applies all active filters and sorting to products
   * Filtering order: category > price > stock
   * Then applies selected sorting
   */
  const filteredProducts = products
    .filter(product => {
      // Apply category filter
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      
      // Apply price range filter
      const matchesPriceRange = (!priceRange.min || product.price >= Number(priceRange.min)) &&
                               (!priceRange.max || product.price <= Number(priceRange.max))
      
      // Apply stock level filter
      const matchesStock = stockFilter === 'all' ||
                          (stockFilter === 'low' && product.stock <= 10 && product.stock > 0) ||
                          (stockFilter === 'out' && product.stock <= 0)
      
      return matchesCategory && matchesPriceRange && matchesStock
    })
    .sort((a, b) => {
      const modifier = sortDir === 'asc' ? 1 : -1
      switch (sort) {
        case 'price': return (a.price - b.price) * modifier
        case 'stock': return (a.stock - b.stock) * modifier
        default: return a.name.localeCompare(b.name) * modifier
      }
    })

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => setError(null)}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
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
            <Select value={sort} onValueChange={(value: 'name' | 'price' | 'stock') => {
              if (sort === value) {
                setSortDir(current => current === 'asc' ? 'desc' : 'asc')
              } else {
                setSort(value)
                setSortDir('asc')
              }
            }}>
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
            <Button 
              variant="outline" 
              onClick={handleExport}
              className="ml-auto"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
          <span>{selectedProducts.length} items selected</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBulkArchive}
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected
          </Button>
        </div>
      )}

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  <Checkbox 
                    checked={selectedProducts.length === filteredProducts.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) => 
                        handleSelectProduct(product.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.imageUrls[0] && (
                        <img
                          src={product.imageUrls[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.description.slice(0, 50)}...</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryName(product.category)}</TableCell>
                  <TableCell>KES {product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`${
                        product.stock > 10 ? 'text-green-600' :
                        product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {product.stock}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuickStockAdjust(product.id, -1)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuickStockAdjust(product.id, 1)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.updatedAt 
                      ? new Date(product.updatedAt).toLocaleDateString()
                      : 'Not updated'
                    }
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
        )}
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
            <Button variant="default" onClick={confirmArchive}>
              Archive
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
