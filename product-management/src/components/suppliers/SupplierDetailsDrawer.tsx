import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { SupplierStatusBadge } from "./SupplierStatusBadge"
import { Separator } from "../ui/Separator"
import type { Supplier } from "../../types/supplierTypes"

interface SupplierDetailsDrawerProps {
  supplier: Supplier | null;
  open: boolean;
  onClose: () => void;
}

export function SupplierDetailsDrawer({ supplier, open, onClose }: SupplierDetailsDrawerProps) {
  if (!supplier) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{supplier.name}</span>
            <SupplierStatusBadge status={supplier.status} />
          </SheetTitle>
          <span className="text-sm text-muted-foreground">
            Added {new Date(supplier.createdAt).toLocaleDateString()}
          </span>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Contact Information</h3>
            <div className="text-sm space-y-1">
              <p>{supplier.email}</p>
              {supplier.phone && (
                <p className="text-muted-foreground">{supplier.phone}</p>
              )}
            </div>
          </div>

          <Separator />

          {supplier.address && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2">Address</h3>
                <div className="text-sm space-y-1">
                  <p>{supplier.address.street}</p>
                  <p>
                    {supplier.address.city}, {supplier.address.state} {supplier.address.postalCode}
                  </p>
                  <p>{supplier.address.country}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {supplier.notes && (
            <div>
              <h3 className="text-sm font-medium mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {supplier.notes}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
