import { motion } from "framer-motion"
import { Image, DollarSign, Tag, Package } from "lucide-react"

export function ProductCreationAnimation() {
  const cursorPoints = [
    { x: 20, y: 80 }, // Product name field
    { x: 20, y: 140 }, // Price field
    { x: 250, y: 200 }, // Category dropdown
    { x: 20, y: 260 }, // Image upload
  ]

  const formFields = [
    { label: "Product Name", placeholder: "Premium T-Shirt", icon: Package },
    { label: "Price", placeholder: "$29.99", icon: DollarSign },
    { label: "Category", placeholder: "Apparel", icon: Tag },
    { label: "Images", type: "file", icon: Image }
  ]

  return (
    <div className="relative w-full h-full bg-[#232838] rounded-lg p-4">
      {/* Form UI */}
      <div className="space-y-4">
        {formFields.map((field, i) => (
          <motion.div
            key={i}
            className="space-y-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <label className="text-xs text-white/60">{field.label}</label>
            <motion.div 
              className="flex items-center gap-2 p-2 rounded bg-black/20 border border-white/10"
              whileHover={{ borderColor: "rgba(138,43,226,0.5)" }}
            >
              <field.icon className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/40">{field.placeholder}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Animated Cursor */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white/80 shadow-[0_0_10px_rgba(138,43,226,0.5)]"
        animate={{
          x: cursorPoints.map(p => p.x),
          y: cursorPoints.map(p => p.y),
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 5,
          times: [0, 0.2, 0.4, 0.6, 0.8],
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Success Indicator */}
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 4, duration: 1, repeat: Infinity }}
      >
        <motion.div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-green-400">Product Created</span>
      </motion.div>
    </div>
  )
}
