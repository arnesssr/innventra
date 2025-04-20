import { Button } from "../../../components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../components/ui/Select"
import { Input } from "../../../components/ui/Input"

interface Props {
  selectedIds: string[]
  onBulkUpdate: (action: string, value: any) => void
  categories: any[]
}

export function BulkActionsBar({ selectedIds, onBulkUpdate, categories }: Props) {
  if (selectedIds.length === 0) return null

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
      <Button 
        variant="outline"
        onClick={() => onBulkUpdate('archive', null)}
      >
        Archive Selected
      </Button>

      <Select
        onValueChange={(value) => onBulkUpdate('category', value)}
      >
        <SelectTrigger>Move to Category</SelectTrigger>
        <SelectContent>
          {categories.map(cat => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Add more bulk actions */}
    </div>
  )
}
