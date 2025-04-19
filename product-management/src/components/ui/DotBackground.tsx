import { cn } from "../../lib/utils"

export function DotBackground() {
  return (
    <div className="absolute inset-0">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0a0e17] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  )
}
