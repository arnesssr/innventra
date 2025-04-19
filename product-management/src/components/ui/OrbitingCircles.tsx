import { cn } from "../../lib/utils"
import React from "react"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childrenCount = React.Children.count(children)
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0"
          style={{ width: `${radius * 2 + iconSize}px`, height: `${radius * 2 + iconSize}px` }}
        >
          <circle 
            className="stroke-white/10" 
            cx="50%" 
            cy="50%" 
            r={radius} 
            fill="none" 
            strokeWidth="1"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / childrenCount) * index
        const angleInRadians = (angle * Math.PI) / 180
        
        return (
          <div
            style={{
              position: 'absolute',
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              left: '50%',
              top: '50%',
              marginLeft: `-${iconSize / 2}px`,
              marginTop: `-${iconSize / 2}px`,
              animation: `orbit${reverse ? 'Reverse' : ''} ${calculatedDuration}s linear infinite`,
              transformOrigin: "center",
            }}
            className={cn(
              "flex items-center justify-center",
              className
            )}
            {...props}
          >
            <div 
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}
            >
              {child}
            </div>
          </div>
        )
      })}
    </div>
  )
}