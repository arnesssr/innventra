import React, { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { Separator } from "../ui/Separator"
import { Button } from "../ui/Button"
import { Slider } from "../ui/Slider"
import { Label } from "../ui/Label"
import { Checkbox } from "../ui/Checkbox"
import { Search } from "lucide-react"
import { Input } from "../ui/Input"

interface FilterOption {
  id: string
  label: string
  count: number
}

interface FilterGroup {
  id: string
  name: string
  type: "checkbox" | "range" | "search"
  options?: FilterOption[]
  range?: [number, number]
}

interface CategoryFilter {
  label: string
  options: {
    value: string
    label: string
    count: number
  }[]
}

export interface FilterTag {
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
  categoryId?: string
}

const FILTER_CONFIG: Record<string, FilterGroup[]> = {
  books: [
    {
      id: "genre",
      name: "Genre",
      type: "checkbox",
      options: [
        { id: "fiction", label: "Fiction", count: 120 },
        { id: "non-fiction", label: "Non-Fiction", count: 85 },
        { id: "mystery", label: "Mystery", count: 45 },
        { id: "science-fiction", label: "Science Fiction", count: 30 },
      ],
    },
    {
      id: "author",
      name: "Author",
      type: "search",
    },
    {
      id: "price",
      name: "Price Range",
      type: "range",
      range: [0, 1000],
    },
  ],
  bibles: [
    {
      id: "version",
      name: "Version",
      type: "checkbox",
      options: [
        { id: "kjv", label: "KJV", count: 50 },
        { id: "niv", label: "NIV", count: 45 },
        { id: "esv", label: "ESV", count: 30 },
      ],
    },
    {
      id: "cover",
      name: "Cover Type",
      type: "checkbox",
      options: [
        { id: "leather", label: "Leather", count: 25 },
        { id: "hardcover", label: "Hardcover", count: 35 },
        { id: "paperback", label: "Paperback", count: 40 },
      ],
    },
  ],
}

export function CategoryFilters({ 
  filters, 
  activeFilters, 
  onFilterChange,
  open,
  onClose,
  categoryId = '' 
}: CategoryFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [searchQuery, setSearchQuery] = useState("")

  const filterGroups = FILTER_CONFIG[categoryId] || []

  const FilterContent = () => (
    <div className="space-y-6">
      {filterGroups.map((filter) => (
        <div key={filter.id} className="space-y-4">
          <Label className="text-base font-medium">{filter.name}</Label>

          {filter.type === "checkbox" && filter.options && (
            <div className="space-y-2">
              {filter.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedFilters[filter.id]?.includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [filter.id]: [...(prev[filter.id] || []), option.id],
                        }))
                      } else {
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [filter.id]: prev[filter.id]?.filter((id) => id !== option.id) || [],
                        }))
                      }
                    }}
                  />
                  <span className="text-sm flex-1">{option.label}</span>
                  <span className="text-sm text-muted-foreground">({option.count})</span>
                </div>
              ))}
            </div>
          )}

          {filter.type === "range" && (
            <div className="space-y-4">
              <Slider
                defaultValue={filter.range}
                max={filter.range?.[1]}
                step={10}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          )}

          {filter.type === "search" && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${filter.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          )}
        </div>
      ))}

      <Button
        className="w-full bg-gradient-to-r from-orange-500 to-red-500"
        onClick={() => {
          // Apply filters
          onClose?.()
        }}
      >
        Apply Filters
      </Button>
    </div>
  )

  if (open !== undefined && onClose) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-8">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return <div className="hidden lg:block sticky top-20">{<FilterContent />}</div>
}

function FilterContent({ 
  filters, 
  activeFilters, 
  onFilterChange 
}: Omit<CategoryFiltersProps, 'open' | 'onClose'>) {
  return (
    <div className="space-y-4">
      {Object.entries(filters).map(([type, filter]) => (
        <div key={type}>
          <h3 className="font-medium mb-2">{filter.label}</h3>
          <div className="space-y-2">
            {filter.options.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox 
                  checked={activeFilters.some(f => 
                    f.type === type && f.value === option.value
                  )}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFilterChange({
                        type,
                        value: option.value,
                        label: option.label
                      })
                    }
                  }}
                />
                <label className="text-sm flex-1">
                  {option.label}
                  <span className="text-muted-foreground ml-1">
                    ({option.count})
                  </span>
                </label>
              </div>
            ))}
          </div>
          <Separator className="mt-4" />
        </div>
      ))}
    </div>
  )
}
