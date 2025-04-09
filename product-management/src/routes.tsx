import { Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { DraftsPage } from './pages/products/DraftsPage'
import { ProductForm } from './pages/products/ProductForm'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/drafts" element={<DraftsPage />} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  )
}
