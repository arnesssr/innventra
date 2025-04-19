import { motion } from 'framer-motion'

export const BestsellersIllustration = () => (
  <motion.div className="absolute inset-0 bg-[#232838] opacity-0 group-hover:opacity-100 transition-opacity">
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#8a2be2]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 left-1/2 w-1 h-1/2 origin-bottom"
          style={{ backgroundColor: '#ff3a8c' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  </motion.div>
)

// Add more illustrations for other menu items...
