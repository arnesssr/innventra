import { useCartStore } from "../../store/cartStore"

interface CartBadgeProps {
  className?: string
}

export function CartBadge({ className }: CartBadgeProps) {
  const items = useCartStore(state => state.items)
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  if (itemCount === 0) return null

  return (
    <span className={`absolute -top-1 -right-1 h-4 w-4 rounded-full 
      bg-gradient-to-r from-orange-500 to-red-500 
      text-[10px] font-medium text-white 
      flex items-center justify-center
      ${className}`}
    >
      {itemCount > 99 ? '99+' : itemCount}
    </span>
  )
}
