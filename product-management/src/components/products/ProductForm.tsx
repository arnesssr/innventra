import { useState } from 'react'
import { ImagePlus, Save, X } from 'lucide-react'

interface ProductFormData {
  name: string
  category: string
  price: string
  stock: number
  description: string
  sku: string
  tags: string[]
  images: string[]
  brand: string
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  specifications: Array<{ key: string; value: string }>
}

export function ProductForm() {
  const [product, setProduct] = useState<ProductFormData>({
    name: '',
    category: '',
    price: '',
    stock: 0,
    description: '',
    sku: '',
    tags: [],
    images: [],
    brand: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    specifications: []
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateProduct(product)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    // TODO: Submit product
  }

  const addSpecification = () => {
    setProduct(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
            className="w-full rounded-lg border p-2"
          />
          {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">SKU</label>
          <input
            type="text"
            value={product.sku}
            onChange={e => setProduct({ ...product, sku: e.target.value })}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Brand</label>
          <input
            type="text"
            value={product.brand}
            onChange={e => setProduct({ ...product, brand: e.target.value })}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={4}
            value={product.description}
            onChange={e => setProduct({ ...product, description: e.target.value })}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium">Specifications</label>
          <div className="space-y-2">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex gap-2">
                <input
                  placeholder="Key"
                  value={spec.key}
                  onChange={e => {
                    const newSpecs = [...product.specifications]
                    newSpecs[index].key = e.target.value
                    setProduct({ ...product, specifications: newSpecs })
                  }}
                  className="w-1/3 rounded-lg border p-2"
                />
                <input
                  placeholder="Value"
                  value={spec.value}
                  onChange={e => {
                    const newSpecs = [...product.specifications]
                    newSpecs[index].value = e.target.value
                    setProduct({ ...product, specifications: newSpecs })
                  }}
                  className="w-2/3 rounded-lg border p-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="text-sm text-primary hover:underline"
            >
              + Add Specification
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Product
        </button>
      </div>
    </form>
  )
}

function validateProduct(product: ProductFormData) {
  const errors: Partial<Record<keyof ProductFormData, string>> = {}
  if (!product.name) errors.name = 'Product name is required'
  if (!product.price) errors.price = 'Price is required'
  if (!product.category) errors.category = 'Category is required'
  return errors
}
