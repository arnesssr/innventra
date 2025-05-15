import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Search, ShoppingBag, X, User } from "lucide-react"
import { Button } from "../ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet"
import { Input } from "../ui/Input"
import { CartDrawer } from "../cart/CartDrawer"
import { SearchBar } from "../search/SearchBar"
import { CartBadge } from "../cart/CartBadge"
import { useCart } from "../../hooks/useCart"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container py-4">
        {/* Main Header Content */}
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu (visible on mobile only) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <nav className="flex flex-col gap-4">
                  <Link to="/category/new" className="text-lg font-medium">New Arrivals</Link>
                  <Link to="/category/women" className="text-lg font-medium">Women</Link>
                  <Link to="/category/men" className="text-lg font-medium">Men</Link>
                  <Link to="/category/accessories" className="text-lg font-medium">Accessories</Link>
                  <Link to="/category/sale" className="text-lg font-medium text-red-500">Sale</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/" className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
            STORE
          </Link>

          {/* Desktop Navigation (hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/category/new" className="text-sm font-medium hover:text-orange-500 transition-colors">New In</Link>
            <Link to="/category/men" className="text-sm font-medium hover:text-orange-500 transition-colors">Men</Link>
            <Link to="/category/women" className="text-sm font-medium hover:text-orange-500 transition-colors">Women</Link>
            <Link to="/category/sale" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Sale</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>

            {/* Cart */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <CartBadge />
              </Button>
            </div>

            {/* User Account */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/account')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar (visible when search is open) */}
        {isSearchOpen && (
          <div className="border-t bg-background p-4 lg:hidden mt-4">
            <Input 
              placeholder="Search products..." 
              className="w-full"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </header>
  )
}
