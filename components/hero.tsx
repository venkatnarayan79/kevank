"use client"

import { useState, useRef, useEffect } from "react"
import type { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { cn } from "@/lib/utils"
import { SearchForm } from "@/components/search-form"

// Config
const AUTO_PLAY_DELAY = 3000
const backgroundImages = [
  "header1.jpg",
  "header2.jpg",
  "header3.jpg",
  "header4.jpg",
  "header5.jpg",
]

export function Hero() {
  const [api, setApi] = useState<EmblaCarouselType | undefined>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const autoplayPlugin = useRef(
    Autoplay({ delay: AUTO_PLAY_DELAY, stopOnInteraction: false })
  )

useEffect(() => {
  if (!api) return;
  const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
  api.on("select", onSelect);
  setSelectedIndex(api.selectedScrollSnap());
  return () => {
    api.off("select", onSelect);
  };
}, [api]);


  return (
    <div className="relative overflow-hidden">
      {/* Carousel */}
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        {/* Slightly shorter on mobile so text + form fit */}
        <CarouselContent className="h-[930px] md:h-[550px]">
          {backgroundImages.map((img, i) => (
            <CarouselItem
              key={i}
              className="relative h-full"
              style={{ touchAction: 'pan-y' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50 pointer-events-auto">
          {backgroundImages.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "rounded-full transition-all",
                selectedIndex === i
                  ? "bg-[#9dd1a8] w-7 h-2"
                  : "bg-[#1c2a1f] w-2 h-2 hover:bg-[#1c2a1f]/80"
              )}
              aria-current={selectedIndex === i}
            />
          ))}
        </div>
      </Carousel>

      {/* Overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center gap-6 pt-12 md:block md:pt-0">
        {/* Mobile heading & paragraph */}
        <div className="w-full md:hidden flex justify-center px-5">
          <div className="max-w-[22rem] space-y-3 text-left">
            <h1 className="font-extrabold tracking-tight leading-snug text-3xl sm:text-4xl text-black">
              RENT WHAT<br />YOU NEED,<br />SHARE WHAT<br />YOU DON&apos;T.
            </h1>
            <p className="text-[15px] sm:text-base text-gray-900">
              Access thousands of tools, appliances, and equipment in your neighborhood. Save money, reduce waste, and connect with your community.
            </p>
          </div>
        </div>

        {/* Mobile form */}
        <div className="w-full px-4 md:hidden flex justify-center pointer-events-auto">
          <div className="bg-[#0e1c11] p-5 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm pointer-events-auto">
            <SearchForm />
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid container mx-auto h-full px-4 grid-cols-12 gap-x-6 items-center pointer-events-auto">
          <div className="col-start-5 col-span-3 text-black space-y-4">
            <h1 className="font-bold leading-none text-[clamp(2rem,6vw,30pt)]">
              RENT WHAT<br />YOU NEED,<br />SHARE WHAT<br />YOU DON&apos;T.
            </h1>
            <p className="text-base md:text-l max-w-prose text-gray-900">
              Access thousands of tools, appliances,<br /> and equipment in your neighborhood.<br /> Save money, reduce waste, and connect<br /> with your community.
            </p>
          </div>
          <div className="col-start-9 col-span-3 flex justify-start pointer-events-auto">
            <div className="bg-[#0e1c11] p-8 rounded-2xl shadow-xl w-full">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
