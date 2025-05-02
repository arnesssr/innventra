import { useState } from "react"
import { SupplierList } from "../../components/suppliers/SupplierList"
import { CreateSupplierForm } from "../../components/suppliers/CreateSupplierForm"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Plus } from "lucide-react"
import { SupplierAnalytics } from "../../features/suppliers/SupplierAnalytics"

export function SuppliersPage() {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships and orders</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <SupplierAnalytics />

      {isCreating ? (
        <Card className="p-6 border-2 border-primary/20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Add New Supplier</h2>
              <p className="text-muted-foreground">Enter supplier details below</p>
            </div>
            <Button variant="ghost" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
          <CreateSupplierForm onSuccess={() => setIsCreating(false)} />
        </Card>
      ) : (
        <Card className="p-6 border-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Supplier List</h2>
            <p className="text-muted-foreground">View and manage your suppliers</p>
          </div>
          <SupplierList />
        </Card>
      )}
    </div>
  )
}
