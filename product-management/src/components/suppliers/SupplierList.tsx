import { Table, TableHeader, TableRow, TableCell, TableBody } from "../ui/Table"
import { useStore } from "../../store/useStore"
import { SupplierStatusBadge } from "./SupplierStatusBadge"
import { SupplierDetailsDrawer } from "./SupplierDetailsDrawer"
import { useState } from "react"
import type { Supplier } from "../../types/supplierTypes"
import { SupplierFormActions } from "../../features/suppliers/SupplierFormActions"

export function SupplierList() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const suppliers = useStore(state => state.suppliers)

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name & Contact</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow 
              key={supplier.id}
              className="cursor-pointer"
            >
              <TableCell>SUP-{supplier.id.slice(0, 6)}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-sm text-muted-foreground">{supplier.email}</p>
                </div>
              </TableCell>
              <TableCell>{supplier.phone || "—"}</TableCell>
              <TableCell>
                <SupplierStatusBadge status={supplier.status} />
              </TableCell>
              <TableCell>
                <SupplierFormActions 
                  supplier={supplier}
                  onView={() => setSelectedSupplier(supplier)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <SupplierDetailsDrawer
        supplier={selectedSupplier}
        open={!!selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
      />
    </div>
  )
}
