import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Search, ShoppingBag, UserCircle, X } from "lucide-react"
import { Button } from "../ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet"
import { Input } from "../ui/Input"
import { CartDrawer } from "../cart/CartDrawer"
import { CartOverlay } from "../cart/CartOverlay"
import { SearchBar } from "../search/SearchBar"
import { CartBadge } from "../cart/CartBadge"
import { useCart } from "../../hooks/useCart"
import { FavoritesButton } from "../favorites/FavoritesButton"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b">
      <div className="flex items-center h-12 px-4">
        {/* Mobile Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="garnier skin care"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </header>
  )
}
