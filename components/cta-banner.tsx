"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CtaBanner: React.FC = () => {
  // filter to map black strokes → #9DD1A8
  const tintFilter =
    "brightness(0) saturate(100%) invert(78%) sepia(25%) saturate(300%) hue-rotate(95deg)";

  return (
    <section aria-label="CTA banner" className="relative w-full">
      {/* background image */}
      <Image
        src="/man-498473_1920.jpg"
        alt="Electric scooter"
        fill
        priority
        className="object-cover"
      />

      {/* colored overlay */}
      <div className="absolute inset-0 bg-[#9DD1A8]/70 dark:bg-[#05230F]/80 backdrop-brightness-90" />

      {/* CTA cards */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 py-16 sm:py-28 px-4 sm:px-0 mx-auto max-w-6xl">
        {/* For Rent */}
        <Link
          href="#hero"
          className="flex flex-col items-center justify-center w-full sm:w-80 h-56 sm:h-72 rounded-xl bg-[#00170A] text-white hover:scale-105 transition-transform duration-200"
        >
          <Image
            src="/deal.png"
            alt="Deal icon"
            width={48}
            height={48}
            className="object-contain"
            style={{ filter: tintFilter }}
          />
          <span className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold">
            For Rent
          </span>
        </Link>

        {/* List Your Product */}
        <Link
          href="/create-listing"
          className="flex flex-col items-center justify-center w-full sm:w-80 h-56 sm:h-72 rounded-xl bg-[#00170A] text-white hover:scale-105 transition-transform duration-200"
        >
          <Image
            src="/feature.png"
            alt="Feature icon"
            width={48}
            height={48}
            className="object-contain"
            style={{ filter: tintFilter }}
          />
          <span className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold">
            List Your Product
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;
