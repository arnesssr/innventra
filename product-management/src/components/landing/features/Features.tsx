import { motion, AnimatePresence } from "framer-motion"
import { FlowSteps } from "./FlowSteps"
import { MockDashboard } from "./components/MockDashboard"
import type { MockDashboardProps } from "./components/MockDashboard"
import { useState, useEffect } from "react"
import { Store, Upload, Settings, Share2, LineChart, Box } from "lucide-react"

// Define type-safe dashboard states
const dashboardStates: Array<MockDashboardProps> = [
  {
    title: "Product Management",
    sidebarItems: ["Products", "Categories", "Variants", "Media", "Settings"],
    stats: [
      { label: "Total Products", value: "2,431", trend: "+12.5%" },
      { label: "Active Listings", value: "1,890", trend: "+8.1%" },
      { label: "Categories", value: "48", trend: "+3.2%" }
    ],
    mainContent: {
      type: "productGrid" as const,
      items: [
        { name: "Premium T-Shirt", price: "$29.99" },
        { name: "Denim Jacket", price: "$89.99" },
        { name: "Running Shoes", price: "$119.99" },
        { name: "Smart Watch", price: "$199.99" }
      ]
    },
    activeItem: 0,
    isHovered: false,
    onMenuHover: () => {}
  },
  {
    title: "Sales Dashboard",
    sidebarItems: ["Overview", "Orders", "Customers", "Reports", "Settings"],
    stats: [
      { label: "Daily Sales", value: "$8,492", trend: "+15.2%" },
      { label: "Conversion", value: "3.2%", trend: "+1.1%" },
      { label: "Avg Order", value: "$122", trend: "+5.8%" }
    ],
    mainContent: {
      type: "analytics" as const,
      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [65, 80, 75, 90, 85, 95]
      }
    },
    activeItem: 0,
    isHovered: false,
    onMenuHover: () => {}
  },
  {
    title: "Analytics Overview",
    sidebarItems: ["Dashboard", "Reports", "Revenue", "Customers", "Trends"],
    stats: [
      { label: "Revenue", value: "$142.3k", trend: "+12.5%" },
      { label: "Customers", value: "892", trend: "+8.1%" },
      { label: "ROI", value: "24.5%", trend: "+15.2%" }
    ],
    mainContent: {
      type: "analytics" as const,
      chartData: {
        labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [70, 85, 95, 88, 92, 98]
      }
    },
    activeItem: 0,
    isHovered: false,
    onMenuHover: () => {}
  },
  {
    title: "Inventory Overview",
    sidebarItems: ["Stock", "Orders", "Suppliers", "Returns", "Forecasts"],
    stats: [
      { label: "Total SKUs", value: "3,421", trend: "+5.2%" },
      { label: "Out of Stock", value: "12", trend: "-8.3%" },
      { label: "Low Stock", value: "45", trend: "-2.1%" }
    ],
    mainContent: {
      type: "stockMonitor" as const,
      warehouses: [
        { name: "Main Warehouse", stockLevel: 85, alerts: 0 },
        { name: "East Coast", stockLevel: 65, alerts: 2 },
        { name: "West Coast", stockLevel: 92, alerts: 1 }
      ]
    },
    activeItem: 0,
    isHovered: false,
    onMenuHover: () => {}
  },
  {
    title: "Channel Integration",
    sidebarItems: ["Channels", "Custom Site", "Sync", "Rules", "Settings"],
    stats: [
      { label: "Channels", value: "8", trend: "+2" },
      { label: "Products Synced", value: "2,431", trend: "+10.5%" },
      { label: "Success Rate", value: "99.8%", trend: "+0.2%" }
    ],
    mainContent: {
      type: "productGrid" as const,
      items: [
        { name: "Premium Store", price: "Active" },
        { name: "Amazon Store", price: "Active" },
        { name: "eBay Shop", price: "Syncing" },
        { name: "Shopify", price: "Active" }
      ]
    },
    activeItem: 0,
    isHovered: false,
    onMenuHover: () => {}
  }
] as const

export function Features() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const flowSteps = [
    {
      title: "Create Store",
      description: "Set up your digital storefront",
      icon: Store,
      color: "from-[#8a2be2] to-[#ff3a8c]"
    },
    {
      title: "Upload Products",
      description: "Import your inventory easily",
      icon: Upload,
      color: "from-[#ff3a8c] to-[#ff8f5c]"
    },
    {
      title: "Configure Settings",
      description: "Set pricing and variants",
      icon: Settings,
      color: "from-[#ff8f5c] to-[#ffc53d]"
    },
    {
      title: "Connect Channels",
      description: "Integrate with marketplaces",
      icon: Share2,
      color: "from-[#ffc53d] to-[#8a2be2]"
    },
    {
      title: "Monitor Analytics",
      description: "Track performance metrics",
      icon: LineChart,
      color: "from-[#8a2be2] to-[#ff3a8c]"
    },
    {
      title: "Manage Inventory",
      description: "Real-time stock updates",
      icon: Box,
      color: "from-[#ff3a8c] to-[#ff8f5c]"
    }
  ]

  // Auto-scroll through dashboards
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dashboardStates.length)
    }, 4000) // Faster rotation to see all dashboards

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-[#0a0e17] min-h-screen py-20" id="features">
      <div className="container mx-auto px-4">
        <div className="flex gap-12 items-start"> {/* Changed gap and alignment */}
          {/* Left side - Dashboard */}
          <div className="w-[750px] shrink-0"> {/* Slightly increased width */}
            {/* Added title to show current dashboard */}
            <motion.div
              className="text-xl font-medium text-center mb-4 bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c] 
                bg-clip-text text-transparent"
              key={`title-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {dashboardStates[currentIndex].title}
            </motion.div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-white/5 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c]"
                animate={{
                  width: "100%",
                  transition: { duration: 4, repeat: Infinity }
                }}
              />
            </div>

            {/* Dashboard container */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="h-[520px]" // Slightly increased height
                >
                  <MockDashboard 
                    {...dashboardStates[currentIndex]} 
                  />
                </motion.div>
              </AnimatePresence>

              {/* Moved indicators below the dashboard */}
              <div className="mt-6 flex justify-center gap-3">
                {dashboardStates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 transition-all duration-300 rounded-full
                      ${index === currentIndex 
                        ? 'w-8 bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c]' 
                        : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Flow steps */}
          <div className="flex-1 pt-16"> {/* Increased padding-top from pt-8 to pt-16 */}
            <div className="grid grid-cols-2 gap-4">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-4"
                >
                  {/* Step number */}
                  <div className="absolute -left-2 -top-2 w-6 h-6 rounded-full 
                    bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c] flex items-center justify-center">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="pl-5">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${step.color} p-[1px] mb-3`}>
                      <div className="w-full h-full rounded-lg bg-[#1a1f2e] flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-white/90" />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-white/60">{step.description}</p>
                  </div>

                  {/* Updated hover effect using motion.div properly */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8a2be2]/5 to-[#ff3a8c]/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
