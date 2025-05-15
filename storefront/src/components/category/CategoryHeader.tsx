import React from 'react'
import { SlidersHorizontal } from "lucide-react"
import { Button } from "../ui/Button"
import { SortingDropdown } from "./SortingDropdown"

interface CategoryHeaderProps {
  title: string
  description: string  // Add this
  productCount: number
  sortOrder: string   // Add this
  onSortChange: (value: string) => void  // Update this
  onFilterToggle: () => void
}

export function CategoryHeader({ 
  title, 
  description,  // Add this to destructuring
  productCount, 
  sortOrder,    // Add this to destructuring
  onSortChange,
  onFilterToggle 
}: CategoryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {productCount} {productCount === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          className="lg:hidden"
          onClick={onFilterToggle}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <SortingDropdown 
          value={sortOrder}
          onSort={onSortChange}
        />
      </div>
    </div>
  )
}
