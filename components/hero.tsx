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

import { SearchForm } from "@/components/search-form"

// Configuration constants
const AUTO_PLAY_DELAY = 3000 // Autoplay delay in milliseconds
const CAROUSEL_HEIGHT = "500px" // Height for the carousel

const backgroundImages = [
  "header1.jpg",
  "header2.jpg",
  "header3.jpg",
  "header4.jpg",
  "header5.jpg",
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
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${isCurrent 
                    ? "bg-[#9dd1a8] w-7" 
                    : "bg-[#1c2a1f] hover:bg-[#1c2a1f]/80"
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isCurrent ? "true" : "false"}
              />
            )
          })}
        </div>
      </Carousel>

      {/* Fixed text overlay */}
{/* Fixed text overlay */}
<div className="absolute inset-0 z-40 pointer-events-none">
  <div className="container mx-auto h-full px-4">
    <div className="h-full flex items-center">
      <div className="grid grid-cols-12 items-start gap-x-6 w-full pointer-events-auto">

        {/* Text block */}
        <div className="col-start-5 col-span-4 text-black space-y-4 self-center">
          <h1 className="font-bold leading-tight text-[clamp(2rem,6vw,35pt)]">
            RENT WHAT<br />
            YOU NEED,<br />
            SHARE WHAT<br />
            YOU DON'T.
          </h1>
          <p className="text-base md:text-xl max-w-prose">
            Access thousands of tools, appliances, and equipment in your neighborhood.<br />
            Save money, reduce waste, and connect with your community.
          </p>
        </div>

        {/* Form panel */}
        <div className="col-span-12 md:col-start-9 md:col-span-3 mt-8 md:mt-0">
          <div className="bg-[#0e1c11] p-6 md:p-8 rounded-2xl shadow-xl w-full">
            <SearchForm />
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  )
}
