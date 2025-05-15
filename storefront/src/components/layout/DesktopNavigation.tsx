import { Link } from "react-router-dom"

interface Category {
  id: string
  name: string
  subcategories?: { id: string; name: string }[]
}

const CATEGORIES: Category[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
  },
  {
    id: "men",
    name: "Men",
    subcategories: [
      { id: "clothing", name: "Clothing" },
      { id: "shoes", name: "Shoes" },
      { id: "accessories", name: "Accessories" },
    ]
  },
  {
    id: "women",
    name: "Women",
    subcategories: [
      { id: "clothing", name: "Clothing" },
      { id: "shoes", name: "Shoes" },
      { id: "accessories", name: "Accessories" },
    ]
  }
]

export function DesktopNavigation() {
  return (
    <nav className="hidden lg:block border-b">
      <div className="container">
        <ul className="flex items-center gap-8">
          {CATEGORIES.map((category) => (
            <li key={category.id} className="group relative py-4">
              <Link 
                to={`/category/${category.id}`}
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                {category.name}
              </Link>

              {category.subcategories && (
                <div className="absolute top-full left-0 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          to={`/category/${category.id}/${sub.id}`}
                          className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
