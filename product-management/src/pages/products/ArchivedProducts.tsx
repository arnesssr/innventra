import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Card, CardContent } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { useState } from "react"

export function ArchivedProducts() {
  const products = useStore(state => state.products.filter(p => p.status === 'archived'))
  const getCategoryName = useStore(state => state.getCategoryName)
  const restoreProduct = useStore(state => state.restoreProduct)
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false)
  const [productToRestore, setProductToRestore] = useState<string | null>(null)

  const handleRestoreClick = (productId: string) => {
    setProductToRestore(productId)
    setShowRestoreConfirm(true)
  }

  const confirmRestore = () => {
    if (productToRestore) {
      restoreProduct(productToRestore)
      setShowRestoreConfirm(false)
      setProductToRestore(null)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Archived Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell>KES {product.price.toLocaleString()}</TableCell>
                <TableCell>{new Date(product.archivedAt || '').toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRestoreClick(product.id)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showRestoreConfirm} onOpenChange={setShowRestoreConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Product</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to restore this product?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowRestoreConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRestore}>
              Restore
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
