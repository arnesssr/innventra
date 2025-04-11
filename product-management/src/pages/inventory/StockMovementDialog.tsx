import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { useStore } from "../../store/useStore"
import { useState } from "react"

interface StockMovementDialogProps {
  open: boolean
  onClose: () => void
  productId?: string
}

export function StockMovementDialog({ open, onClose, productId }: StockMovementDialogProps) {
  const products = useStore(state => state.products)
  const addStockMovement = useStore(state => state.addStockMovement)

  const [formData, setFormData] = useState({
    productId: productId || '',
    type: 'in' as 'in' | 'out' | 'adjustment',
    quantity: '',
    notes: ''
  })

  const handleSubmit = () => {
    if (!formData.productId || !formData.quantity) return

    addStockMovement({
      productId: formData.productId,
      type: formData.type,
      quantity: parseInt(formData.quantity),
      notes: formData.notes || `Stock ${formData.type}`,
      date: new Date().toISOString()
    })

    onClose()
    // Reset form
    setFormData({
      productId: '',
      type: 'in',
      quantity: '',
      notes: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stock Movement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!productId && (
            <div className="space-y-2">
              <label>Product</label>
              <Select value={formData.productId} onValueChange={v => setFormData(prev => ({ ...prev, productId: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label>Movement Type</label>
            <Select value={formData.type} onValueChange={v => setFormData(prev => ({ ...prev, type: v as typeof formData.type }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">Stock In</SelectItem>
                <SelectItem value="out">Stock Out</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label>Quantity</label>
            <Input 
              type="number"
              value={formData.quantity}
              onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <label>Notes</label>
            <Input 
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add notes (optional)"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Movement</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
