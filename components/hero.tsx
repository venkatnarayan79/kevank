"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import type { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"

import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

// Configuration constants
const AUTO_PLAY_DELAY = 3000 // Autoplay delay in milliseconds
const CAROUSEL_HEIGHT = "500px" // Height for the carousel

const backgroundImages = [
  "bike-ride-6804105_1280.jpg",
  "equipment-4521859_1920.jpg",
  "kavenk_homepage.jpg",
  "lawn-care-643559_1280.jpg",
  "man-498473_1920.jpg",
  "tent-548022_1920.jpg",
  "vacuum-cleaner-657719_1280.jpg",
  "woman-6572974_1280.jpg",
]

export function Hero() {
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const autoplayPlugin = useRef(
    Autoplay({ delay: AUTO_PLAY_DELAY, stopOnInteraction: false })
  )

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    // Set the initial index
    setSelectedIndex(api.selectedScrollSnap())

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <div className="relative overflow-hidden">
      {/* Carousel with rotating background images */}
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent style={{ height: CAROUSEL_HEIGHT }}>
          {backgroundImages.map((image, index) => (
            <CarouselItem key={index} className="relative">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
                aria-hidden="true"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-70 dark:opacity-80" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50 pointer-events-auto">
          {backgroundImages.map((_, index) => {
            const isCurrent = selectedIndex === index
            return (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${isCurrent ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isCurrent ? "true" : "false"}
              />
            )
          })}
        </div>
      </Carousel>

      {/* Fixed text overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-auto">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Your dream rental marketplace
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Build community. Skip Store. Save Planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#search-form" className={cn(buttonVariants({ variant: "default", size: "lg" }), "min-w-[150px]")}>
              Search Now
            </Link>
            <Link href="/create-listing" className={cn(buttonVariants({ variant: "outline", size: "lg" }),
              "min-w-[150px] bg-white/10 text-white border-white hover:bg-white/20")}>
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
