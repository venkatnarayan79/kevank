"use client";

import React from "react";
import Image from "next/image";

/* ─── category data ───────────────────────────────────────────────────── */
const categories = [
  { name: "Appliances", alt: "Appliances", imageSrc: "/washing.png" },
  { name: "Equipment", alt: "Equipment", imageSrc: "/customer-support.png" },
  { name: "Sports", alt: "Sports", imageSrc: "/golfing.png" },
  { name: "Outdoors / Camping", alt: "Outdoors and Camping", imageSrc: "/camping.png" },
  { name: "Special Occasions", alt: "Special Occasions", imageSrc: "/ice-skating.png" },
  { name: "Sports Equipment", alt: "Sports Equipment", imageSrc: "/base.png" },

  { name: "Outdoor Gear", alt: "Outdoor Gear", imageSrc: "/bicycle.png" },

  { name: "Miscellaneous", alt: "Miscellaneous", imageSrc: "/laptop.png" },
];

/* ─── component ──────────────────────────────────────────────── */
const CategoryGrid: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section aria-label="Product categories" className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#003366] mb-2 text-center">
          Rent What You Need
        </h1>
        <hr className="border-t-2 border-[#FDDB32] w-24 mx-auto mb-10" />



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(({ name, alt, imageSrc }) => (
            <button
              key={name}
              onClick={scrollToTop}
              aria-label={alt}
              className="
                transform               /* enable transforms */
                w-full                  /* fill cell width */
                aspect-[287/100]        /* preserve ratio */
                flex flex-col items-center justify-center
                rounded-lg p-4 bg-[#FDDB32]
                transition duration-300
                lg:scale-[1.02]         /* 2% larger on desktop */
                hover:scale-105 hover:shadow-lg
              "

            >
              <Image src={imageSrc} alt={alt} width={40} height={40} className="object-contain" />
              <span className="mt-2 text-sm font-medium text-[#0C0E1C] text-center leading-tight line-clamp-2 h-[2.5rem]">
                {name}
              </span>
            </button>


          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
