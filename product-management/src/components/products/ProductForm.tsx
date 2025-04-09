import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/Select"
import { ImagePlus, Upload } from "lucide-react"

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  image: File | null;
  // Book specific fields
  isbn?: string;
  author?: string;
  genre?: string;
  // Bible specific fields
  version?: string;
  coverType?: string;
  stockQuantity: number;
  status: 'draft' | 'published';
  customGenre?: string;
}

const GENRES = [
  // Christian Categories
  "Biblical Studies",
  "Christian Living",
  "Devotional",
  "Theology",
  "Prayer",
  "Worship",
  "Ministry",
  "Evangelism",
  "Discipleship",
  "Marriage & Family",
  "Leadership",
  "Youth",
  "Children's",
  "Biography",
  "Fiction",
  "Commentary",
  "Reference",
  "Pastoral",
  "Missions",
  "Custom"
]

const BIBLE_VERSIONS = [
  "KJV",
  "NIV",
  "ESV",
  "NKJV",
  "NLT",
  "CSB",
  "NASB",
  "Message"
]

const COVER_TYPES = [
  "Leather",
  "Hardcover",
  "Paperback",
  "Bonded Leather",
  "Imitation Leather"
]

export function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
    stockQuantity: 0,
    status: 'draft'
  })

  const [showCustomGenre, setShowCustomGenre] = useState(false)

  const handleFieldChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    setFormData(prev => ({ ...prev, status }))
    console.log(formData)
  }

  const renderGenreFields = () => {
    return (
      <div className="space-y-2">
        <label>Genre</label>
        <Select
          value={formData.genre}
          onValueChange={(value) => {
            if (value === 'custom') {
              setShowCustomGenre(true)
            } else {
              setShowCustomGenre(false)
              handleFieldChange('genre', value)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((genre) => (
              <SelectItem key={genre} value={genre.toLowerCase()}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showCustomGenre && (
          <Input
            value={formData.customGenre || ''}
            onChange={(e) => {
              handleFieldChange('customGenre', e.target.value)
              handleFieldChange('genre', e.target.value.toLowerCase())
            }}
            placeholder="Enter custom genre"
            className="mt-2"
          />
        )}
      </div>
    )
  }

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'books':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>ISBN</label>
              <Input
                value={formData.isbn || ''}
                onChange={(e) => handleFieldChange('isbn', e.target.value)}
                placeholder="Enter ISBN"
              />
            </div>
            <div className="space-y-2">
              <label>Author</label>
              <Input
                value={formData.author || ''}
                onChange={(e) => handleFieldChange('author', e.target.value)}
                placeholder="Enter author name"
              />
            </div>
            {renderGenreFields()}
          </div>
        )

      case 'bibles':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>ISBN</label>
              <Input
                value={formData.isbn || ''}
                onChange={(e) => handleFieldChange('isbn', e.target.value)}
                placeholder="Enter ISBN"
              />
            </div>
            <div className="space-y-2">
              <label>Version</label>
              <Select
                value={formData.version}
                onValueChange={(value) => handleFieldChange('version', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Bible version" />
                </SelectTrigger>
                <SelectContent>
                  {BIBLE_VERSIONS.map((version) => (
                    <SelectItem key={version} value={version.toLowerCase()}>
                      {version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label>Cover Type</label>
              <Select
                value={formData.coverType}
                onValueChange={(value) => handleFieldChange('coverType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cover type" />
                </SelectTrigger>
                <SelectContent>
                  {COVER_TYPES.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Product</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={(e) => handleSubmit(e, 'draft')}
          >
            Save as Draft
          </Button>
          <Button 
            onClick={(e) => handleSubmit(e, 'published')}
          >
            Publish
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Basic fields */}
            <div className="space-y-2">
              <label>Product Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="space-y-2">
              <label>Category</label>
              <Select 
                value={formData.category}
                onValueChange={(value) => handleFieldChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="bibles">Bibles</SelectItem>
                  <SelectItem value="gifts">Gifts & Cards</SelectItem>
                  <SelectItem value="stationery">Stationery</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category-specific fields */}
          {renderCategorySpecificFields()}

          {/* Common fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>Price (KES)</label>
              <Input 
                type="number"
                value={formData.price}
                onChange={(e) => handleFieldChange('price', e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <label>Stock Quantity</label>
              <Input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => handleFieldChange('stockQuantity', parseInt(e.target.value))}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label>Status</label>
              <Select
                value={formData.status}
                onValueChange={(value: 'draft' | 'published') => handleFieldChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label>Image</label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
                {formData.image && <span>{formData.image.name}</span>}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="w-full rounded-md border p-2 min-h-[100px]"
                placeholder="Enter product description"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
