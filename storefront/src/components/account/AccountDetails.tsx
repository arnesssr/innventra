import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { useState } from "react"

export function AccountDetails() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label>First Name</label>
          <Input
            value={formData.firstName}
            onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label>Last Name</label>
          <Input
            value={formData.lastName}
            onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label>Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label>Phone</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>
      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
