import { Navigation } from '../../components/landing/navigation/Navigation'
import { Hero } from '../../components/landing/hero/Hero'
import { Features } from '../../components/landing/features/Features'
import { IntegrationSection } from '../../components/landing/integrations/IntegrationSection'
import { CTASection } from '../../components/landing/cta/CTASection'
import { Footer } from '../../components/landing/footer/Footer'
import { Offerings } from '../../components/landing/offerings/Offerings'
import { motion } from 'framer-motion'
import { Logo } from '../../components/brand/Logo'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function LandingPage() {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/app')
    }
  }, [isSignedIn, navigate])

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f0f0f0] scroll-smooth">
      {/* Brand name in top left using Logo component */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 left-8 z-50"
      >
        <Logo />
      </motion.div>

      <Navigation />
      <Hero />
      <Features />
      <Offerings />
      <IntegrationSection />
      <CTASection />
      <Footer />
    </div>
  )
}
