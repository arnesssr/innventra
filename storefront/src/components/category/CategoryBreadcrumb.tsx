import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface CategoryBreadcrumbProps {
  categoryName: string
}

export function CategoryBreadcrumb({ categoryName }: CategoryBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link to="/categories" className="hover:text-foreground transition-colors">
        Categories
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">{categoryName}</span>
    </nav>
  )
}
