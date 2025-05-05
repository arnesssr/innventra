import React from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/Button"
import { defaultStoreConfig, getStoreConfig } from "../../config/storeConfig"
import { Link } from "react-router-dom"

export function StoreHeader() {
  const config = getStoreConfig()

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt={config.businessName} className="h-8" />
            ) : (
              <span className="font-bold text-xl">{config.businessName}</span>
            )}
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-primary">
              Products
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
