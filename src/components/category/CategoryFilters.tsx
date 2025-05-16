import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { Checkbox } from "../ui/Checkbox"
import { Separator } from "../ui/Separator"

interface CategoryFilter {
  label: string  // Changed from name to label
  options: Array<{
    value: string
    label: string
    count: number
  }>
}

interface FilterTag {
  id: string
  type: string
  value: string
  label: string
}

interface CategoryFiltersProps {
  filters: Record<string, CategoryFilter>
  activeFilters: FilterTag[]
  onFilterChange: (filter: FilterTag) => void
  open: boolean
  onClose: () => void
}

export function CategoryFilters({ 
  filters, 
  activeFilters, 
  onFilterChange,
  open,
  onClose 
}: CategoryFiltersProps) {
  // ... existing code ...
}
