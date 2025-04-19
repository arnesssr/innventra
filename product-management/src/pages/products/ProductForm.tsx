// Import required dependencies and components
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { useStore } from "../../store/useStore"
import { Trash } from "lucide-react"

// Define interfaces for form field types and category configuration
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

// Category-specific field configurations
const CATEGORY_FIELDS: CategoryFields = {
  books: {
    isbn: { type: 'text', label: 'ISBN', required: true },
    author: { type: 'text', label: 'Author', required: true },
    genre: {
      type: 'select',
      label: 'Genre',
      required: true,
      options: [
        'Fiction',
        'Non-Fiction',
        'Mystery',
        'Science Fiction',
        'Fantasy',
        'Romance',
        'Thriller',
        'Horror',
        'Historical Fiction',
        'Biography',
        'Business',
        'Self-Help',
        'Education',
        'Children\'s',
        'Young Adult',
        'Poetry',
        'Art & Photography',
        'Technology',
        'Science',
        'Health & Fitness',
        'Travel',
        'Cooking',
        'Religious & Spiritual'
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

// Interface for image handling
interface ImageWithPreview {
  file: File;
  previewUrl: string;
}

// Main form data interface
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
  createdAt?: string;
  updatedAt?: string;
  [key: string]: string | number | File[] | undefined;
}

/**
 * ProductForm Component
 * Handles creation and editing of products with dynamic category-specific fields
 * Features:
 * - Dynamic form fields based on category
 * - Image upload and preview
 * - Validation for required fields
 * - Draft and publish functionality
 * - Error handling
 */
export function ProductForm() {
  // Get route parameters and navigation
  const { id, category } = useParams()
  const navigate = useNavigate()

  // Get store actions and state
  const products = useStore(state => state.products)
  const addProduct = useStore(state => state.addProduct)
  const updateProduct = useStore(state => state.updateProduct)
  const getCategoryName = useStore(state => state.getCategoryName)

  /**
   * Initializes form data from existing product or creates new empty form
   */
  const initializeFormData = (existingProduct: any = null): ProductFormData => {
    if (existingProduct) {
      const validImages = existingProduct.images?.filter((img: any) => img instanceof File) || []

      return {
        name: existingProduct.name || '',
        category: existingProduct.category || category || '',
        price: existingProduct.price?.toString() || '',
        description: existingProduct.description || '',
        images: validImages,
        stock: existingProduct.stock || 0,
        status: existingProduct.status || 'draft',
        createdAt: existingProduct.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...Object.entries(existingProduct).reduce((acc, [key, value]) => {
          if (!['name', 'category', 'price', 'description', 'images', 'stock', 'status', 'createdAt', 'updatedAt'].includes(key)) {
            acc[key] = value
          }
          return acc
        }, {} as Record<string, any>)
      }
    }

    return {
      name: '',
      category: category || '',
      price: '',
      description: '',
      images: [],
      stock: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  // Form state management
  const [formData, setFormData] = useState<ProductFormData>(() => {
    if (id) {
      const existingProduct = products.find(p => p.id === id)
      if (existingProduct) {
        return initializeFormData(existingProduct)
      }
    }
    return initializeFormData()
  })

  // Error and image handling state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageUrls, setImageUrls] = useState<string[]>([])

  // Effect hooks for category changes and cleanup
  useEffect(() => {
    if (category) {
      setFormData(prev => ({ ...prev, category }))
    }
  }, [category])

  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [imageUrls])

  /**
   * Validates form data based on product status
   * More stringent validation for published products
   */
  const validateForm = (status: 'draft' | 'published'): boolean => {
    const newErrors: Record<string, string> = {}

    if (status === 'published') {
      if (!formData.name.trim()) newErrors.name = 'Product name is required'
      if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required'
      if (!formData.description.trim()) newErrors.description = 'Description is required'
      if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative'
      if (formData.images.length === 0) newErrors.images = 'At least one image is required'

      if (category && CATEGORY_FIELDS[category]) {
        Object.entries(CATEGORY_FIELDS[category]).forEach(([key, field]) => {
          if (field.required && !formData[key]) {
            newErrors[key] = `${field.label} is required`
          }
        })
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handles form submission for both draft and published states
   */
  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    if (!category) return;

    if (!validateForm(status)) {
      return;
    }

    try {
      const submitData = {
        ...formData,
        status,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(String(formData.stock)) || 0,
        category,
        categoryName: getCategoryName(category),
        id: id || Date.now().toString(),
        images: formData.images.map((file: File): ImageWithPreview => ({
          file,
          previewUrl: URL.createObjectURL(file)
        })),
        imageUrls: formData.images.map((file: File) => URL.createObjectURL(file)),
        updatedAt: new Date().toISOString(),
        createdAt: formData.createdAt || new Date().toISOString()
      };

      if (id) {
        updateProduct(id, submitData);
      } else {
        addProduct(submitData);
      }

      navigate(status === 'draft' ? '/app/products/drafts' : '/app/products/published');
    } catch (error) {
      console.error('Error saving product:', error);
      // Add error handling/notification here
    }
  }

  /**
   * Handles image upload and preview generation
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
    
    const newUrls = files.map(file => URL.createObjectURL(file))
    setImageUrls(prev => [...prev, ...newUrls])
  }

  /**
   * Removes image from form and revokes object URL
   */
  const removeImage = (index: number) => {
    URL.revokeObjectURL(imageUrls[index])
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  /**
   * Updates form field values
   */
  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  /**
   * Renders category-specific form fields dynamically
   */
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
              <>
                <Input
                  type={field.type}
                  value={typeof formData[key] === 'string' || typeof formData[key] === 'number' ? formData[key] : ''}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required={field.required}
                  className={errors[key] ? 'border-red-500' : ''}
                />
                {errors[key] && <span className="text-sm text-red-500">{errors[key]}</span>}
              </>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Component render
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>{id ? 'Edit' : 'Add'} {getCategoryName(category || '')} Product</CardTitle>
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
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
              </div>
              <div className="space-y-2">
                <label>Price (KES)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <span className="text-sm text-red-500">{errors.price}</span>}
              </div>
              <div className="space-y-2">
                <label>Stock Quantity</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                  className={errors.stock ? 'border-red-500' : ''}
                />
                {errors.stock && <span className="text-sm text-red-500">{errors.stock}</span>}
              </div>
            </div>

            {renderCategoryFields()}

            <div className="space-y-2">
              <label>Description</label>
              <textarea
                className={`w-full rounded-md border p-2 ${errors.description ? 'border-red-500' : ''}`}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Enter product description"
              />
              {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
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
                      src={imageUrls[index]}
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
              {errors.images && <span className="text-sm text-red-500">{errors.images}</span>}
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
