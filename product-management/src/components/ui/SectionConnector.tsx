export function SectionConnector() {
  return (
    <div className="relative h-16">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* More pronounced, elegant curve */}
        <path
          d="M 0,32 C 480,64 960,0 1440,32"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
