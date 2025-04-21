// Import required dependencies and components
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { useStore } from "../../store/useStore"
import { Trash } from "lucide-react"
import { VariationManager } from "../../features/products/variations/VariationManager"
import { generateSKU } from "../../utils/productUtils" // Create this utility
import { validateImage, createSafeObjectURL } from '../../utils/imageUtils'
import type { Variation, VariantCombination } from '../../types/variationTypes'
import { JSX } from "react/jsx-runtime"

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
  variations: Variation[];
  variants: VariantCombination[];
  hasVariations: boolean;
  basePrice: number;
  [key: string]: string | number | File[] | undefined | any[] | boolean;
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
        variations: existingProduct.variations || [],
        variants: existingProduct.variants || [],
        hasVariations: existingProduct.hasVariations || false,
        basePrice: parseFloat(existingProduct.price) || 0,
        ...Object.entries(existingProduct).reduce((acc, [key, value]) => {
          if (!['name', 'category', 'price', 'description', 'images', 'stock', 'status', 'createdAt', 'updatedAt', 'variations', 'variants', 'hasVariations', 'basePrice'].includes(key)) {
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
      updatedAt: new Date().toISOString(),
      variations: [],
      variants: [],
      hasVariations: false,
      basePrice: 0
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
   * Safely creates object URLs for images and handles file uploads
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Validate files
    const validatedFiles = await Promise.all(
      files.map(async file => ({
        file,
        valid: await validateImage(file)
      }))
    )
    
    const validFiles = validatedFiles
      .filter(({ valid }) => valid)
      .map(({ file }) => file)

    // Create safe URLs with validation
    const newUrls = validFiles
      .map(file => createSafeObjectURL(file))
      .filter((url): url is string => url !== null)

    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...validFiles] 
    }))
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
   * Handle variation updates from VariationManager
   */
  const handleVariationUpdate = (variations: Variation[], variants: VariantCombination[]) => {
    setFormData(prev => ({
      ...prev,
      variations,
      variants: variants.map(variant => ({
        ...variant,
        price: variant.price || parseFloat(prev.price) || 0,
        stock: variant.stock || 0,
        sku: variant.sku || generateSKU(prev.name, Object.values(variant.combination).join('-'))
      }))
    }))
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

  const renderImagePreview = (file: File, index: number) => {
    const imageUrl = URL.createObjectURL(file)

    return (
      <div 
        key={index} 
        className="relative aspect-square rounded-md overflow-hidden border bg-background"
      >
        <img
          src={imageUrl}
          alt={`Product preview ${index + 1}`}
          className="w-full h-full object-cover"
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => removeImage(index)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // Component render
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{id ? 'Edit' : 'Add'} {getCategoryName(category || '')} Product</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/app/products/categories')}
              >
                Back to Categories
              </Button>
            </div>
          </div>
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
                className="w-full min-h-[100px] rounded-md border bg-background text-foreground p-3 text-sm"
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
                {formData.images.map((file, index) => renderImagePreview(file, index))}
              </div>
              {errors.images && <span className="text-sm text-red-500">{errors.images}</span>}
            </div>

            {/* Variations Section */}
            <div className="border-t mt-6 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Product Variations</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    hasVariations: !prev.hasVariations,
                    variations: !prev.hasVariations ? [] : prev.variations,
                    variants: !prev.hasVariations ? [] : prev.variants
                  }))}
                >
                  {formData.hasVariations ? 'Remove Variations' : 'Add Variations'}
                </Button>
              </div>
              
              {formData.hasVariations && (
                <VariationManager 
                  variations={formData.variations}
                  variants={formData.variants}
                  baseProduct={formData.name}  // Pass full name
                  category={category || ''}    // Pass category
                  basePrice={parseFloat(formData.price) || 0}
                  onUpdate={handleVariationUpdate}
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/app/products/categories')}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={e => handleSubmit(e, 'draft')}
              >
                Save as Draft
              </Button>
              <Button 
                type="button"
                onClick={e => handleSubmit(e, 'published')}
              >
                Publish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
