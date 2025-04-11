import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Plus, Trash } from "lucide-react"
import { Checkbox } from "../../components/ui/Checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"

interface Field {
  name: string;
  type: 'text' | 'number' | 'select';
  required: boolean;
  options?: string[];
}

interface CategoryFormData {
  name: string;
  description: string;
  defaultFields: Field[];
}

export function CategoryForm({ open, onClose, onSave }: {
  open: boolean;
  onClose: () => void;
  onSave: (category: CategoryFormData) => void;
}) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    defaultFields: [
      { name: 'Product Name', type: 'text', required: true },
      { name: 'Price', type: 'number', required: true },
      { name: 'Stock', type: 'number', required: true },
      { name: 'Description', type: 'text', required: false }
    ]
  })

  const [newField, setNewField] = useState<Field>({
    name: '',
    type: 'text',
    required: false
  })

  const addField = () => {
    if (!newField.name) return
    setFormData(prev => ({
      ...prev,
      defaultFields: [...prev.defaultFields, newField]
    }))
    setNewField({ name: '', type: 'text', required: false })
  }

  const removeField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      defaultFields: prev.defaultFields.filter((_, i) => i !== index)
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Basic Info */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <label>Category Name</label>
              <Input
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <label>Description</label>
              <textarea
                className="w-full rounded-md border p-2"
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
          </div>

          {/* Default Fields */}
          <div className="space-y-4">
            <h3 className="font-medium">Default Fields</h3>
            <div className="space-y-2">
              {formData.defaultFields.map((field, index) => (
                <div key={index} className="flex items-center justify-between bg-accent/50 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <span>{field.name}</span>
                    <span className="text-sm text-muted-foreground">({field.type})</span>
                    {field.required && <span className="text-sm text-red-500">*required</span>}
                  </div>
                  {index > 3 && (
                    <Button variant="ghost" size="sm" onClick={() => removeField(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Field */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">Add Custom Field</h3>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Field name"
                value={newField.name}
                onChange={e => setNewField(prev => ({ ...prev, name: e.target.value }))}
              />
              <Select
                value={newField.type}
                onValueChange={(value: 'text' | 'number' | 'select') => setNewField(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
              <div className="col-span-2 flex items-center gap-2">
                <Checkbox
                  checked={newField.required}
                  onCheckedChange={(checked) => setNewField(prev => ({ ...prev, required: !!checked }))}
                />
                <label>Required field</label>
              </div>
              <Button className="col-span-2" onClick={addField}>
                <Plus className="h-4 w-4 mr-2" /> Add Field
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onSave(formData)}>Save Category</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
