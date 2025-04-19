import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Eye, Send, Trash2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function DraftsPage() {
  const drafts = useStore(state => state.products.filter(p => p.status === 'draft'))
  const getCategoryName = useStore(state => state.getCategoryName)
  const updateProduct = useStore(state => state.updateProduct)
  const deleteProduct = useStore(state => state.deleteProduct)
  const navigate = useNavigate()
  
  const [showPublishConfirm, setShowPublishConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handlePublish = (productId: string) => {
    setSelectedProduct(productId)
    setShowPublishConfirm(true)
  }

  const handleDelete = (productId: string) => {
    setSelectedProduct(productId)
    setShowDeleteConfirm(true)
  }

  const handlePreview = (productId: string) => {
    navigate(`/app/products/${productId}`)
  }

  const confirmPublish = () => {
    if (selectedProduct) {
      updateProduct(selectedProduct, { 
        status: 'published',
        publishedAt: new Date().toISOString()
      })
      setShowPublishConfirm(false)
      setSelectedProduct(null)
    }
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
                <TableCell>{getCategoryName(draft.category)}</TableCell>
                <TableCell>KES {draft.price.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handlePreview(draft.id)}>
                      <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handlePublish(draft.id)}>
                      <Send className="mr-2 h-4 w-4" /> Publish
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(draft.id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showPublishConfirm} onOpenChange={setShowPublishConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Publish</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to publish this draft?</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowPublishConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPublish}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this draft?</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
