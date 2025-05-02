import { useState } from "react"
import { useStore } from "../../store/useStore"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Card } from "../ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
import type { Supplier } from "../../types/supplierTypes"

interface CreateSupplierFormProps {
  onSuccess?: () => void;
}

export function CreateSupplierForm({ onSuccess }: CreateSupplierFormProps) {
  const addSupplier = useStore(state => state.addSupplier)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as Supplier['status'],
    notes: '',
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
    const supplier: Supplier = {
        id: `sup-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...formData,
        lastOrderAmount: undefined,
        lastOrderDate: ""
    }
    addSupplier(supplier)
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid gap-4">
          <Input
            placeholder="Supplier Name"
            value={formData.name}
            onChange={e => setFormData(prev => ({
              ...prev,
              name: e.target.value
            }))}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={e => setFormData(prev => ({
                ...prev,
                email: e.target.value
              }))}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={e => setFormData(prev => ({
                ...prev,
                phone: e.target.value
              }))}
            />
          </div>
          <Select
            value={formData.status}
            onValueChange={(value: Supplier['status']) => 
              setFormData(prev => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Address</h3>
        <div className="grid gap-4">
          <Input
            placeholder="Street Address"
            value={formData.address.street}
            onChange={e => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value }
            }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="City"
              value={formData.address.city}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, city: e.target.value }
              }))}
            />
            <Input
              placeholder="State/Province"
              value={formData.address.state}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, state: e.target.value }
              }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Country"
              value={formData.address.country}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, country: e.target.value }
              }))}
            />
            <Input
              placeholder="Postal Code"
              value={formData.address.postalCode}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, postalCode: e.target.value }
              }))}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Additional Information</h3>
        <Textarea
          placeholder="Notes about this supplier..."
          value={formData.notes}
          onChange={e => setFormData(prev => ({
            ...prev,
            notes: e.target.value
          }))}
          className="min-h-[100px]"
        />
      </Card>

      <Button type="submit" className="w-full">
        Create Supplier
      </Button>
    </form>
  )
}
