import React, { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Sheet, SheetContent } from "../ui/Sheet"

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    // TODO: Implement search logic
  }

  return (
    <>
      {/* Mobile Search Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Desktop Search */}
      <div className="hidden lg:flex items-center max-w-xl w-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="w-full pl-10 pr-4"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Search Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="top" className="h-full w-full p-0">
          <div className="flex items-center p-4 border-b">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="flex-1 border-none focus-visible:ring-0 px-4"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {/* Search Results will go here */}
        </SheetContent>
      </Sheet>
    </>
  )
}
