import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { useStore } from "../../store/useStore"
import { Trash } from "lucide-react"

interface CategoryField {
  type: 'text' | 'select' | 'number';
  label: string;
  required: boolean;
  options?: string[];
}

interface CategoryFields {
  [key: string]: {
    [key: string]: CategoryField;
  };
}

const CATEGORY_FIELDS: CategoryFields = {
  books: {
    isbn: { type: 'text', label: 'ISBN', required: true },
    author: { type: 'text', label: 'Author', required: true },
    genre: {
      type: 'select',
      label: 'Genre',
      required: true,
      options: [
        'Biblical Studies',
        'Christian Living',
        'Devotional',
        'Theology',
        'Prayer',
        'Worship',
        'Ministry',
        'Evangelism',
        'Discipleship',
        'Marriage & Family',
        'Leadership',
        'Youth',
        'Children\'s',
        'Biography',
        'Fiction'
      ]
    }
  },
  bibles: {
    isbn: { type: 'text', label: 'ISBN', required: true },
    version: {
      type: 'select',
      label: 'Version',
      required: true,
      options: ['KJV', 'NIV', 'ESV', 'NKJV', 'NLT']
    },
    coverType: {
      type: 'select',
      label: 'Cover Type',
      required: true,
      options: ['Leather', 'Hardcover', 'Paperback', 'Bonded Leather', 'Imitation Leather']
    }
  },
  gifts: {
    type: {
      type: 'select',
      label: 'Gift Type',
      required: true,
      options: ['Cards', 'Wall Art', 'Accessories', 'Other']
    }
  },
  stationery: {
    type: {
      type: 'select',
      label: 'Item Type',
      required: true,
      options: ['Notebooks', 'Pens', 'Art Supplies', 'Other']
    }
  },
  toys: {
    ageGroup: {
      type: 'select',
      label: 'Age Group',
      required: true,
      options: ['0-2 years', '3-5 years', '6-8 years', '9+ years']
    }
  }
}

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  images: File[];
  stock: number;
  status: 'draft' | 'published';
  isbn?: string;
  author?: string;
  genre?: string;
  version?: string;
  coverType?: string;
  type?: string;
  ageGroup?: string;
  [key: string]: string | number | File[] | undefined;
}

export function ProductForm() {
  const { category } = useParams()
  const navigate = useNavigate()
  const addProduct = useStore(state => state.addProduct)

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: category || "",
    price: "",
    description: "",
    images: [],
    stock: 0,
    status: 'draft'
  })

  useEffect(() => {
    if (category) {
      setFormData(prev => ({ ...prev, category }))
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    if (!category) return

    const categoryFields = CATEGORY_FIELDS[category as keyof typeof CATEGORY_FIELDS]
    const requiredFields = Object.entries(categoryFields)
      .filter(([_, field]) => field.required)
      .map(([key]) => key)

    const missingFields = requiredFields.filter(field => !formData[field])
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    const submitData = {
      ...formData,
      status,
      price: parseFloat(formData.price),
      category
    }
    
    addProduct(submitData)
    navigate(status === 'draft' ? '/products/drafts' : '/products/published')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const renderCategoryFields = () => {
    if (!category) return null
    
    const categoryFields = CATEGORY_FIELDS[category as keyof typeof CATEGORY_FIELDS]
    if (!categoryFields) return null

    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(categoryFields).map(([key, field]) => (
          <div key={key} className="space-y-2">
            <label>{field.label}{field.required && '*'}</label>
            {field.type === 'select' ? (
              <Select
                value={String(formData[key] ?? '')}
                onValueChange={(value) => handleFieldChange(key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(option => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={field.type}
                value={typeof formData[key] === 'string' || typeof formData[key] === 'number' ? formData[key] : ''}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>
    )
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
                  onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
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

            <div className="space-y-4">
              <label>Product Images</label>
              <div className="flex flex-wrap gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Add Images
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
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
