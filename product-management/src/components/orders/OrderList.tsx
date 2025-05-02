import { useState, useMemo } from "react"
import { useStore } from "../../store/useStore"
import { DataTable } from "../../components/ui/DataTable"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { formatDate } from "../../lib/utils/dateUtils"
import { OrderDetailsDrawer } from "./OrderDetailsDrawer"
import type { OrderStatus, Order } from "../../types/orderTypes"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order #"
  },
  {
    accessorKey: "customerName",
    header: "Customer"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <OrderStatusBadge status={row.original.status} />
    )
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <span>
        ${row.original.total.toFixed(2)}
      </span>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.createdAt)
  }
]

export function OrderList() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const orders = useStore(state => state.orders)

  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns}
        data={orders}
        onRowClick={(row: Order) => setSelectedOrder(row)}
      />
      
      <OrderDetailsDrawer
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  )
}
