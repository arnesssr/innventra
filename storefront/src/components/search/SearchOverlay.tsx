import { useEffect, useState } from "react"
import { Sheet, SheetContent } from "../ui/Sheet"
import { Input } from "../ui/Input"
import { SearchResults } from "./SearchResults"
import { SearchSuggestions } from "./SearchSuggestions"
import { X } from "lucide-react"

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      setQuery("")
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="top" className="h-full w-full">
        <div className="container max-w-3xl mx-auto py-4 space-y-6">
          <div className="relative">
            <Input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-4 pr-10 text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-120px)]">
            {query ? (
              <SearchResults query={query} isLoading={isLoading} />
            ) : (
              <SearchSuggestions />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
