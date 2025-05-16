import { useNavigate } from "react-router-dom"

interface Category {
  id: string
  name: string
  description: string
  imageUrl: string
  productCount: number
}

interface CategoryGridProps {
  categories: Category[]
  onCategoryClick?: (id: string) => void
}

export function CategoryGrid({ categories, onCategoryClick }: CategoryGridProps) {
  const navigate = useNavigate()

  const handleClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId)
    } else {
      navigate(`/category/${categoryId}`)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleClick(category.id)}
          className="group relative aspect-square overflow-hidden rounded-lg bg-accent/50 transition-all hover:bg-accent"
        >
          <img
            src={category.imageUrl}
            alt={category.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 p-6 flex flex-col justify-end">
            <h3 className="text-xl font-semibold text-white">{category.name}</h3>
            <p className="text-sm text-white/80 line-clamp-2 mt-2">
              {category.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
