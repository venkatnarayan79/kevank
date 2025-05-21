"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { UserRound } from "lucide-react";

interface Testimonial {
  name: string;
  avatar?: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Julian Wan",
    avatar: "/julian-wan-2EdIX-O2lkI-unsplash.jpg",
    message:
      "Renting here felt effortless. The process is quick, the pricing is fair, and I never have to worry about storing bulky gear in my apartment.",
  },
  {
    name: "Alex Suprun",
    avatar: "/alex-suprun-mynsNaNwVDc-unsplash.jpg",
    message:
      "This platform lets me try pro-grade equipment without dropping a fortune. The owners I’ve met are friendly and the gear is always in top shape.",
  },
  {
    name: "Andrew Power",
    avatar: "/andrew-power-9ZXpKFlQkjo-unsplash.jpg",
    message:
      "I listed my DSLR kit last month and it’s already paying for itself. The dashboard makes managing bookings a breeze.",
  },
  {
    name: "Fatane Rahimi",
    avatar: "/fatane-rahimi-GNpmCi26fpI-unsplash.jpg",
    message:
      "Love the community vibe! Renting out my guitar each weekend helps cover my own subscription costs on the site.",
  },
];

const Testimonials: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
  }, [emblaApi, updateButtons]);

  const handlePrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const handleNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section aria-label="Testimonials" className="py-28 bg-white">
      <div className="max-w-[90%] mx-auto px-4 grid lg:grid-cols-[320px_1fr] gap-16">
        <aside className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Over&nbsp;1.5&nbsp;lakh<br />happy&nbsp;subscribers
          </h2>
          <div className="mt-1 h-1 w-16 bg-[#9dd1a8]" />
          <p className="mt-6 text-gray-600 max-w-xs">
            Here’s what they have to say about their Kevank experience.
          </p>
          <div className="mt-12 flex gap-4">
            <button
              onClick={handlePrev}
              disabled={!canScrollPrev}
              aria-label="Previous testimonial"
              className={
                `
                h-16 w-16 rounded-full bg-transparent flex items-center justify-center
                ${canScrollPrev ? "" : "opacity-40"}
                transition
              `}
            >
              <Image src="/back.png" alt="Previous" width={48} height={48} />
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollNext}
              aria-label="Next testimonial"
              className={
                `
                h-16 w-16 rounded-full bg-transparent flex items-center justify-center
                ${canScrollNext ? "" : "opacity-40"}
                transition
              `}
            >
              <Image src="/front.png" alt="Next" width={48} height={48} />
            </button>
          </div>
        </aside>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-8">
            {testimonials.map(({ name, avatar, message }, idx) => (
              <article
                key={idx}
                className="flex-shrink-0 basis-full bg-[#9dd1a8] rounded-[20px] p-12 relative"
              >
                <svg
                  viewBox="0 0 140 96"
                  className="absolute top-6 right-6 w-28 h-20 text-[#CBD3E6] pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <text x="0" y="80" fontSize="120" fontWeight="700">
                    ”
                  </text>
                </svg>
                <header className="flex items-center gap-4">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt={`${name} photo`}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="h-16 w-16 rounded-full flex items-center justify-center bg-gray-200">
                      <UserRound className="h-8 w-8 stroke-gray-500" aria-hidden="true" />
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900">{name}</h3>
                </header>
                <p className="mt-8 text-gray-700 leading-7">{message}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;