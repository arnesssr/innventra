import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { CategoryHeader } from "../../components/category/CategoryHeader"
import { CategoryFilters } from "../../components/category/CategoryFilters"
import { ProductGrid } from "../../components/product/ProductGrid"
import { CategoryBreadcrumb } from "../../components/category/CategoryBreadcrumb"
import { FilterTags } from "../../components/category/FilterTags"

// Define consistent interfaces
interface FilterTag {
  id: string
  type: string
  value: string
  label: string
}

interface FilterOption {
  value: string
  label: string
  count: number
}

interface CategoryFilter {
  label: string  // Added this required field
  name: string
  options: FilterOption[]
}

export function CategoryPage() {
  const { id } = useParams()
  const [showFilters, setShowFilters] = useState(false)
  const [sortOrder, setSortOrder] = useState('featured')
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([])

  // Mock filters data with correct interface
  const filters: Record<string, CategoryFilter> = {
    price: {
      label: "Price",  // Added label field
      name: "Price Range",
      options: [
        { value: "0-50", label: "Under $50", count: 10 },
        { value: "50-100", label: "$50 - $100", count: 20 },
        { value: "100+", label: "Over $100", count: 5 }
      ]
    },
    type: {
      label: "Type",  // Added label field
      name: "Product Type",
      options: [
        { value: "bible", label: "Bibles", count: 15 },
        { value: "book", label: "Books", count: 25 },
        { value: "gift", label: "Gifts", count: 10 }
      ]
    }
  }

  // Updated filter handlers to match expected types
  const applyFilter = (filter: FilterTag) => {
    setActiveFilters(prev => [...prev, filter])
  }

  const removeFilter = (tag: FilterTag) => {  // Updated parameter type
    setActiveFilters(prev => prev.filter(f => f.id !== tag.id))
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  // Mock products data with required category field
  const products = [
    {
      id: '1',
      name: 'Sample Product',
      price: 99.99,
      description: 'Product description here',
      imageUrls: ['https://via.placeholder.com/400'],
      originalPrice: 129.99,
      isNew: true,
      category: 'default'  // Add required category field
    }
  ]

  return (
    <div className="container py-8 space-y-6">
      <CategoryBreadcrumb categoryName={id || ''} />

      <CategoryHeader 
        title={id || ''}
        description="Category description"
        productCount={products.length}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onFilterToggle={() => setShowFilters(true)}
      />

      <FilterTags 
        tags={activeFilters}
        onRemove={removeFilter}  // Now correctly typed
        onClearAll={clearFilters}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CategoryFilters 
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={applyFilter}
          open={showFilters}
          onClose={() => setShowFilters(false)}
          categoryId={id}  // Pass the ID from params
        />

        <main className="lg:col-span-3">
          <ProductGrid 
            products={products}
            isLoading={false}
          />
        </main>
      </div>
    </div>
  )
}
