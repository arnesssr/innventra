type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12'
}

export function Logo({ size = 'md' }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div 
        data-testid="logo-icon"
        className={sizeClasses[size]}
      >
        {/* Logo icon content */}
      </div>
      <span className="font-bold">Inventra</span>
    </div>
  )
}