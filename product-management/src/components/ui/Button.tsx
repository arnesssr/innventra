import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"
import { useVisualStyle } from '../../context/visual-style-context'

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
}

export function Button({ 
  className = '', 
  size = 'md',
  variant = 'default',
  ...props 
}: ButtonProps) {
  const { style } = useVisualStyle()
  
  return (
    <button 
      className={`button ${className}`}
      data-size={size}
      data-variant={variant}
      data-visual-style={style}
      {...props} 
    />
  )
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    const Comp = Slot

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    }

    const sizes = {
      sm: "h-9 rounded-md px-3",
      md: "h-10 px-4 py-2",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium",
          "transition-all duration-200 ease-out",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonComponent.displayName = "ButtonComponent"

export { ButtonComponent }
