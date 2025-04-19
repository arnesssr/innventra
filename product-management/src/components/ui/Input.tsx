import * as React from "react"

import { cn } from "../../lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  className?: string
  type?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-xl bg-background text-foreground",
          "border-none",
          "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]",
          "hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]",
          "focus:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.2),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]",
          "focus:outline-none",
          "px-4 py-3",
          "transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
