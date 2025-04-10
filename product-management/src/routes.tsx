import { Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { PublishedProducts } from './pages/products/PublishedProducts'
import { DraftsPage } from './pages/products/DraftsPage'
import { ProductForm } from './pages/products/ProductForm'
import { CategoryList } from './pages/categories/CategoryList'
import { CategoryDetails } from './pages/categories/CategoryDetails'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />}>
          <Route index element={<Navigate to="categories" replace />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/:categoryId" element={<CategoryDetails />} />
          <Route path="new/:category" element={<ProductForm />} />
          <Route path="published" element={<PublishedProducts />} />
          <Route path="drafts" element={<DraftsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}