import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Checkbox } from "../../components/ui/Checkbox"
import { Plus, Trash } from "lucide-react"
import { Field } from "../../types/category"

export interface SubCategory {
  id?: string;
  name: string;
  fields: Field[];
}

interface SubCategoryFormProps {
  onClose: () => void;
  onSave: (subCategory: Omit<SubCategory, 'id'>) => void;
}

export function SubCategoryForm({ onClose, onSave }: SubCategoryFormProps) {
  const [formData, setFormData] = useState<Omit<SubCategory, 'id'>>({
    name: '',
    fields: []
  })

  const [newField, setNewField] = useState<Omit<Field, 'id'>>({
    name: '',
    type: 'text',
    required: false,
    options: []
  })

  const addField = () => {
    if (!newField.name) return

    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, { ...newField, id: Date.now().toString() }]
    }))
    setNewField({ name: '', type: 'text', required: false, options: [] })
  }

  const removeField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label>Subcategory Name</label>
            <Input
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter name"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 items-end">
              <div className="space-y-2">
                <label>Field Name</label>
                <Input
                  value={newField.name}
                  onChange={e => setNewField(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter field name"
                />
              </div>
              <div className="space-y-2">
                <label>Field Type</label>
                <Select
                  value={newField.type}
                  onValueChange={value => setNewField(prev => ({ ...prev, type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newField.type === 'select' && (
                <div className="col-span-2 space-y-2">
                  <label>Options (comma separated)</label>
                  <Input
                    value={newField.options?.join(', ')}
                    onChange={e => setNewField(prev => ({ ...prev, options: e.target.value.split(',').map(o => o.trim()) }))}
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}
              <div className="col-span-2 flex items-center gap-2">
                <Checkbox
                  defaultChecked={newField.required}
                  onCheckedChange={(checked) => setNewField(prev => ({ ...prev, required: checked === true }))}
                />
                <label>Required field</label>
              </div>
              <Button className="col-span-2" onClick={addField}>
                <Plus className="h-4 w-4 mr-2" /> Add Field
              </Button>
            </div>

            {formData.fields.length > 0 && (
              <div className="space-y-2">
                <label className="font-medium">Added Fields</label>
                <div className="space-y-2">
                  {formData.fields.map((field, index) => (
                    <div key={field.id} className="flex items-center justify-between p-2 bg-accent/50 rounded">
                      <div>
                        <span className="font-medium">{field.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({field.type})</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeField(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onSave(formData)}>Save Subcategory</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
