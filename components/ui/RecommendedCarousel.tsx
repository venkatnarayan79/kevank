"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";

type RecommendedCarouselProps = {
  mainHeading?: string;
  subHeading?: string;
};

const items = [
  {
    src: "/bike-ride-6804105_1280.jpg",
    title: "Bike",
  },
  {
    src: "/equipment-4521859_1920.jpg",
    title: "Equipment",
  },
  {
    src: "/kavenk_homepage.jpg",
    title: "Home Essential",
  },
  {
    src: "/lawn-care-643559_1280.jpg",
    title: "Lawn Care",
  },
  {
    src: "/man-498473_1920.jpg",
    title: "Man Gear",
  },
  {
    src: "/tent-548022_1920.jpg",
    title: "Camping Tent",
  },
  {
    src: "/vacuum-cleaner-657719_1280.jpg",
    title: "Vacuum Cleaner",
  },
  {
    src: "/woman-6572974_1280.jpg",
    title: "Woman Gear",
  },
  {
    src: "/vacuum-cleaner-657719_1280.jpg",
    title: "Vacuum Cleaner Deluxe",
  },
];

export function RecommendedCarousel({
  mainHeading = "Recommended Rentals",
  subHeading = "Discover popular items to rent",
}: RecommendedCarouselProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="w-full max-w-screen-lg mx-auto px-4 mt-12 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 className="text-4xl font-extrabold mb-4 text-center text-foreground">
        {mainHeading}
      </h1>
      <h2 className="text-xl font-semibold mb-8 text-center text-muted-foreground">
        {subHeading}
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="relative"
      >
        <CarouselContent className="-ml-6">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-6 basis-1/4">
              <div className="group relative rounded-lg overflow-hidden border border-border shadow-sm transition-shadow hover:shadow-md">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    priority={index < 4}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                    <p className="text-white text-base font-semibold">{item.title}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {isHovered && (
          <>
            <CarouselPrevious className="bg-background hover:bg-accent hover:text-accent-foreground text-foreground rounded-full p-2 shadow-md left-3 top-1/2 -translate-y-1/2 absolute z-20 transition-colors" />
            <CarouselNext className="bg-background hover:bg-accent hover:text-accent-foreground text-foreground rounded-full p-2 shadow-md right-3 top-1/2 -translate-y-1/2 absolute z-20 transition-colors" />
          </>
        )}
      </Carousel>
    </div>
  );
}
