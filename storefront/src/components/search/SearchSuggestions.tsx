import { Clock, Search, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

export function SearchSuggestions() {
  const recentSearches = ["dress", "shoes", "accessories"]
  const trending = ["summer collection", "new arrivals", "sale items"]

  return (
    <div className="space-y-6">
      {/* Recent Searches */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
        <div className="space-y-1">
          {recentSearches.map((term) => (
            <Link
              key={term}
              to={`/search?q=${term}`}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{term}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Searches */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Trending</h3>
        <div className="space-y-1">
          {trending.map((term) => (
            <Link
              key={term}
              to={`/search?q=${term}`}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
            >
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span>{term}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
