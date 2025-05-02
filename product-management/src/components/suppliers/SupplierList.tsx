import { useState } from "react"
import { useStore } from "../../store/useStore"
import { DataTable } from "../ui/DataTable"
import { SupplierStatusBadge } from "./SupplierStatusBadge"
import { SupplierDetailsDrawer } from "./SupplierDetailsDrawer"
import type { Supplier } from "../../types/supplierTypes"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <SupplierStatusBadge status={row.original.status} />
    )
  },
  {
    accessorKey: "createdAt",
    header: "Since",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  }
]

export function SupplierList() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const suppliers = useStore(state => state.suppliers)

  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns}
        data={suppliers}
        onRowClick={(row) => setSelectedSupplier(row)}
      />
      
      <SupplierDetailsDrawer
        supplier={selectedSupplier}
        open={!!selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
      />
    </div>
  )
}
