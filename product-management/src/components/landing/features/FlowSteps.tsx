import { motion } from "framer-motion"
import { Package, ArrowDown, Boxes, Rocket } from "lucide-react"

export function FlowSteps() {
  const steps = [
    { number: 1, title: "Create Product", icon: Package },
    { number: 2, title: "Select Channels", icon: Boxes },
    { number: 3, title: "Publish Everywhere", icon: Rocket }
  ]

  return (
    <div className="flex flex-col items-center">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            {/* Step icon and number */}
            <div className="relative">
              <motion.div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#8a2be2]/10 to-[#ff3a8c]/10 
                flex items-center justify-center border border-white/10">
                <step.icon className="w-8 h-8 text-white/70" />
              </motion.div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r 
                from-[#8a2be2] to-[#ff3a8c] flex items-center justify-center text-xs font-bold">
                {step.number}
              </div>
            </div>

            {/* Step title */}
            <span className="text-lg font-medium text-white/70">{step.title}</span>
          </div>

          {/* Arrow between steps */}
          {index < steps.length - 1 && (
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="my-4"
            >
              <ArrowDown className="w-6 h-6 text-[#8a2be2]" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
