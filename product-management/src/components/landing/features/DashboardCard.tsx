import { motion, useAnimation, animate, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { AnimatedCursor } from './AnimatedCursor'

//NOTE: This is not the actual dashboard,it's for illustration purposes on the landing page

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())
  
  useEffect(() => {
    const controls = animate(count, to, { duration })
    return controls.stop
  }, [from, to])

  return <motion.span>{rounded}</motion.span>
}

const menuIllustrations = {
  "All Products": {
    preview: (
      <motion.div className="grid grid-cols-3 gap-2 p-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-lg bg-gradient-to-br from-[#8a2be2]/20 to-[#ff3a8c]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </motion.div>
    ),
    cursor: { x: 50, y: 20 }
  },
  "Out of Stock": {
    preview: (
      <motion.div className="flex items-center justify-center h-full">
        <motion.div
          className="relative w-8 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0 border-2 border-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: -45 }}
          >
            <div className="w-full h-0.5 bg-red-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    ),
    cursor: { x: 150, y: 20 }
  },
  // ... add other menu illustrations
};

export function DashboardCard() {
    const [showCursor, setShowCursor] = useState(false);
    // ... rest of the existing code ...
}

