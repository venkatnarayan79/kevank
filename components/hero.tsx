import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 dark:opacity-80" />
      <div
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      >
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Find Your Dream Rental Today</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Browse thousands of properties all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#search">
              <Button size="lg" className="min-w-[150px]">
                Search Now
              </Button>
            </Link>
            <Link href="/create-listing">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[150px] bg-white/10 text-white border-white hover:bg-white/20"
              >
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}