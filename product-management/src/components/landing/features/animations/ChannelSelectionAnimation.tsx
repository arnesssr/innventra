import { motion } from "framer-motion"

export function ChannelSelectionAnimation() {
  const channels = [1, 2, 3, 4]
  
  return (
    <div className="relative w-full h-full bg-[#232838] rounded-lg p-4 flex items-center justify-center">
      <div className="flex gap-3">
        {channels.map((i) => (
          <motion.div
            key={i}
            className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                "0 0 0 2px transparent",
                "0 0 0 2px #8a2be2",
                "0 0 0 2px transparent"
              ]
            }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c]"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 1, delay: i * 0.5, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
