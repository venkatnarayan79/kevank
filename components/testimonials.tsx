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
      <div className="max-w-[90%] mx-auto px-4 grid lg:grid-cols-[600px_1fr] gap-16">
        <aside className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Over&nbsp;150K<br />happy&nbsp;subscribers
          </h2>
          <div className="mt-1 h-1 w-16 bg-[#9dd1a8]" />
          <p className="mt-6 text-gray-600 max-w-xs">
            Hear what our customers are saying
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
          <div className="embla__container flex gap-20">
            {testimonials.map(({ name, avatar, message }, idx) => (
            <article
              key={idx}
              className="flex-shrink-0 basis-[280px] md:basis-160 bg-[#9dd1a8] rounded-[20px] p-8 md:p-20 relative"
            >
              <div className="absolute -top-1 right-6 w-12 md:w-20 aspect-square">
                <Image
                  src="/inverted-comma.png"
                  alt=""
                  fill
                  className="object-contain pointer-events-none select-none"
                />
              </div>
              <header className="flex items-center gap-4">
                {avatar ? (
                  <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden">
                    <Image
                      src={avatar}
                      alt={`${name} photo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="h-10 w-10 md:h-14 md:w-14 rounded-full flex items-center justify-center bg-gray-200">
                    <UserRound className="h-6 w-6 stroke-gray-500" aria-hidden="true" />
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