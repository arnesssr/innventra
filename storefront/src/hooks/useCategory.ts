import { useState, useEffect } from 'react'
import { CATEGORY_CONFIG } from '../config/categoryConfig'

interface Product {
  id: string
  name: string
  price: number
  imageUrls: string[]
  category: string
}

interface FilterTag {
  id: string
  type: string
  value: string
}

export function useCategory(categoryId: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([])
  const [sortOrder, setSortOrder] = useState('featured')
  const category = CATEGORY_CONFIG[categoryId]

  // Fetch products for this category
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // TODO: Replace with actual API call
        const mockProducts = Array.from({ length: 12 }, (_, i) => ({
          id: `${categoryId}-${i}`,
          name: `${category.title} Product ${i + 1}`,
          price: Math.floor(Math.random() * 1000) + 99,
          imageUrls: ['https://via.placeholder.com/400'],
          category: categoryId
        }))
        setProducts(mockProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (category) {
      fetchProducts()
    }
  }, [categoryId, category])

  const applyFilter = (filter: FilterTag) => {
    setActiveFilters(prev => [...prev, filter])
  }

  const removeFilter = (filter: FilterTag) => {
    setActiveFilters(prev => prev.filter(f => f.id !== filter.id))
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  return {
    category,
    products,
    isLoading,
    activeFilters,
    sortOrder,
    productCount: products.length,
    filters: category?.filters || {},
    setSortOrder,
    applyFilter,
    removeFilter,
    clearFilters
  }
}
