import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Plus, Trash } from "lucide-react"
import { useState } from "react"
import { useStore } from "../../store/useStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"

const DEFAULT_FIELDS = [
  { name: 'name', type: 'text', label: 'Product Name', required: true },
  { name: 'price', type: 'number', label: 'Price (KES)', required: true },
  { name: 'stock', type: 'number', label: 'Stock Quantity', required: true },
  { name: 'description', type: 'text', label: 'Description', required: true }
]

interface CategoryField {
  type: 'text' | 'select' | 'number';
  label: string;
  required: boolean;
  options?: string[];
}

export function CategoryList() {
  const navigate = useNavigate()
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    fields: [...DEFAULT_FIELDS] // Start with mandatory fields
  })
  const addCategory = useStore(state => state.addCategory)
  const categories = useStore(state => state.categories) // Get all categories from store

  const handleSave = () => {
    addCategory({
      ...newCategory,
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-')
    })
    setShowNewCategory(false)
    setNewCategory({ name: '', description: '', fields: [...DEFAULT_FIELDS] })
  }

  const handleAddField = () => {
    setNewCategory(prev => ({
      ...prev,
      fields: [...prev.fields, { name: '', type: 'text', label: '', required: false }]
    }))
  }

  const handleRemoveField = (index: number) => {
    setNewCategory(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => setShowNewCategory(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer hover:bg-accent/50"
            onClick={() => navigate(`/products/categories/${category.id}`)}
          >
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showNewCategory} onOpenChange={setShowNewCategory}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label>Category Name</label>
              <Input
                value={newCategory.name}
                onChange={e => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <label>Description</label>
              <textarea
                className="w-full rounded-md border p-2"
                value={newCategory.description}
                onChange={e => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-semibold">Product Fields</label>
                <Button type="button" onClick={handleAddField} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {newCategory.fields.map((field, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-end border p-4 rounded-lg">
                  <div>
                    <label>Field Name</label>
                    <Input
                      value={field.name}
                      onChange={e => {
                        const fields = [...newCategory.fields]
                        fields[index] = { ...field, name: e.target.value }
                        setNewCategory(prev => ({ ...prev, fields }))
                      }}
                      placeholder="e.g. ISBN"
                      disabled={index < DEFAULT_FIELDS.length} // Disable default fields
                    />
                  </div>
                  <div>
                    <label>Label</label>
                    <Input
                      value={field.label}
                      onChange={e => {
                        const fields = [...newCategory.fields]
                        fields[index] = { ...field, label: e.target.value }
                        setNewCategory(prev => ({ ...prev, fields }))
                      }}
                      placeholder="e.g. ISBN Number"
                      disabled={index < DEFAULT_FIELDS.length} // Disable default fields
                    />
                  </div>
                  <div>
                    <label>Type</label>
                    <Select
                      value={field.type}
                      onValueChange={value => {
                        const fields = [...newCategory.fields]
                        fields[index] = { ...field, type: value as 'text' | 'select' | 'number' }
                        setNewCategory(prev => ({ ...prev, fields }))
                      }}
                      disabled={index < DEFAULT_FIELDS.length} // Disable default fields
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {index >= DEFAULT_FIELDS.length && (
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleRemoveField(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowNewCategory(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Category</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
