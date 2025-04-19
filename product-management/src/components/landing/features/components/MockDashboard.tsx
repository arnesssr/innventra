import { motion } from "framer-motion"
import { 
  LayoutGrid, 
  Package, 
  Settings, 
  BarChart2, 
  Users, 
  ShoppingCart, 
  Database,
  Tags,
  Boxes,
  Store,
  LineChart,
  ArrowUpRight
} from "lucide-react"

interface ChartData {
  values: number[];
  labels: string[];
}

interface ChartMainContent {
  type: "analytics";
  chartData: ChartData;
}

interface ProductGridItem {
  name: string;
  price: string;
}

interface ProductGridMainContent {
  type: "productGrid";
  items: ProductGridItem[];
}

interface Warehouse {
  name: string;
  stockLevel: number;
  alerts: number;
}

interface StockMonitorMainContent {
  type: "stockMonitor";
  warehouses: Warehouse[];
}

type MainContent = ChartMainContent | ProductGridMainContent | StockMonitorMainContent;

export interface MockDashboardProps {
  title: string;
  sidebarItems: string[];
  stats: Array<{
    label: string;
    value: string;
    trend?: string;
  }>;
  mainContent: MainContent;
  activeItem: number;
  isHovered: boolean;
  onMenuHover: (index: number) => void;
}

const SIDEBAR_ICONS: { [key: string]: any } = {
  "Overview": LayoutGrid,
  "Products": Package,
  "Categories": Tags,
  "Variants": Boxes,
  "Media": Store,
  "Settings": Settings,
  "Reports": BarChart2,
  "Performance": LineChart,
  "Customers": Users,
  "Orders": ShoppingCart,
  "Stock": Database,
}

export function MockDashboard({ 
  title, 
  sidebarItems, 
  stats, 
  mainContent, 
  activeItem, 
  isHovered, 
  onMenuHover 
}: MockDashboardProps) {
  return (
    <div className="bg-[#232838] rounded-[24px] p-10 relative shadow-2xl h-full overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent rounded-[24px]" />
      
      <div className="flex justify-between items-center mb-10">
        {/* MacOS-style buttons */}
        <div className="flex items-center gap-3">
          <div className="flex gap-3">
            <span className="w-4 h-4 rounded-full bg-[#ff5f57] shadow-glow-red" />
            <span className="w-4 h-4 rounded-full bg-[#febc2e] shadow-glow-yellow" />
            <span className="w-4 h-4 rounded-full bg-[#28c840] shadow-glow-green" />
          </div>
          <h3 className="text-[1.5rem] text-[#f0f0f0] ml-6 font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-4 text-[#a0a0a0] text-sm">
          <span>⌘</span>
          <span>⟲</span>
        </div>
      </div>

      <div className="grid grid-cols-[320px,1fr] gap-10">
        {/* Sidebar with softer corners */}
        <div className="bg-black/20 rounded-[18px] backdrop-blur-sm overflow-hidden">
          {sidebarItems.map((item: string, index: number) => {
            const Icon = SIDEBAR_ICONS[item] || Settings
            return (
              <motion.div 
                key={item}
                className="relative px-5 py-3.5 rounded-[14px] mb-1 text-sm cursor-pointer"
                onMouseEnter={() => onMenuHover(index)}
                animate={{
                  backgroundColor: index === activeItem 
                    ? "rgba(138,43,226,0.2)" 
                    : "transparent",
                  color: index === activeItem ? "#fff" : "#a0a0a0",
                  x: index === activeItem && isHovered ? 5 : 0
                }}
                whileHover={{
                  backgroundColor: "rgba(138,43,226,0.1)",
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="space-y-6">
          {/* Stat cards with softer design */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="bg-black/20 rounded-[16px] p-5 backdrop-blur-sm border border-white/[0.02]"
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <h4 className="text-[#a0a0a0] text-xs mb-2">{stat.label}</h4>
                <motion.div 
                  className="text-xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
                {stat.trend && (
                  <motion.div 
                    className="text-[#28c840] text-xs mt-1 flex items-center gap-1"
                  >
                    <span>↑</span>{stat.trend}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Main content area with softer corners */}
          <div className="bg-black/20 rounded-[20px] p-6 backdrop-blur-sm border border-white/[0.02]">
            {mainContent.type === "productGrid" && (
              <div className="grid grid-cols-2 gap-2">
                {mainContent.items.map((item: ProductGridItem) => (
                  <motion.div
                    key={item.name}
                    className="bg-white/5 p-2 rounded"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-[#a0a0a0]">{item.price}</div>
                  </motion.div>
                ))}
              </div>
            )}
            {mainContent.type === "stockMonitor" && (
              <div className="space-y-4">
                {mainContent.warehouses.map((warehouse: Warehouse, i: number) => (
                  <motion.div 
                    key={warehouse.name}
                    className="bg-white/5 p-4 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{warehouse.name}</span>
                      <span className="text-xs text-[#a0a0a0]">
                        {warehouse.alerts > 0 ? `${warehouse.alerts} alerts` : 'OK'}
                      </span>
                    </div>
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#8a2be2] to-[#ff3a8c]"
                        initial={{ width: 0 }}
                        animate={{ width: `${warehouse.stockLevel}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {mainContent.type === "analytics" && (
              <div className="h-full w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Revenue Overview</h3>
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                </div>
                <div className="relative h-[240px]">
                  {/* Gradient line graph */}
                  <svg className="w-full h-full" viewBox="0 0 600 240">
                    <defs>
                      <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8a2be2" />
                        <stop offset="100%" stopColor="#ff3a8c" />
                      </linearGradient>
                      <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8a2be2" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#ff3a8c" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {(mainContent as ChartMainContent).chartData.values.map((value: number, i: number, arr: number[]) => {
                      const x1 = (i / (arr.length - 1)) * 600;
                      const x2 = ((i + 1) / (arr.length - 1)) * 600;
                      const y1 = 240 - (value / 100) * 240;
                      const y2 = i < arr.length - 1 ? 240 - (arr[i + 1] / 100) * 240 : y1;

                      return (
                        <g key={i}>
                          {/* Area under line */}
                          <path
                            d={`M ${x1} ${y1} L ${x2} ${y2} L ${x2} 240 L ${x1} 240 Z`}
                            fill="url(#area-gradient)"
                          />
                          {/* Line */}
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="url(#line-gradient)"
                            strokeWidth="2"
                            className="drop-shadow-glow"
                          />
                          {/* Point */}
                          <circle
                            cx={x1}
                            cy={y1}
                            r="4"
                            fill="#8a2be2"
                            className="drop-shadow-glow"
                          />
                          {/* Label */}
                          <text
                            x={x1}
                            y="230"
                            textAnchor="middle"
                            className="text-xs fill-white/70"
                          >
                            {(mainContent as ChartMainContent).chartData.labels[i]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
