import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"

interface SortingDropdownProps {
  value: string
  onSort: (value: string) => void
}

export function SortingDropdown({ value, onSort }: SortingDropdownProps) {
  return (
    <Select value={value} onValueChange={onSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest First</SelectItem>
      </SelectContent>
    </Select>
  )
}
