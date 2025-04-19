import { motion } from "framer-motion"

export function PublishAnimation() {
  return (
    <div className="relative w-full h-full bg-[#232838] rounded-lg p-4 flex items-center justify-center">
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(138,43,226,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(138,43,226,0.2) 0%, transparent 80%)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c]"
          animate={{
            x: [0, Math.cos(i * 60 * Math.PI / 180) * 80],
            y: [0, Math.sin(i * 60 * Math.PI / 180) * 80],
            opacity: [1, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )
}
