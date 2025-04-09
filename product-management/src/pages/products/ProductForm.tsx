import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
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
    price: 0,
    stock: 0,
    status: 'draft' as const
  })

  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    addProduct({ ...formData, status })
    navigate('/products')
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {/* Add form fields for name, category, price, stock */}
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={(e) => handleSubmit(e, 'draft')}
              >
                Save as Draft
              </Button>
              <Button 
                type="button"
                onClick={(e) => handleSubmit(e, 'published')}
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
