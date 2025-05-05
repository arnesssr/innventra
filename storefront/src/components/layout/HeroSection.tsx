import React from "react"
import { Button } from "../../components/ui/Button"

export function HeroSection() {
  return (
    <section className="relative bg-accent py-28">
      <div className="container">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Welcome to our Store
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover our amazing products and best deals
          </p>
          <a href="#products" className="inline-flex">
            <Button size="lg">
              Shop Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
