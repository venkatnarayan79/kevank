"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CtaBanner: React.FC = () => {
  const tintFilter =
    "brightness(0) saturate(100%) invert(78%) sepia(25%) saturate(300%) hue-rotate(95deg)";

  return (
    <section
      aria-label="CTA banner"
      className="relative w-full overflow-hidden"
    >
      <Image
        src="/Layer_10.png"
        alt="Background"
        fill
        priority
        className="object-cover object-bottom"
      />

      <div className="absolute inset-0 bg-[#9DD1A8]/70 dark:bg-[#05230F]/80 backdrop-brightness-90" />

      <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 py-16 sm:py-28 px-0 mx-auto max-w-6xl">
        <Link
          href="#hero"
          className="flex flex-col items-center justify-center w-[240px] h-[168px] sm:w-[484px] sm:h-[338px] rounded-xl bg-[#00170A] text-white hover:scale-105 transition-transform duration-200"
        >
          <Image
            src="/deal.png"
            alt="Deal icon"
            width={48}
            height={48}
            className="object-contain"
            style={{ filter: tintFilter }}
          />
          <span className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-semibold">
            For Rent
          </span>
        </Link>

        <Link
          href="/create-listing"
          className="flex flex-col items-center justify-center w-[240px] h-[168px] sm:w-[484px] sm:h-[338px] rounded-xl bg-[#00170A] text-white hover:scale-105 transition-transform duration-200"
        >
          <Image
            src="/feature.png"
            alt="Feature icon"
            width={48}
            height={48}
            className="object-contain"
            style={{ filter: tintFilter }}
          />
          <span className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-semibold">
            List Your Product
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;
