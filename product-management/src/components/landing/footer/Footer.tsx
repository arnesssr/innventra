import { Link } from "react-router-dom"
import { Logo } from "../../brand/Logo"

export function Footer() {
  return (
    <footer className="bg-[#111827] py-12 border-t border-white/10">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="opacity-80 hover:opacity-100 transition-opacity">
            <Logo size="xl" /> {/* Now correctly typed */}
          </div>
          
          <p className="text-[#a0a0a0] text-sm">
            © {new Date().getFullYear()} Inventra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
