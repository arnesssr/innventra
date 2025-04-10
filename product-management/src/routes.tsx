import { Routes, Route, Navigate } from 'react-router-dom'
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react"
import { RootLayout } from './components/layout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { ProductForm } from './pages/products/ProductForm'
import { PublishedProducts } from './pages/products/PublishedProducts'
import { CategoriesPage } from './pages/products/CategoriesPage'
import { CategoryView } from './pages/products/CategoryView'
import { DraftsPage } from './pages/products/DraftsPage'
import { CategoryCreate } from './features/categories/CategoryCreate'

export function AppRoutes() {
  console.log('Rendering routes...') // Debug log

  return (
    <Routes>
      <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      
      <Route element={
        <SignedIn>
          <RootLayout />
        </SignedIn>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />}>
          <Route index element={<Navigate to="/products/categories" replace />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:category" element={<CategoryView />} />
          <Route path="categories/new" element={<CategoryCreate />} />
          <Route path="new/:category" element={<ProductForm />} />
          <Route path="published" element={<PublishedProducts />} />
          <Route path="drafts" element={<DraftsPage />} />
        </Route>
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>

      <Route path="*" element={
        <SignedOut>
          <Navigate to="/sign-in" replace />
        </SignedOut>
      } />
    </Routes>
  )
}
