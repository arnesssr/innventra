import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { useStore } from "../../store/useStore"
import { AlertTriangle, CheckCircle, ShoppingCart, ArrowUpDown, Filter } from "lucide-react"
import { Input } from "../../components/ui/Input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Card } from "../../components/ui/Card"
import { useNavigate, useSearchParams } from "react-router-dom"
import { cn } from "../../lib/utils"

export function StockLevels() {
  const navigate = useNavigate()
  // State for filtering and sorting
  const [sortBy, setSortBy] = useState<'stock' | 'name' | 'category'>('stock')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filterStatus, setFilterStatus] = useState<'all' | 'low' | 'out'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const inventory = useStore(state => state.inventory)
  const updateMinimumStock = useStore(state => state.updateMinimumStock)
  const categories = useStore(state => state.categories)

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= 0) return { 
      label: 'Out of Stock', 
      color: 'text-red-500', 
      icon: AlertTriangle,
      severity: 'critical'
    }
    if (current <= minimum) return { 
      label: 'Low Stock', 
      color: 'text-amber-500', 
      icon: AlertTriangle,
      severity: 'warning'
    }
    return { 
      label: 'In Stock', 
      color: 'text-green-500', 
      icon: CheckCircle,
      severity: 'good'
    }
  }

  const handleCreateOrder = (productId: string) => {
    // Navigate to orders tab with query params
    navigate(`/app/inventory?tab=orders&action=new&productId=${productId}`)
  }

  // Filter and sort inventory items
  const filteredItems = Object.values(inventory)
    .filter(item => {
      if (filterStatus === 'out') return item.currentStock <= 0
      if (filterStatus === 'low') return item.currentStock <= item.minimumStock && item.currentStock > 0
      return true
    })
    .filter(item => categoryFilter === 'all' || item.categoryId === categoryFilter)
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1
      switch (sortBy) {
        case 'stock':
          return (a.currentStock - b.currentStock) * modifier
        case 'name':
          return a.productName.localeCompare(b.productName) * modifier
        case 'category':
          return a.categoryId.localeCompare(b.categoryId) * modifier
        default:
          return 0
      }
    })

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSortOrder(current => current === 'asc' ? 'desc' : 'asc')
            }}
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      </Card>

      {/* Stock Levels Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Current Stock</TableCell>
            <TableCell>Min. Stock</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => {
            const status = getStockStatus(item.currentStock, item.minimumStock)
            
            return (
              <TableRow 
                key={item.productId}
                className={cn({
                  'bg-red-50/50 dark:bg-red-950/20': status.severity === 'critical',
                  'bg-amber-50/50 dark:bg-amber-950/20': status.severity === 'warning'
                })}
              >
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.categoryId}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={item.minimumStock}
                      onChange={e => updateMinimumStock(item.productId, parseInt(e.target.value))}
                      className="w-20"
                    />
                    <div className="text-xs text-muted-foreground">
                      Alert when below
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center ${status.color}`}>
                    <status.icon className="h-4 w-4 mr-2" />
                    {status.label}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
