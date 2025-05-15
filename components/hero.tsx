"use client"

import { useState, useRef, useEffect } from "react"
import type { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"

/* import { buttonVariants } from "./ui/button" */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel"
import { SearchForm } from "@/components/search-form";

// Configuration constants
const AUTO_PLAY_DELAY = 3000 // Autoplay delay in milliseconds

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

  return (
    <div className="relative overflow-hidden">
      {/* Carousel with rotating background images */}
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent
          style={{ height: "560px" }}
          className="md:h-[560px] sm:h-[420px]"
        >
          {backgroundImages.map((image, index) => (
            <CarouselItem key={index} className="relative">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
                aria-hidden="true"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 dark:opacity-80" />
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
                className={`w-2 h-2 rounded-full transition-all ${isCurrent ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isCurrent ? "true" : "false"}
              />
            )
          })}
        </div>
      </Carousel>

      {/* Fixed text overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl">
          {/* Left side: Heading and paragraph */}
          <div className="text-gray-900 dark:text-white max-w-lg self-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rent what you need, share what you don&apos;t.
            </h1>
            <p className="text-xl max-w-md">
              Access thousands of tools, appliances, and equipment in your neighborhood. Save money, reduce waste, and connect with your community.
            </p>
          </div>

          {/* Right side: Search card */}
          <div className="bg-white dark:bg-[#1C2A1F] rounded-lg p-8 max-w-md mx-auto text-gray-900 dark:text-white">
            <h3 className="text-center text-xl font-semibold mb-6">
              FIND YOUR PERFECT RENTAL
            </h3>
            <SearchForm />
          </div>
        </div>
      </div>
    </div>
  )
}
