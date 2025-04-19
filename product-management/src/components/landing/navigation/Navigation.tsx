import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Home, LayoutGrid, CircleDollarSign, BookOpen, Mail, Package, Share2 } from "lucide-react"

const NAV_ITEMS = [
  { label: "Features", href: "#features", icon: <LayoutGrid className="h-4 w-4" /> },
  { label: "Services", href: "#offerings", icon: <Package className="h-4 w-4" /> },
  { label: "Integrations", href: "#integrations", icon: <Share2 className="h-4 w-4" /> },
  { label: "Blog", href: "/blog", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Contact", href: "/contact", icon: <Mail className="h-4 w-4" /> }
]

export function Navigation() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useMotionValueEvent(scrollY, "change", (current) => {
    // Only hide nav when scrolling down and past threshold
    const threshold = 100
    if (typeof current === "number") {
      if (current < threshold) {
        setVisible(true)
      } else if (current > lastScrollY) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(current)
    }
  })

  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        // Ensure we call scrollTo with the correct arguments
        const top = element.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({
          top,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-6 inset-x-0 mx-auto max-w-fit z-50 
        bg-[#1a1f2e]/90 backdrop-blur-xl border border-white/10 
        rounded-full px-8 py-4"
    >
      <div className="flex items-center gap-6">
        {NAV_ITEMS.map(item => (
          <button
            key={item.label}
            onClick={() => handleClick(item.href)}
            className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
          >
            <span className="block sm:hidden">{item.icon}</span>
            <span className="hidden sm:block text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  )
}
