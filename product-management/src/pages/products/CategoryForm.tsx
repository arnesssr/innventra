import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"

interface CategoryFormData {
  name: string;
  type: string;
  fields: {
    name: string;
    type: 'text' | 'select' | 'number';
    options?: string[];
    required: boolean;
  }[];
}

export function CategoryForm({ open, onClose, onSave }: {
  open: boolean;
  onClose: () => void;
  onSave: (category: CategoryFormData) => void;
}) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    type: '',
    fields: []
  })

  const [newField, setNewField] = useState<{
    name: string;
    type: 'text' | 'select' | 'number';
    options: string;
    required: boolean;
  }>({
    name: '',
    type: 'text',
    options: '',
    required: false
  })

  const addField = () => {
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, {
        name: newField.name,
        type: newField.type,
        options: newField.type === 'select' ? newField.options.split(',').map(o => o.trim()) : undefined,
        required: newField.required
      }]
    }))
    setNewField({ name: '', type: 'text', options: '', required: false })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Category Name</label>
            <Input
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Study Bibles, Children's Books"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Custom Fields</h4>
            {formData.fields.map((field, index) => (
              <div key={index} className="flex items-center gap-2 bg-accent/50 p-2 rounded">
                <span>{field.name}</span>
                <span className="text-sm text-muted-foreground">({field.type})</span>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Field name"
                value={newField.name}
                onChange={e => setNewField(prev => ({ ...prev, name: e.target.value }))}
              />
              <Select
                value={newField.type}
                onValueChange={value => setNewField(prev => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                </SelectContent>
              </Select>
              {newField.type === 'select' && (
                <Input
                  className="col-span-2"
                  placeholder="Options (comma separated)"
                  value={newField.options}
                  onChange={e => setNewField(prev => ({ ...prev, options: e.target.value }))}
                />
              )}
              <Button className="col-span-2" onClick={addField}>Add Field</Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onSave(formData)}>Create Category</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
