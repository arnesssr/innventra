import { motion } from "framer-motion"

interface CyberCardProps {
  title: string
  subtitle?: string
  mainContent: React.ReactNode
}

export function CyberCard({ title, subtitle, mainContent }: CyberCardProps) {
  return (
    <div className="relative w-[190px] h-[254px] transition-all duration-200 perspective-800 group">
      {/* Tracking grid */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 z-50">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="tracker" data-index={i} />
        ))}
      </div>

      {/* Main card */}
      <div id="card" className="absolute inset-0 flex items-center justify-center rounded-[20px] 
        transition-all duration-700 bg-gradient-to-br from-[#1a1a1a] to-[#262626] 
        border-2 border-white/10 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]
        group-hover:brightness-110">
        
        <div className="relative w-full h-full">
          {/* Card glare effect */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100
            bg-gradient-to-br from-transparent via-white/5 to-transparent" />
          
          {/* Cyber lines */}
          <div className="cyber-lines">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] w-full"
                style={{
                  top: `${20 + i * 20}%`,
                  background: 'linear-gradient(90deg, transparent, rgba(92,103,255,0.2), transparent)',
                  transformOrigin: i % 2 === 0 ? 'left' : 'right'
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative p-6 text-center">
            <motion.p
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-[100px] left-1/2 -translate-x-1/2 text-white/70 text-base font-semibold
                tracking-[2px] group-hover:opacity-0"
            >
              HOVER ME
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-5 text-2xl font-extrabold tracking-[4px] bg-gradient-to-r from-[#00ffaa] to-[#00a2ff]
                bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(0,255,170,0.3)]"
            >
              {title}
            </motion.div>

            {mainContent}

            <div className="absolute bottom-10 w-full text-center text-xs tracking-[2px] text-white/60">
              {subtitle}
            </div>
          </div>

          {/* Corner elements */}
          <div className="absolute inset-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`absolute w-4 h-4 border-2 border-[#5c67ff]/30
                transition-all duration-300 group-hover:border-[#5c67ff]/80 group-hover:shadow-[0_0_10px_rgba(92,103,255,0.5)]
                ${i === 0 ? 'top-0 left-0 border-r-0 border-b-0' : ''}
                ${i === 1 ? 'top-0 right-0 border-l-0 border-b-0' : ''}
                ${i === 2 ? 'bottom-0 left-0 border-r-0 border-t-0' : ''}
                ${i === 3 ? 'bottom-0 right-0 border-l-0 border-t-0' : ''}`}
              />
            ))}
          </div>

          {/* Scan line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5c67ff]/10 to-transparent"
            animate={{ y: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}
