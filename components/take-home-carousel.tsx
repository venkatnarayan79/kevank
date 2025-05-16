"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

interface SlideCard {
  id: number;
  name: string;
  rent: string;
  imageName: string;
}

const slideCards: SlideCard[] = [
  { id: 1, name: "Single Door Fridge (190 Lt)", rent: "$100/month", imageName: "bike-ride-6804105_1280.jpg" },
  { id: 2, name: "Study Table (Walnut)", rent: "$50/month", imageName: "equipment-4521859_1920.jpg" },
  { id: 3, name: "Electric Bike", rent: "$10/per day", imageName: "kavenk_homepage.jpg" },
  { id: 4, name: "Vacuum Cleaner", rent: "$10/month", imageName: "lawn-care-643559_1280.jpg" },
  { id: 5, name: "Bike", rent: "$10/month", imageName: "man-498473_1920.jpg" },
  { id: 6, name: "Scooter", rent: "$15/month", imageName: "tent-548022_1920.jpg" },
  { id: 7, name: "Washing Machine", rent: "$20/month", imageName: "vacuum-cleaner-657719_1280.jpg" },
  { id: 8, name: "Microwave Oven", rent: "$12/month", imageName: "woman-6572974_1280.jpg" },
];

const TakeHomeCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "start",
    breakpoints: {
      "(min-width:1024px)": { slidesToScroll: 4 },
      "(min-width:640px) and (max-width:1023px)": { slidesToScroll: 2 },
      "(max-width:639px)": { slidesToScroll: 1 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section aria-label="You’ll love to take these home" className="py-20 md:py-24 bg-[#9dd1a8]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading + HR + Arrows */}
        <div className="mb-8 md:mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            You’ll love to<br />
            take these home
          </h2>
          <hr className="border-t-2 border-white w-24 mx-auto mt-3" />
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous slide"
              className={`
                h-11 w-11 rounded-full bg-transparent flex items-center justify-center
                ${canScrollPrev ? "hover:ring-2 hover:ring-black" : "opacity-40"}
                transition
              `}
            >
              {/* LEFT arrow from Testimonials */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M32 12 L16 24 L32 36"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next slide"
              className={`
                h-11 w-11 rounded-full bg-transparent flex items-center justify-center
                ${canScrollNext ? "hover:ring-2 hover:ring-black" : "opacity-40"}
                transition
              `}
            >
              {/* RIGHT arrow from Testimonials */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M16 12 L32 24 L16 36"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Embla Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef} aria-live="polite">
          <div className="embla__container flex gap-6 md:gap-8 px-1">
            {slideCards.map(({ id, name, rent, imageName }) => (
              <div
                key={id}
                className="flex flex-col w-64 md:w-72 lg:w-80 flex-shrink-0 rounded-lg border-[4px] border-[#8FD0A8] bg-white p-5"
              >
                <Image
                  src={`/${imageName}`}
                  width={320}
                  height={320}
                  alt={name}
                  className="aspect-square object-cover rounded"
                />
                <span className="mt-4 font-semibold text-gray-900 leading-snug line-clamp-2">
                  {name}
                </span>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 block">Rent</span>
                    <span className="text-lg font-semibold text-gray-900">{rent}</span>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="px-4 py-2 text-sm font-medium border border-[#8FD0A8] text-gray-800 rounded-md transition hover:bg-[#8FD0A8]/10"
                    type="button"
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeHomeCarousel;
