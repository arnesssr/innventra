import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Plus, Trash } from "lucide-react"

interface CategoryFormData {
  name: string;
  description: string;
  subcategories: string[];
}

export function CategoryForm({ open, onClose, onSave }: {
  open: boolean;
  onClose: () => void;
  onSave: (category: CategoryFormData) => void;
}) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    subcategories: []
  })

  const [newSubcategory, setNewSubcategory] = useState('')

  const addSubcategory = () => {
    if (newSubcategory.trim()) {
      setFormData(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, newSubcategory.trim()]
      }))
      setNewSubcategory('')
    }
  }

  const removeSubcategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }))
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
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

          <div className="space-y-2">
            <label>Subcategories</label>
            <div className="flex gap-2">
              <Input
                value={newSubcategory}
                onChange={e => setNewSubcategory(e.target.value)}
                placeholder="Enter subcategory name"
                onKeyDown={e => e.key === 'Enter' && addSubcategory()}
              />
              <Button type="button" onClick={addSubcategory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2 mt-2">
              {formData.subcategories.map((sub, index) => (
                <div key={index} className="flex items-center justify-between bg-accent/50 p-2 rounded">
                  <span>{sub}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeSubcategory(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Category</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
