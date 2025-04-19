import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../ui/Button'

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Streamline Your Inventory?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already managing their inventory efficiently
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c]"
            asChild
          >
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
