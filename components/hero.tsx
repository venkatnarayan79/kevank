"use client";

import { useState, useRef, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { SearchForm } from "@/components/search-form";

// Configuration constants
const AUTO_PLAY_DELAY = 3000; // Autoplay delay in milliseconds

export function Hero() {
  const [api, setApi] = useState<EmblaCarouselType>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: AUTO_PLAY_DELAY, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    // initialize the indicator
    setSelectedIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const backgroundImages = [
    "header1.jpg",
    "header2.jpg",
    "header3.jpg",
    "header4.jpg",
    "header5.jpg",
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Carousel with rotating background images */}
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{ loop: true }}
        className="w-screen"
      >
        {/* Full-screen height + width */}
        <CarouselContent className="h-[74vh] w-screen">
          {backgroundImages.map((img, idx) => (
            <CarouselItem
              key={idx}
              className="relative flex-shrink-0 flex-grow-0 basis-full"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"
                aria-hidden="true"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50 pointer-events-auto">
          {backgroundImages.map((_, idx) => {
            const isCurrent = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`rounded-full transition-all ${
                  isCurrent
                    ? "bg-[#9DD1A8] w-4 h-4"
                    : "bg-[#9DD1A8]/50 w-2 h-2 hover:bg-[#9DD1A8]/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isCurrent ? "true" : "false"}
              />
            );
          })}
        </div>
      </Carousel>

      {/* Fixed text + form overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl">
          {/* Hero text */}
          <div className="max-w-lg self-center">
            <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Rent what you need, share what you don’t.
            </h1>
            <p className="text-black text-xl max-w-md font-light">
              Access thousands of tools, appliances, and equipment in your
              neighborhood. Save money, reduce waste, and connect with your
              community.
            </p>
          </div>

          {/* Search form */}
          <div className="bg-white dark:bg-[#1C2A1F] rounded-lg p-4 max-w-sm mx-auto text-gray-900 dark:text-white">
            <div className="mt-0">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
