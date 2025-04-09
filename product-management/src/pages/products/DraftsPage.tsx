import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Button } from "../../components/ui/Button"

export function DraftsPage() {
  const drafts = useStore(state => state.products.filter(p => p.status === 'draft'))

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drafts.map((draft) => (
            <TableRow key={draft.id}>
              <TableCell>{draft.name}</TableCell>
              <TableCell>{draft.category}</TableCell>
              <TableCell>KES {draft.price.toLocaleString()}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Publish
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
