import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/Dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { useStore } from "../../../store/useStore"
import { useState } from "react"
import { Textarea } from "../../../components/ui/Textarea"

interface StockOrderDialogProps {
  open: boolean
  onClose: () => void
  productId?: string
}

export function StockOrderDialog({ open, onClose, productId }: StockOrderDialogProps) {
  const products = useStore(state => state.products)
  const suppliers = useStore(state => state.suppliers)
  const createStockOrder = useStore(state => state.createStockOrder)

  const [formData, setFormData] = useState({
    productId: productId || '',
    supplierId: '',
    quantity: '',
    expectedDeliveryDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    notes: ''
  })

  const handleSubmit = () => {
    if (!formData.productId || !formData.supplierId || !formData.quantity) {
      return
    }

    const product = products.find(p => p.id === formData.productId)
    if (!product) return

    createStockOrder({
      productId: formData.productId,
      productName: product.name,
      categoryId: product.category,
      quantity: parseInt(formData.quantity),
      notes: formData.notes
    })

    onClose()
    setFormData({
      productId: '',
      supplierId: '',
      quantity: '',
      expectedDeliveryDate: new Date().toISOString().split('T')[0],
      notes: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Stock Order</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label>Product</label>
            <Select
              value={formData.productId}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, productId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label>Supplier</label>
            <Select
              value={formData.supplierId}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, supplierId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label>Quantity</label>
            <Input
              type="number"
              value={formData.quantity}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, quantity: e.target.value }))
              }
              min={1}
            />
          </div>

          <div className="grid gap-2">
            <label>Expected Delivery Date</label>
            <Input
              type="date"
              value={formData.expectedDeliveryDate}
              onChange={(e) => 
                setFormData(prev => ({ 
                  ...prev, 
                  expectedDeliveryDate: e.target.value 
                }))
              }
              min={new Date().toISOString().split('T')[0]} // Sets minimum date to today
            />
          </div>

          <div className="grid gap-2">
            <label>Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.productId || !formData.supplierId || !formData.quantity}
          >
            Create Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
