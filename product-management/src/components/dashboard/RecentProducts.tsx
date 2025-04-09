import { Package } from 'lucide-react'

const recentProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: '$299',
    status: 'In Stock',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$199',
    status: 'Low Stock',
    category: 'Books'
  }
]

export function RecentProducts() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">Recent Products</h2>
      <div className="space-y-4">
        {recentProducts.map(product => (
          <div key={product.id} className="flex items-center gap-4 rounded-lg border p-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{product.price}</p>
              <p className="text-sm text-muted-foreground">{product.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
