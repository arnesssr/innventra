import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { useStore } from "../../store/useStore"

export function CategoryView() {
  const { category } = useParams()
  const navigate = useNavigate()
  const products = useStore(state => 
    state.products.filter(p => p.category === category && p.status === 'published')
  )

  const categoryTitles: Record<string, string> = {
    books: 'Books',
    bibles: 'Bibles',
    gifts: 'Gifts & Cards',
    stationery: 'Stationery',
    toys: 'Toys & Games'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{categoryTitles[category ?? '']}</h2>
        <Button onClick={() => navigate(`/products/new/${category}`)}>
          <Plus className="h-4 w-4 mr-2" /> Add {categoryTitles[category ?? '']}
        </Button>
      </div>
      // ...rest of the component
    </div>
  )
}
