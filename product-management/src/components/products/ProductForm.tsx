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
}

const categories = [
  { value: "books", label: "Books" },
  { value: "bibles", label: "Bibles" },
  { value: "gifts", label: "Gifts & Cards" },
  { value: "stationery", label: "Stationery" },
  { value: "toys", label: "Toys & Games" }
]

export function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label>Product Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <label>Category</label>
              <Select 
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label>Price</label>
              <Input 
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Enter price"
                required
              />
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
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full rounded-md border p-2 min-h-[100px]"
                placeholder="Enter product description"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              <Upload className="mr-2 h-4 w-4" />
              Save Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
