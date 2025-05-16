import { Button } from "../ui/Button"
import { Phone, Laptop, Tv, Home, Gift } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function MobileCategories() {
  const navigate = useNavigate()

  const categories = [
    { icon: Phone, label: "Upgrade Your Tech", href: "/category/phones" },
    { icon: Laptop, label: "Joyful Tech", href: "/category/laptops" },
    { icon: Tv, label: "Deals Make", href: "/category/tv" },
    { icon: Gift, label: "Fashion Sale", href: "/category/fashion" }
  ]

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {categories.map((category, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          onClick={() => navigate(category.href)}
        >
          <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
            <category.icon className="h-6 w-6" />
          </div>
          <span className="text-xs text-center">{category.label}</span>
        </Button>
      ))}
    </div>
  )
}
