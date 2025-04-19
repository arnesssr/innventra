import { motion } from "framer-motion"
import { HeroContent } from "./HeroContent"

// Mock the missing components for tests
const mockComponents = {
  motion: {
    div: motion.div
  }
}

export function Hero() {
  return (
    <section 
      className="relative min-h-screen py-24 bg-gradient-radial from-[#111827] to-[#0a0e17] overflow-hidden"
      role="region"
      aria-label="Hero Section"
    >
      {/* Improved Background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(138,43,226,0.15),transparent_50%)]" />
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/20 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Enhanced particles with trails */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: [-20, window.innerHeight + 20],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            style={{
              boxShadow: "0 0 20px 2px rgba(138,43,226,0.2)",
              filter: "blur(0.5px)"
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-8 flex items-center justify-center min-h-[70vh] z-[2]">
        <HeroContent />
      </div>
    </section>
  )
}
