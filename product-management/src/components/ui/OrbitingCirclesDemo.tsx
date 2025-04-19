import { OrbitingCircles } from "./OrbitingCircles"
import { 
  SiShopify, 
  SiWoocommerce, 
  SiAmazon, 
  SiEbay, 
  SiEtsy, 
  SiMagento, 
  SiBigcommerce, 
  SiSquare 
} from "react-icons/si"

export default function ImprovedOrbitingDemo() {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div className="relative w-[500px] h-[500px]">
        {/* Outer orbit circle */}
        <OrbitingCircles iconSize={60} radius={220} speed={1}>
          <div className="p-4 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors">
            <SiShopify className="text-white/70 w-8 h-8 hover:text-white transition-colors" />
          </div>
          <div className="p-4 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors">
            <SiAmazon className="text-white/70 w-8 h-8 hover:text-white transition-colors" />
          </div>
          <div className="p-4 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors">
            <SiEbay className="text-white/70 w-8 h-8 hover:text-white transition-colors" />
          </div>
          <div className="p-4 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors">
            <SiEtsy className="text-white/70 w-8 h-8 hover:text-white transition-colors" />
          </div>
        </OrbitingCircles>
        
        {/* Inner orbit circle */}
        <OrbitingCircles iconSize={50} radius={120} reverse speed={1.5}>
          <div className="p-3 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-colors">
            <SiMagento className="text-white/70 w-6 h-6 hover:text-white transition-colors" />
          </div>
          <div className="p-3 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-colors">
            <SiBigcommerce className="text-white/70 w-6 h-6 hover:text-white transition-colors" />
          </div>
          <div className="p-3 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-colors">
            <SiSquare className="text-white/70 w-6 h-6 hover:text-white transition-colors" />
          </div>
          <div className="p-3 bg-gray-900/90 rounded-xl backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-colors">
            <SiWoocommerce className="text-white/70 w-6 h-6 hover:text-white transition-colors" />
          </div>
        </OrbitingCircles>
      </div>
    </div>
  )
}