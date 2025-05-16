import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { MobileDock } from "../mobile/MobileDock"

export function StoreLayout() {
  const location = useLocation()
  const hideOnPaths = ['/checkout'] // Add paths where MobileDock should be hidden

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <Outlet />
      </main>
      {/* Hide footer on mobile devices */}
      <div className="hidden md:block">
        <Footer />
      </div>
      {!hideOnPaths.includes(location.pathname) && <MobileDock />}
    </div>
  )
}
