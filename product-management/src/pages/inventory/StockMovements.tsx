import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"
import { useStore } from "../../store/useStore"
import { Plus } from "lucide-react"
import { useState } from "react"
import { StockMovementDialog } from "./StockMovementDialog"

export function StockMovements() {
  const inventory = useStore(state => state.inventory)
  const [showDialog, setShowDialog] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Movement
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(inventory).flatMap(item => 
            item.movements.map(movement => (
              <TableRow key={movement.id}>
                <TableCell>{new Date(movement.date).toLocaleDateString()}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell className="capitalize">{movement.type}</TableCell>
                <TableCell>{movement.quantity}</TableCell>
                <TableCell>{movement.notes}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <StockMovementDialog 
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  )
}
