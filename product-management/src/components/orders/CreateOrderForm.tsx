import { useState } from "react"
import { useStore } from "../../store/useStore"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Card } from "../ui/Card"
import { Plus, Minus, Trash2 } from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"

interface CreateOrderFormProps {
  onSuccess?: () => void
}

export function CreateOrderForm({ onSuccess }: CreateOrderFormProps) {
  const products = useStore(state => state.products)
  const createOrder = useStore(state => state.createOrder)
  
  const [orderItems, setOrderItems] = useState<Array<{
    productId: string;
    quantity: number;
  }>>([{ productId: '', quantity: 1 }])

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const items = orderItems
      .filter(item => item.productId && item.quantity > 0)
      .map(item => {
        const product = products.find(p => p.id === item.productId)
        return {
          id: `item-${Date.now()}-${item.productId}`,
          productId: item.productId,
          productName: product?.name || '',
          quantity: item.quantity,
          unitPrice: product?.price || 0,
          subtotal: (product?.price || 0) * item.quantity
        }
      })

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax

    createOrder({
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      items,
      status: 'pending',
      paymentStatus: 'pending',
      subtotal,
      tax,
      total,
      shippingAddress: customerDetails.address,
      orderNumber: `ORD-${Date.now()}`,
      updatedAt: new Date().toISOString()
    })

    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Details Card */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Customer Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Customer Name"
            value={customerDetails.name}
            onChange={e => setCustomerDetails(prev => ({
              ...prev,
              name: e.target.value
            }))}
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={customerDetails.email}
            onChange={e => setCustomerDetails(prev => ({
              ...prev,
              email: e.target.value
            }))}
            required
          />
        </div>
      </Card>

      {/* Order Items Card */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Order Items</h3>
        <div className="space-y-4">
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <Select
                value={item.productId}
                onValueChange={(value) => {
                  const newItems = [...orderItems]
                  newItems[index].productId = value
                  setOrderItems(newItems)
                }}
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

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newItems = [...orderItems]
                    newItems[index].quantity = Math.max(1, item.quantity - 1)
                    setOrderItems(newItems)
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => {
                    const newItems = [...orderItems]
                    newItems[index].quantity = parseInt(e.target.value) || 1
                    setOrderItems(newItems)
                  }}
                  className="w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newItems = [...orderItems]
                    newItems[index].quantity = item.quantity + 1
                    setOrderItems(newItems)
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setOrderItems(orderItems.filter((_, i) => i !== index))
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => setOrderItems([...orderItems, { productId: '', quantity: 1 }])}
          >
            Add Item
          </Button>
        </div>
      </Card>

      <Button type="submit" className="w-full">
        Create Order
      </Button>
    </form>
  )
}
