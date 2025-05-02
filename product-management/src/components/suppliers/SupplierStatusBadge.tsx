import { Badge } from "../ui/Badge"
import { cn } from "../../lib/utils"
import type { Supplier } from "../../types/supplierTypes"

const statusStyles = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  inactive: "bg-red-500/10 text-red-500 border-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
}

interface SupplierStatusBadgeProps {
  status: Supplier['status']
  className?: string
}

export function SupplierStatusBadge({ status, className }: SupplierStatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn("capitalize", statusStyles[status], className)}
    >
      {status}
    </Badge>
  )
}
