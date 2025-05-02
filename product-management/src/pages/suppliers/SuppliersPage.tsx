import { useState } from "react"
import { useStore } from "../../store/useStore"
import { SupplierList } from "../../components/suppliers/SupplierList"
import { CreateSupplierForm } from "../../components/suppliers/CreateSupplierForm"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Plus } from "lucide-react"

export function SuppliersPage() {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Suppliers</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {isCreating ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Add New Supplier</h2>
            <Button variant="ghost" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
          <CreateSupplierForm onSuccess={() => setIsCreating(false)} />
        </Card>
      ) : (
        <SupplierList />
      )}
    </div>
  )
}
