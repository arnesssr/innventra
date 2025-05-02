import { useState } from "react"
import { useStore } from "../../store/useStore"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/Table"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { OrderDetailsDrawer } from "./OrderDetailsDrawer"
import { formatDate } from "../../lib/utils/dateUtils"
import type { Order } from "../../types/orderTypes"

export function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const orders = useStore(state => state.orders)

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Order #</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow 
              key={order.id}
              className="cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderDetailsDrawer
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  )
}
