"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { UserRound } from "lucide-react";

interface Testimonial {
  name: string;
  avatar?: string;       // optional now
  message: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Julian Wan",
    avatar: "/julian-wan-2EdIX-O2lkI-unsplash.jpg",   // 6e3b4681-…jpg
    message:
      "Renting here felt effortless. The process is quick, the pricing is fair, and I never have to worry about storing bulky gear in my apartment.",
  },
  {
    name: "Alex Suprun",
    avatar: "/alex-suprun-mynsNaNwVDc-unsplash.jpg",     // 32afa630-…jpg
    message:
      "This platform lets me try pro-grade equipment without dropping a fortune. The owners I’ve met are friendly and the gear is always in top shape.",
  },
  {
    name: "Andrew Power",
    avatar: "/andrew-power-9ZXpKFlQkjo-unsplash.jpg",      // a8f2632a-…jpg
    message:
      "I listed my DSLR kit last month and it’s already paying for itself. The dashboard makes managing bookings a breeze.",
  },
  {
    name: "Kevin Park",
    avatar: "/kevin-park.jpg",        // 7432387a-…jpg
    message:
      "Booking was seamless. Pick-up and return took minutes, and customer support followed up to make sure everything went smoothly.",
  },
  {
    name: "Fatane Rahimi",
    avatar: "/fatane-rahimi-GNpmCi26fpI-unsplash.jpg",     // e2a150af-…jpg
    message:
      "Love the community vibe! Renting out my guitar each weekend helps cover my own subscription costs on the site.",
  },
];

const Testimonials: React.FC = () => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: "start" });
  const [canPrev, setCanPrev]   = useState(false);
  const [canNext, setCanNext]   = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
  }, [embla, onSelect]);

  return (
    <section aria-label="Testimonials" className="py-28 bg-white dark:bg-black">
      <div className="grid lg:grid-cols-[320px_1fr] gap-16 max-w-7xl mx-auto px-4">
        {/* ─── LEFT SIDE ───────────────────────────────────── */}
        <aside className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight dark:text-gray-300">
            Over&nbsp;1.5&nbsp;lac<br />happy&nbsp;subscribers
          </h2>
          <div className="mt-1 h-1 w-16 bg-red-500" />
          <p className="mt-6 text-gray-600 max-w-xs dark:text-gray-300">
            Here's what they have to say about their RentoMojo experience.
          </p>

          {/* arrows */}
          <div className="mt-12 flex gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              className="h-14 w-14 flex items-center justify-center rounded-full
                         ring-1 ring-gray-300 text-gray-500 transition
                         hover:bg-gray-50 disabled:bg-white disabled:text-gray-300"
            >
              ‹
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              className="h-14 w-14 flex items-center justify-center rounded-full
                         ring-1 ring-gray-800 text-gray-800 transition
                         hover:bg-gray-50 disabled:bg-white disabled:text-gray-300"
            >
              ›
            </button>
          </div>
        </aside>

        {/* ─── CAROUSEL ───────────────────────────────────── */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-10">
            {testimonials.map(({ name, avatar, message }, idx) => (
              <article
                key={idx}
                className="w-[480px] sm:w-[560px] flex-shrink-0
                           bg-[#F6F8FB] rounded-[20px] p-12 relative"
              >
                {/* decorative quotes */}
                 {/* decorative quote mark – fixed position */}
                <svg
                  viewBox="0 0 140 96"
                  className="absolute top-6 right-6 w-28 h-20 text-[#CBD3E6]
                            pointer-events-none select-none overflow-hidden"
                  aria-hidden="true"
                >
                  <text x="0" y="80" fontSize="120" fontWeight="700">”</text>
                </svg>

                {/* avatar + name */}
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

                {/* message */}
                <p className="mt-8 text-gray-700 leading-7">
                  {message}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
