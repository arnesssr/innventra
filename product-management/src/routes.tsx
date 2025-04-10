import { Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { PublishedProducts } from './pages/products/PublishedProducts'
import { DraftsPage } from './pages/products/DraftsPage'
import { ProductForm } from './pages/products/ProductForm'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />}>
          <Route index element={<Navigate to="/products/categories" replace />} />
          <Route path="categories" />
          <Route path="categories/:category" element={<ProductForm />} />
          <Route path="published" element={<PublishedProducts />} />
          <Route path="drafts" element={<DraftsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}