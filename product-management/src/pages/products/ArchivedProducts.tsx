import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Undo, Trash2 } from "lucide-react"
import { useState } from "react"

export function ArchivedProducts() {
  const archived = useStore(state => state.products.filter(p => p.status === 'archived'))
  const getCategoryName = useStore(state => state.getCategoryName)
  const restoreProduct = useStore(state => state.restoreProduct)
  const deleteProduct = useStore(state => state.deleteProduct)
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleDelete = (productId: string) => {
    setSelectedProduct(productId)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct)
      setShowDeleteConfirm(false)
      setSelectedProduct(null)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Archived Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {archived.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <img
                        src={URL.createObjectURL(product.images[0].file)}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.description.slice(0, 50)}...
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell>KES {product.price.toLocaleString()}</TableCell>
                <TableCell>
                  {product.archivedAt 
                    ? new Date(product.archivedAt).toLocaleDateString()
                    : 'Unknown'
                  }
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => restoreProduct(product.id)}
                    >
                      <Undo className="h-4 w-4 mr-2" />
                      Restore
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {archived.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No archived products</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Permanently Delete Product</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to permanently delete this product? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button 
              variant="default"
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={confirmDelete}
            >
              Delete Forever
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
