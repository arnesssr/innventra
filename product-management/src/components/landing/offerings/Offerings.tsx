import { motion } from "framer-motion"
import { 
  BoxIcon, 
  TagIcon, 
  BarChart3, 
  ShoppingCart, 
  Globe2, 
  Settings2, 
  Boxes,
  Share2
} from "lucide-react"
import { DotBackground } from "../../ui/DotBackground"

const offerings = [
  {
    title: "Product Management",
    description: "Centralized control for all your products, variants, and categories",
    icon: TagIcon,
    gradient: "from-[#8a2be2] to-[#ff3a8c]"
  },
  {
    title: "Inventory Control",
    description: "Real-time stock tracking and automated reordering system",
    icon: Boxes,
    gradient: "from-[#ff3a8c] to-[#ff8f5c]"
  },
  {
    title: "Sales Management",
    description: "Streamlined order processing and customer management",
    icon: ShoppingCart,
    gradient: "from-[#ff8f5c] to-[#ffc53d]"
  },
  {
    title: "Custom Shop Integration",
    description: "Connect seamlessly with your existing online store",
    icon: Globe2,
    gradient: "from-[#ffc53d] to-[#8a2be2]"
  },
  {
    title: "Multi-Channel Sync",
    description: "Unified inventory across all your sales channels",
    icon: Share2,
    gradient: "from-[#8a2be2] to-[#ff3a8c]"
  },
  {
    title: "Analytics & Reports",
    description: "Comprehensive insights and performance metrics",
    icon: BarChart3,
    gradient: "from-[#ff3a8c] to-[#ff8f5c]"
  }
]

export function Offerings() {
  return (
    <section id="offerings" className="relative py-32 overflow-hidden"> {/* Add id for scroll targeting */}
      <DotBackground />
      
      <div className="container relative mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c] 
            bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to manage your products, inventory, and sales in one place
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10
                hover:bg-white/[0.04] transition-colors duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${offering.gradient} p-[1px] mb-6 
                group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full rounded-xl bg-[#1a1f2e] flex items-center justify-center">
                  <offering.icon className="w-6 h-6 text-white/90" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{offering.title}</h3>
              <p className="text-white/60">{offering.description}</p>

              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#8a2be2]/0 to-[#ff3a8c]/0 
                group-hover:from-[#8a2be2]/5 group-hover:to-[#ff3a8c]/5 
                rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
