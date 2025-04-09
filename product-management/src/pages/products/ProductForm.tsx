import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { useStore } from "../../store/useStore"

interface ProductFormProps {
  category?: string;
}

export function ProductForm({ category }: ProductFormProps) {
  const navigate = useNavigate()
  const addProduct = useStore(state => state.addProduct)

  const [formData, setFormData] = useState({
    name: '',
    category: category || '',
    price: '',
    stock: '',
    isbn: '',
    author: '',
    version: '',
    coverType: '',
    description: '',
    status: 'draft' as const
  })

  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    addProduct({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status
    })
    navigate('/products')
  }

  const renderCategoryFields = () => {
    switch (category) {
      case 'books':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>ISBN</label>
              <Input
                value={formData.isbn}
                onChange={e => setFormData({ ...formData, isbn: e.target.value })}
                placeholder="Enter ISBN"
              />
            </div>
            <div className="space-y-2">
              <label>Author</label>
              <Input
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                placeholder="Enter author name"
              />
            </div>
          </div>
        )
      case 'bibles':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>Version</label>
              <Select value={formData.version} onValueChange={value => setFormData({ ...formData, version: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KJV">King James Version</SelectItem>
                  <SelectItem value="NIV">New International Version</SelectItem>
                  <SelectItem value="ESV">English Standard Version</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label>Cover Type</label>
              <Select value={formData.coverType} onValueChange={value => setFormData({ ...formData, coverType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cover type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leather">Leather</SelectItem>
                  <SelectItem value="hardcover">Hardcover</SelectItem>
                  <SelectItem value="paperback">Paperback</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'New Product'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label>Product Name</label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Price (KES)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Stock Quantity</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={e => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {renderCategoryFields()}

            <div className="space-y-2">
              <label>Description</label>
              <textarea
                className="w-full rounded-md border p-2"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Enter product description"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={e => handleSubmit(e, 'draft')}>
                Save as Draft
              </Button>
              <Button onClick={e => handleSubmit(e, 'published')}>
                Publish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
