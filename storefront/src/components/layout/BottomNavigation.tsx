import { Home, Search, Heart, ShoppingBag, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

export function BottomNavigation() {
  const location = useLocation()

  const items = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Search", icon: Search, href: "/search" },
    { label: "Wishlist", icon: Heart, href: "/wishlist" },
    { label: "Cart", icon: ShoppingBag, href: "/cart" },
    { label: "Account", icon: User, href: "/account" },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground transition-colors",
              location.pathname === item.href && "text-orange-500"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
