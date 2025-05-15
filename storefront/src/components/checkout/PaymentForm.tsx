import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/Select"
import { Button } from "../ui/Button"

interface PaymentFormData {
  method: 'mpesa' | 'card' | 'bank'
  phone?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

interface PaymentFormProps {
  data: PaymentFormData
  onSubmit: (data: PaymentFormData) => void
  loading?: boolean
}

export function PaymentForm({ data, onSubmit, loading }: PaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Payment Method</Label>
        <Select value={data.method} onValueChange={(value: 'mpesa' | 'card' | 'bank') => onSubmit({ ...data, method: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mpesa">M-Pesa</SelectItem>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="bank">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data.method === 'mpesa' && (
        <div className="space-y-2">
          <Label htmlFor="phone">M-Pesa Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="254700000000"
            required
          />
        </div>
      )}

      {data.method === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="4111 1111 1111 1111"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-orange-500 to-red-500"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}
