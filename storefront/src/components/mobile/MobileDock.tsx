import { motion, useMotionValue, useSpring } from "framer-motion"
import { Home, ShoppingBag, Heart, User, LayoutGrid, MessageSquare } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useCartStore } from "../../store/cartStore"

const items = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Categories", href: "/categories" },
  { icon: MessageSquare, label: "Messages", href: "/messages", badge: "73" },
  { icon: ShoppingBag, label: "Cart", href: "/cart", badge: "60" },
  { icon: User, label: "Account", href: "/account" }
]

export function MobileDock() {
  const location = useLocation()
  const cartItems = useCartStore(state => state.items)
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
      <motion.div className="flex items-center justify-around bg-white dark:bg-gray-900 py-2 border-t">
        {items.map((item, index) => (
          <MobileDockItem 
            key={index}
            Icon={item.icon}
            label={item.label}
            href={item.href}
            active={location.pathname === item.href}
            badge={item.badge || (item.label === "Cart" ? cartItems.length : undefined)}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

function MobileDockItem({ 
  Icon, 
  label, 
  href, 
  active,
  badge 
}: { 
  Icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
  badge?: number;
}) {
  const scale = useSpring(1, {
    stiffness: 200,
    damping: 15
  })

  return (
    <Link to={href} className="relative flex flex-col items-center w-[20%]">
      <motion.div
        style={{ scale }}
        whileTap={{ scale: 0.95 }}
        className={`flex flex-col items-center ${active ? 'text-red-500' : 'text-gray-500'}`}
      >
        <Icon className="h-6 w-6" />
        <span className="text-[10px] mt-0.5">{label}</span>
        {badge && (
          <span className="absolute -top-1 right-1/4 h-4 w-4 text-[10px] font-medium flex items-center justify-center rounded-full bg-red-500 text-white">
            {badge}
          </span>
        )}
      </motion.div>
    </Link>
  )
}
