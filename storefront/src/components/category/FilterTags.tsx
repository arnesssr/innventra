import { X } from "lucide-react"
import { Button } from "../ui/Button"

interface FilterTag {
  id: string
  type: string
  value: string
}

interface FilterTagsProps {
  tags: FilterTag[]
  onRemove: (tag: FilterTag) => void
  onClearAll: () => void
}

export function FilterTags({ tags, onRemove, onClearAll }: FilterTagsProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
        >
          <span className="font-medium">{tag.type}:</span> {tag.value}
          <button
            onClick={() => onRemove(tag)}
            className="ml-1 rounded-full p-0.5 hover:bg-orange-200"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {tags.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  )
}
