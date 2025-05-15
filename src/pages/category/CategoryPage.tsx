// ... existing imports ...

export function CategoryPage() {
  // ... existing code ...

  return (
    <div className="container py-8 space-y-6">
      {/* ... existing code ... */}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CategoryFilters 
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={applyFilter}
          open={showFilters}
          onClose={() => setShowFilters(false)}
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
