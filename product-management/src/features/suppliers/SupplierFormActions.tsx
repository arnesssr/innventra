import { useStore } from "../../store/useStore"
import { Button } from "../../components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { Supplier } from "../../types/supplierTypes"

interface SupplierFormActionsProps {
  supplier: Supplier
  onView?: () => void
}

export function SupplierFormActions({ supplier, onView }: SupplierFormActionsProps) {
  const updateSupplier = useStore(state => state.updateSupplier)
  const deleteSupplier = useStore(state => state.deleteSupplier)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            View Details
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => updateSupplier(supplier.id, { status: supplier.status === 'active' ? 'inactive' : 'active' })}
        >
          Mark as {supplier.status === 'active' ? 'Inactive' : 'Active'}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => deleteSupplier(supplier.id)}
          className="text-red-600"
        >
          Delete Supplier
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
