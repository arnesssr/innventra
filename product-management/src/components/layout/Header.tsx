import { UserButton } from "@clerk/clerk-react"

export function Header() {
  return (
    <header className="border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Product Management</h1>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  )
}
