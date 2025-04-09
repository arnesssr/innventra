import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { SubCategory, Field } from "./types"

interface SubCategoryFormProps {
  onClose: () => void;
  onSave: (subCategory: Omit<SubCategory, 'id'>) => void;
}

export function SubCategoryForm({ onClose, onSave }: SubCategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    fields: [] as Field[]
  })

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label>Name</label>
            <Input
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter subcategory name"
            />
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
