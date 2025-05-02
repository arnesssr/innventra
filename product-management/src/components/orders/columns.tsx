import { ColumnDef } from "@tanstack/react-table"
import { OrderActions } from "./OrderActions"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { formatDate } from "../../lib/utils/dateUtils"
import type { Order } from "../../types/orderTypes"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order #",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
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
      <span>${row.original.total.toFixed(2)}</span>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.createdAt)
  },
  {
    id: "actions",
    cell: ({ row, table }) => {  // Add table to destructuring
      return (
        <OrderActions 
          order={row.original}
          onView={() => (table.options.meta as any)?.rowClick?.(row.original)}
        />
      )
    },
  },
]
