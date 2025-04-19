import { motion } from "framer-motion"
import { Package, Tag, Store, Image, Settings } from "lucide-react"

const NODES = [
  { id: 'products', icon: Package, label: 'Products', x: 50, y: 50 },
  { id: 'categories', icon: Tag, label: 'Categories', x: 150, y: 20 },
  { id: 'variants', icon: Store, label: 'Variants', x: 200, y: 100 },
  { id: 'media', icon: Image, label: 'Media', x: 100, y: 150 },
  { id: 'settings', icon: Settings, label: 'Settings', x: 20, y: 120 }
]

const CONNECTIONS = [
  ['products', 'categories'],
  ['products', 'variants'],
  ['products', 'media'],
  ['products', 'settings'],
  ['categories', 'variants'],
  ['media', 'variants']
]

export function NetworkGraph() {
  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0">
        {/* Connection lines */}
        {CONNECTIONS.map(([from, to], index) => {
          const fromNode = NODES.find(n => n.id === from)
          const toNode = NODES.find(n => n.id === to)
          if (!fromNode || !toNode) return null

          return (
            <motion.line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#network-gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          )
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="network-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a2be2" />
            <stop offset="100%" stopColor="#ff3a8c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {NODES.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div 
            className="w-12 h-12 rounded-xl bg-[#1a1f2e] border border-white/10 
              flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <node.icon className="w-6 h-6 text-white/70" />
          </motion.div>
          <div className="absolute top-full mt-2 text-xs text-white/70 whitespace-nowrap
            left-1/2 -translate-x-1/2">
            {node.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
