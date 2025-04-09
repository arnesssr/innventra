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
        <Route path="/products" element={<ProductsPage />}>
          <Route path="books/add" element={<ProductForm category="books" />} />
          <Route path="bibles/add" element={<ProductForm category="bibles" />} />
          <Route path="gifts/add" element={<ProductForm category="gifts" />} />
          <Route path="stationery/add" element={<ProductForm category="stationery" />} />
          <Route path="toys/add" element={<ProductForm category="toys" />} />
        </Route>
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/drafts" element={<DraftsPage />} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  )
}
