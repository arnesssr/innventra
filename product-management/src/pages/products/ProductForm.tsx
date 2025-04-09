import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { useStore } from "../../store/useStore"
import { Trash } from "lucide-react"

interface ProductFormProps {
  category?: string;
}

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  images: File[]; // Change from single image to multiple
  stock: number;
  status: 'draft' | 'published';
  isbn?: string;
  version?: string;
  coverType?: string;
  author?: string;
  genre?: string;
}

const BIBLE_VERSIONS = [
  { value: "KJV", label: "King James Version" },
  { value: "NIV", label: "New International Version" },
  { value: "ESV", label: "English Standard Version" },
  { value: "NKJV", label: "New King James Version" },
  { value: "NLT", label: "New Living Translation" }
]

const COVER_TYPES = [
  { value: "leather", label: "Leather" },
  { value: "hardcover", label: "Hardcover" },
  { value: "paperback", label: "Paperback" },
  { value: "bonded", label: "Bonded Leather" },
  { value: "imitation", label: "Imitation Leather" }
]

const BOOK_GENRES = [
  { value: "biblical-studies", label: "Biblical Studies" },
  { value: "christian-living", label: "Christian Living" },
  { value: "devotional", label: "Devotional" },
  { value: "theology", label: "Theology" },
  { value: "prayer", label: "Prayer" },
  { value: "worship", label: "Worship" },
  { value: "ministry", label: "Ministry" },
  { value: "evangelism", label: "Evangelism" },
  { value: "discipleship", label: "Discipleship" },
  { value: "family", label: "Marriage & Family" },
  { value: "leadership", label: "Leadership" },
  { value: "youth", label: "Youth" },
  { value: "children", label: "Children's" },
  { value: "biography", label: "Biography" },
  { value: "fiction", label: "Fiction" }
]

export function ProductForm() {
  const { category } = useParams() // Get category from URL
  const navigate = useNavigate()
  const addProduct = useStore(state => state.addProduct)

  // Initialize form with category from URL
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: category || "", // Set initial category from URL
    price: "",
    description: "",
    images: [], // Initialize empty array for images
    stock: 0,
    status: 'draft'
  })

  // Update category when URL param changes
  useEffect(() => {
    if (category) {
      setFormData(prev => ({ ...prev, category }))
    }
  }, [category])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    const submitData = {
      ...formData,
      status,
      price: parseFloat(formData.price),
    }
    
    // Here you would typically save to your store/backend
    addProduct(submitData)

    // Navigate based on status
    if (status === 'draft') {
      navigate('/products/drafts')
    } else {
      navigate('/products/published')
    }
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

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'bibles':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>ISBN</label>
              <Input
                value={formData.isbn || ''}
                onChange={e => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
                placeholder="Enter ISBN number"
              />
            </div>
            <div className="space-y-2">
              <label>Version</label>
              <Select
                value={formData.version}
                onValueChange={value => setFormData(prev => ({ ...prev, version: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {BIBLE_VERSIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label>Cover Type</label>
              <Select
                value={formData.coverType}
                onValueChange={value => setFormData(prev => ({ ...prev, coverType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cover type" />
                </SelectTrigger>
                <SelectContent>
                  {COVER_TYPES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 'books':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>ISBN</label>
              <Input
                value={formData.isbn || ''}
                onChange={e => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
                placeholder="Enter ISBN number"
              />
            </div>
            <div className="space-y-2">
              <label>Author</label>
              <Input
                value={formData.author || ''}
                onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Enter author name"
              />
            </div>
            <div className="space-y-2">
              <label>Genre</label>
              <Select
                value={formData.genre}
                onValueChange={value => setFormData(prev => ({ ...prev, genre: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {BOOK_GENRES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
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
                  onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {renderCategorySpecificFields()}

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

            {/* Images Upload Section */}
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
              
              {/* Image Preview */}
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
