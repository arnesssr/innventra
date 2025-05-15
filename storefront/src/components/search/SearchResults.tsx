import { ProductCard } from "../product/ProductCard"
import { LoadingSpinner } from "../common/LoadingSpinner"

interface SearchResultsProps {
  query: string
  isLoading: boolean
}

export function SearchResults({ query, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  // Mock results with category field added
  const results = [
    {
      id: "1",
      name: "Product 1",
      price: 99.99,
      description: "Sample product description",
      imageUrls: ["https://via.placeholder.com/400"],
      category: "books" // Added required category field
    }
  ]

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Showing results for "{query}"
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
