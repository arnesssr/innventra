import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"
import { Layout } from "./components/layout"
import { DashboardPage } from "./pages/dashboard/DashboardPage"
import { ProductsPage } from "./pages/products/ProductsPage"
import { CategoryList } from "./pages/categories/CategoryList" // Fixed path
import { ProductForm } from "./pages/products/ProductForm"
import { InventoryPage } from "./pages/inventory/InventoryPage"
import { SettingsPage } from "./pages/settings/SettingsPage"
import { Button } from "./components/ui/Button"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />
      },
      {
        path: "products",
        element: <ProductsPage />,
        children: [
          {
            path: "categories",
            element: <CategoryList />
          },
          {
            path: "published",
            element: <ProductsPage />
          },
          {
            path: "drafts",
            element: <ProductsPage />
          },
          {
            path: "new/:category",
            element: <ProductForm />
          },
          {
            path: ":id",
            element: <ProductForm />
          }
        ]
      },
      {
        path: "inventory",
        element: <InventoryPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      }
    ],
    errorElement: <ErrorPage />
  }
])

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return <RouterProvider router={router} />
}

