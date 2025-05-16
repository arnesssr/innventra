import { Input } from "../ui/Input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/Select"
import { Label } from "../ui/Label"

interface AddressFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface AddressFormProps {
  data: AddressFormData
  onChange: (data: Partial<AddressFormData>) => void
}

export function AddressForm({ data, onChange }: AddressFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address1">Address Line 1</Label>
        <Input
          id="address1"
          value={data.address1}
          onChange={(e) => onChange({ address1: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address2">Address Line 2 (Optional)</Label>
        <Input
          id="address2"
          value={data.address2}
          onChange={(e) => onChange({ address2: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => onChange({ postalCode: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={data.country} onValueChange={(value) => onChange({ country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KE">Kenya</SelectItem>
              <SelectItem value="UG">Uganda</SelectItem>
              <SelectItem value="TZ">Tanzania</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
