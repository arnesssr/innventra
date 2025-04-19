import { LucideIcon, Store, Boxes, BarChart2, Share2, Bot, Settings } from "lucide-react"

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

export const featuresList: Feature[] = [
  {
    title: "Smart Product Dashboard",
    description: "Manage your products with an intuitive and powerful dashboard",
    icon: Store
  },
  {
    title: "Inventory Tracking",
    description: "Real-time stock monitoring with automatic alerts",
    icon: Boxes
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into your product performance and trends",
    icon: BarChart2
  },
  {
    title: "Multi-Channel Publishing",
    description: "Publish products to multiple platforms with one click",
    icon: Share2
  }
]

export const mockContent = {
  // ...existing mockContent object...
}
