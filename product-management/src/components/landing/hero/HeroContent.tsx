import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "../../ui/Button"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@clerk/clerk-react"

export function HeroContent() {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/app')
    } else {
      navigate('/sign-up')  // Make sure this matches the route path exactly
    }
  }

  return (
    <div className="flex-1 space-y-12 text-center max-w-4xl mx-auto">
      <div className="relative">
        <h1 
          role="heading"
          aria-level={1}
          className="text-6xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Manage Your {" "}
          <span>Inventory Seamlessly</span>
        </h1>
      </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm"
      >
        Transform your business with our powerful inventory management system. 
        Seamlessly integrate with e-commerce platforms and streamline your operations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-6 justify-center"
      >
        <Button 
          size="lg" 
          className="px-8 py-6 text-lg relative overflow-hidden group
            bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c] 
            hover:scale-105 transition-all duration-300
            shadow-[0_8px_32px_rgba(138,43,226,0.4)]
            hover:shadow-[0_8px_48px_rgba(138,43,226,0.6)]"
          onClick={handleGetStarted}
        >
          {isSignedIn ? 'Go to Dashboard' : 'Get Started'}
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.span>
        </Button>
        
        {!isSignedIn && (
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-6 text-lg 
              border-white/20 hover:border-white/40
              bg-white/[0.05] backdrop-blur-xl
              hover:scale-105 hover:bg-white/[0.08]
              transition-all duration-300"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        )}
      </motion.div>
    </div>
  )
}
