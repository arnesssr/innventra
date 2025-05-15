import React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { StoreFooter } from "./StoreFooter"

export function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  )
}
