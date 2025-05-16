import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderList } from "../../components/orders/OrderList"
import { OrderDetails } from "../../components/orders/OrderDetails"
import { Button } from "../../components/ui/Button"
import { Package2, ArrowLeft } from "lucide-react"

// Mock data - replace with real data from API
const MOCK_ORDERS = [
  {
    id: "ord-001",
    date: "2024-01-20",
    status: "processing",
    total: 149.98,
    items: [
      {
        id: "1",
        name: "KJV Study Bible",
        price: 49.99,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/200"
      },
      {
        id: "2",
        name: "Daily Devotional",
        price: 19.99,
        quantity: 2,
        imageUrl: "https://via.placeholder.com/200"
      }
    ],
    timeline: [
      {
        status: "ordered",
        date: "2024-01-20 14:30",
        description: "Order placed successfully"
      },
      {
        status: "processing",
        date: "2024-01-20 15:45",
        description: "Order is being processed"
      }
    ],
    shipping: {
      address: "123 Main St",
      city: "Nairobi",
      country: "Kenya",
      postalCode: "00100"
    }
  }
]

export function OrdersPage() {
  const navigate = useNavigate()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [orders] = useState(MOCK_ORDERS)

  const selectedOrderDetails = orders.find(order => order.id === selectedOrder)

  if (selectedOrderDetails) {
    return (
      <div className="container py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedOrder(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-2xl font-semibold">Order #{selectedOrderDetails.id}</h1>
        </div>
        <OrderDetails order={selectedOrderDetails} />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 mx-auto bg-accent/50 rounded-full flex items-center justify-center">
            <Package2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">No orders yet</h2>
          <p className="text-muted-foreground">
            When you place orders, they will appear here
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-red-500"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <Button 
          variant="outline"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
      </div>
      <OrderList 
        orders={orders}
        onOrderSelect={(orderId) => setSelectedOrder(orderId)}
      />
    </div>
  )
}
