import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { Button } from "../ui/Button"
import { Slider } from "../ui/Slider"
import { Separator } from "../ui/Separator"
import { X } from "lucide-react"

interface FilterSheetProps {
  open: boolean
  onClose: () => void
  priceRange: [number, number]
  onPriceChange: (value: [number, number]) => void
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
  categories: { id: string; name: string }[]
}

export function FilterSheet({
  open,
  onClose,
  priceRange,
  onPriceChange,
  selectedCategories,
  onCategoryChange,
  categories
}: FilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={onPriceChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryChange(category.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Reset filters logic
              }}
            >
              Reset
            </Button>
            <Button className="flex-1" onClick={onClose}>
              Apply
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
