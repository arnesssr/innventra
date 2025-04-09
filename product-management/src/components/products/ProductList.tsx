import { Plus } from 'lucide-react'

export function ProductList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white">
          <Plus size={20} />
          Add Product
        </button>
      </div>
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Product</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {/* Product rows will go here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
