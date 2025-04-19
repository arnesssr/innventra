import { motion } from "framer-motion"
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
import { BackgroundGradient } from "../../ui/BackgroundGradient"

const PLATFORMS = [
  { name: "Shopify", icon: SiShopify },
  { name: "WooCommerce", icon: SiWoocommerce },
  { name: "Amazon", icon: SiAmazon },
  { name: "eBay", icon: SiEbay },
  { name: "Etsy", icon: SiEtsy },
  { name: "Magento", icon: SiMagento },
  { name: "BigCommerce", icon: SiBigcommerce },
  { name: "Square", icon: SiSquare }
]

export function IntegrationSection() {
  return (
    <section id="integrations" className="py-20 bg-[#111827]">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] font-bold bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c] bg-clip-text text-transparent mb-4">
            Connect with your favorite platforms
          </h2>
          <p className="text-[#a0a0a0] max-w-[700px] mx-auto">
            Inventra integrates seamlessly with all major ecommerce platforms and marketplaces
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {PLATFORMS.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BackgroundGradient className="w-[180px] h-[180px] bg-[#1a1f2e]/80 rounded-[22px] backdrop-blur-sm flex flex-col items-center justify-center p-6 group">
                <platform.icon className="w-12 h-12 mb-4 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-lg font-bold text-center text-white group-hover:scale-110 transition-transform duration-300">
                  {platform.name}
                </span>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}