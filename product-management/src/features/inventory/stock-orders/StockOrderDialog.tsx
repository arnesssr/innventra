import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/Dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { useStore } from "../../../store/useStore"
import { useState } from "react"
import { Textarea } from "../../../components/ui/Textarea"
import { Calendar } from "../../../components/ui/Calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/Popover"

interface StockOrderDialogProps {
  open: boolean;
  onClose: () => void;
  productId?: string;
}

export function StockOrderDialog({ open, onClose, productId }: StockOrderDialogProps) {
  const products = useStore(state => state.products)
  const suppliers = useStore(state => state.suppliers)
  const createPurchaseOrder = useStore(state => state.createPurchaseOrder)

  const [formData, setFormData] = useState({
    productId: productId || '',
    supplierId: '',
    quantity: '',
    unitPrice: '',
    expectedDate: new Date(),
    notes: '',
    status: 'draft' as const
  })

  const handleSubmit = () => {
    if (!formData.productId || !formData.supplierId || !formData.quantity) {
      // Add validation feedback
      console.error("Please fill all required fields")
      return
    }

    try {
      createPurchaseOrder({
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        totalAmount: parseFloat(formData.quantity) * parseFloat(formData.unitPrice),
        status: 'pending'
      })

      onClose()
      setFormData({
        productId: productId || '',
        supplierId: '',
        quantity: '',
        unitPrice: '',
        expectedDate: new Date(),
        notes: '',
        status: 'draft' as const
      })
    } catch (error) {
      console.error("Failed to create purchase order:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Purchase Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Product</label>
            <Select
              value={formData.productId}
              onValueChange={value => setFormData(prev => ({ ...prev, productId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label>Supplier</label>
            <Select
              value={formData.supplierId}
              onValueChange={value => setFormData(prev => ({ ...prev, supplierId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <label>Unit Price</label>
              <Input
                type="number"
                value={formData.unitPrice}
                onChange={e => setFormData(prev => ({ ...prev, unitPrice: e.target.value }))}
                placeholder="Enter price per unit"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label>Expected Delivery Date</label>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={(e) => e.preventDefault()} // Prevent form submission
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.expectedDate ? (
                  format(formData.expectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="absolute inset-0 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.expectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setFormData(prev => ({ ...prev, expectedDate: date }))
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label>Notes</label>
            <Textarea
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional notes"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
