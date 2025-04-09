import { Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ProductListPage } from './pages/products/ProductListPage'
import { ProductFormPage } from './pages/products/ProductFormPage'
import { CategoryPage } from './pages/categories/CategoryPage'
import { InventoryPage } from './pages/inventory/InventoryPage'
import { SettingsPage } from './pages/settings/SettingsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RootLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/edit/:id" element={<ProductFormPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
