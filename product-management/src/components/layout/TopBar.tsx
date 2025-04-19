import { UserButton } from "@clerk/clerk-react"
import { Bell, Search } from "lucide-react"
import { Button } from "../ui/Button"
import { ThemeToggle } from "../ui/ThemeToggle"

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side - Search */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground flex-1 outline-none"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            className="relative hover:bg-accent"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
                userButtonPopoverCard: "bg-popover border border-border",
                userButtonPopoverFooter: "hidden"
              }
            }}
            afterSignOutUrl="/"
          />
        </div>
      </div>
    </header>
  )
}
