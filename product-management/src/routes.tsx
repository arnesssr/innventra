import { Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { ProductForm } from './pages/products/ProductForm'
import { PublishedProducts } from './pages/products/PublishedProducts'
import { CategoriesPage } from './pages/products/CategoriesPage'
import { CategoryView } from './pages/products/CategoryView'
import { DraftsPage } from './pages/products/DraftsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />}>
          <Route index element={<Navigate to="/products/categories" replace />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:category" element={<CategoryView />} />
          <Route path="new/:category" element={<ProductForm />} />
          <Route path="published" element={<PublishedProducts />} />
          <Route path="drafts" element={<DraftsPage />} />
        </Route>
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  )
}
