import { Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { CategoryPage } from './pages/categories/CategoryPage'
import { LoginPage } from './pages/auth/LoginPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RootLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories/:type" element={<CategoryPage />} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  )
}
