"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/search-form";

// Configuration constants
const AUTO_PLAY_DELAY = 5000; // Autoplay delay in milliseconds
const CAROUSEL_HEIGHT = "650px"; // Height for the carousel

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: AUTO_PLAY_DELAY, stopOnInteraction: false }),
  );

  return (
    <div className="relative overflow-hidden">
      {/* Carousel with rotating background images */}
      <Carousel
        plugins={[autoplayPlugin.current]}
        opts={{ loop: true }}
        className="w-full"
        onSlideChange={setCurrentSlide}
      >
        <CarouselContent style={{ height: CAROUSEL_HEIGHT }}>
          <CarouselItem className="relative">
            {/* Background image - person on scooter */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/woman-6572974_1280.jpg)` }}
              aria-hidden="true"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E352D] to-[#1E352D]/70" />
          </CarouselItem>
        </CarouselContent>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-50">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : "false"}
            />
          ))}
        </div>
      </Carousel>

      {/* Fixed text overlay */}
      <div className="absolute top-0 left-0 right-0 z-40 grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="flex items-center p-12 md:ml-12">
          <div className="text-white max-w-xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-2">
              RENT WHAT
              <br />
              YOU NEED.
            </h2>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              SHARE WHAT
              <br />
              YOU DON'T.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Save money by borrowing equipment from your neighbors.
              <br />
              Earn money, reduce waste, and connect
              <br />
              with your community.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="md:mt-8 md:mr-12 w-full max-w-md">
            <div className="hidden md:block">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
