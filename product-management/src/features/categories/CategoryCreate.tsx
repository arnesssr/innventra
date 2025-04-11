import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Plus, Trash } from "lucide-react"
import { useStore } from "../../store/useStore"
import { Category, DEFAULT_FIELDS } from "../../types/category"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/Select"
import { useNavigate } from "react-router-dom"
import type { CategoryField } from "../../types/productTypes"

interface CustomField {
  name: string;
  type: 'text' | 'select' | 'number';
  required: boolean;
}

export function CategoryCreate() {
  const navigate = useNavigate()
  const addCategory = useStore(state => state.addCategory)
  
  const [category, setCategory] = useState({
    name: '',
    description: '',
  })

  const [customFields, setCustomFields] = useState<CustomField[]>([])

  const [newField, setNewField] = useState<CustomField>({
    name: '',
    type: 'text',
    required: false
  })

  const addCustomField = () => {
    if (!newField.name) return
    setCustomFields(prev => [...prev, newField])
    setNewField({ name: '', type: 'text', required: false })
  }

  const removeCustomField = (index: number) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (!category.name) return;

    const newCategory = {
      name: category.name,
      description: category.description,
      fields: [
        ...DEFAULT_FIELDS.map(field => ({
          ...field,
          label: field.name
        })),
        ...customFields.map(field => ({
          ...field,
          label: field.name
        }))
      ]
    }
    
    addCategory(newCategory)
    navigate('/products/categories')
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label>Category Name</label>
              <Input
                value={category.name}
                onChange={e => setCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <label>Description</label>
              <textarea
                className="w-full rounded-md border p-2"
                value={category.description}
                onChange={e => setCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
          </div>

          {/* Default Fields Display */}
          <div className="space-y-4">
            <h3 className="font-medium">Default Fields</h3>
            <div className="grid gap-2">
              {DEFAULT_FIELDS.map((field) => (
                <div key={field.name} className="flex items-center gap-2 bg-accent/50 p-2 rounded">
                  <span>{field.name}</span>
                  <span className="text-sm text-muted-foreground">({field.type})</span>
                  {field.required && <span className="text-sm text-red-500">*required</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Custom Fields */}
          <div className="space-y-4">
            <h3 className="font-medium">Add Custom Fields</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Field name"
                value={newField.name}
                onChange={e => setNewField(prev => ({ ...prev, name: e.target.value }))}
              />
              <Select
                value={newField.type}
                onValueChange={value => setNewField(prev => ({ ...prev, type: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
              <Button className="col-span-2" onClick={addCustomField}>
                <Plus className="h-4 w-4 mr-2" /> Add Field
              </Button>
            </div>

            {customFields.length > 0 && (
              <div className="space-y-2">
                {customFields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between bg-accent/50 p-2 rounded">
                    <div>
                      <span>{field.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({field.type})</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeCustomField(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Category
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
