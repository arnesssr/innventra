import { motion } from "framer-motion"
import type { Feature } from "../data/featuresData"

export function FeatureCard({ title, description, icon: Icon }: Feature) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      {/* Glassmorphic background glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-[#8a2be2]/20 via-transparent to-[#ff3a8c]/20 rounded-3xl blur-lg group-hover:blur-xl transition-all" />
      
      {/* Main card with glass effect */}
      <div className="relative h-full rounded-2xl p-1 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
        <div className="h-full rounded-xl p-8 bg-[#1a1f2e]/40 border border-white/[0.05] backdrop-blur-xl overflow-hidden">
          {/* Animated gradient hover effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            style={{
              background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(138,43,226,0.06), transparent 40%)"
            }}
          />

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative space-y-4"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8a2be2]/10 to-[#ff3a8c]/10 
              flex items-center justify-center border border-white/[0.05]">
              <Icon className="w-7 h-7 text-white/70" />
            </div>

            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-white/70 leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
