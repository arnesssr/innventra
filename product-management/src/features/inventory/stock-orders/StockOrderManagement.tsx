import { Card } from "../../../components/ui/Card"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../../components/ui/Table"
import { Button } from "../../../components/ui/Button"
import { useStore } from "../../../store/useStore"
import { Badge } from "../../../components/ui/Badge"
import { Plus } from "lucide-react"
import { useState } from "react"
import { StockOrderDialog } from "./StockOrderDialog"

export function StockOrderManagement() {
  const stockOrders = useStore(state => state.stockOrders)
  const getCategoryName = useStore(state => state.getCategoryName)
  const products = useStore(state => state.products) // Add products from store
  const [showOrderDialog, setShowOrderDialog] = useState(false)

  // Helper function to get product details
  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Stock Orders</h2>
        <Button onClick={() => setShowOrderDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Order
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockOrders.map((order) => {
              const product = getProductDetails(order.productId)
              
                function handleReceiveStock(id: string): void {
                    throw new Error("Function not implemented.")
                }

              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{product?.name || 'Unknown Product'}</TableCell>
                  <TableCell>{product ? getCategoryName(product.category) : 'N/A'}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'pending' ? 'default' :
                      order.status === 'completed' ? 'secondary' :
                      'destructive'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => order.status === 'pending' && handleReceiveStock(order.id)}
                      disabled={order.status !== 'pending'}
                    >
                      Receive Stock
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      <StockOrderDialog 
        open={showOrderDialog} 
        onClose={() => setShowOrderDialog(false)} 
      />
    </div>
  )
}
