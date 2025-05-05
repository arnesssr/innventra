import * as React from "react"
import { cn } from "../../lib/utils"
import { ArrowUpDown } from "lucide-react"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
)
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors hover:bg-muted/50", className)}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  onSort?: () => void;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, sortable, onSort, children, ...props }, ref) => (
    <td 
      ref={ref} 
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        sortable && "cursor-pointer",
        className
      )} 
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      {sortable ? (
        <div className="flex items-center gap-2">
          {children}
          <ArrowUpDown className="h-4 w-4" />
        </div>
      ) : children}
    </td>
  )
)
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableRow, TableCell }
