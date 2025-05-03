import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../../components/ui/Table"
import { useStore } from "../../../store/useStore"
import { formatDate } from "../../../lib/utils/dateUtils"

export function SalesReportTable() {
  const orders = useStore(state => state.orders)

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Order #</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
