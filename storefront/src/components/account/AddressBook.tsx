import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { Plus } from "lucide-react"

export function AddressBook() {
  const addresses = [] // Replace with real data

  if (addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No addresses saved yet</p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {addresses.map((address) => (
        <Card key={address.id} className="p-4">
          {/* Address card content */}
        </Card>
      ))}
    </div>
  )
}
