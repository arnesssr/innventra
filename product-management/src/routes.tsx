import { createBrowserRouter, Link, RouterProvider, Navigate } from "react-router-dom"
import { Layout } from "./components/layout"
import { DashboardPage } from "./pages/dashboard/DashboardPage"
import { ProductsPage } from "./pages/products/ProductsPage"
import { CategoryList } from "./pages/categories/CategoryList"
import { ProductForm } from "./pages/products/ProductForm"
import { InventoryPage } from "./pages/inventory/InventoryPage"
import { SettingsPage } from "./pages/settings/SettingsPage"
import { Button } from "./components/ui/Button"
import { LandingPage } from "./pages/landing/LandingPage"
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react"
import { PublishedProducts } from "./pages/products/PublishedProducts"
import { DraftsPage } from "./pages/products/DraftsPage"
import { ArchivedProducts } from "./pages/products/ArchivedProducts"
import { MessagesPage } from "./pages/messages/MessagesPage"
import { OrdersPage } from "./pages/orders/OrdersPage"

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-[400px]">
        {children}
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/sign-in/*",
    element: (
      <AuthLayout>
        <SignIn routing="path" path="/sign-in" afterSignInUrl="/app" />
      </AuthLayout>
    )
  },
  {
    path: "/sign-up/*",
    element: (
      <AuthLayout>
        <SignUp routing="path" path="/sign-up" afterSignUpUrl="/app" />
      </AuthLayout>
    )
  },
  {
    path: "/app/*",
    element: (
      <SignedIn>
        <Layout />
      </SignedIn>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "products",
        element: <ProductsPage />,
        children: [
          { index: true, element: <Navigate to="categories" replace /> },
          { path: "categories", element: <CategoryList /> },
          { path: "published", element: <PublishedProducts /> },
          { path: "drafts", element: <DraftsPage /> },
          { path: "archived", element: <ArchivedProducts /> },
          { path: "new/:category", element: <ProductForm /> },
          { path: ":id", element: <ProductForm /> }
        ]
      },
      { path: "inventory", element: <InventoryPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "messages", element: <MessagesPage /> }
    ]
  },
  {
    path: "*",
    element: (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    )
  }
])

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return <RouterProvider router={router} />
}

