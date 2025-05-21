"use client";

import React from "react";
import Image from "next/image";

/* ─── category data ───────────────────────────────────────────────────── */
const categories = [
  {
    name: "Appliances",
    alt: "Appliances",
    imageSrc: "/washing.png",
  },
  {
    name: "Equipment",
    alt: "Equipment",
    imageSrc: "/customer-support.png",
  },
  {
    name: "Sports",
    alt: "Sports",
    imageSrc: "/golfing.png",
  },
  {
    name: "Outdoors / Camping",
    alt: "Outdoors and Camping",
    imageSrc: "/camping.png",
  },
  {
    name: "Special Occasions",
    alt: "Special Occasions",
    imageSrc: "/ice-skating.png",
  },
  {
    name: "Kitchen / Bath",
    alt: "Kitchen and Bath",
    imageSrc: "/base.png",
  },
  {
    name: "Accessories",
    alt: "Accessories",
    imageSrc: "/bicycle.png",
  },
  {
    name: "Miscellaneous",
    alt: "Miscellaneous",
    imageSrc: "/laptop.png",
  },
];

/* ─── component ──────────────────────────────────────────────── */
const CategoryGrid: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Product categories"
      className="w-full py-12 md:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1
          className="text-3xl md:text-3xl font-bold text-gray-900 mb-2 text-center"
        >
          Rent What You Need
        </h1>
        <hr className="border-t-2 border-[#9dd1a8] w-24 mx-auto mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-6 justify-items-center">
          {categories.map(({ name, alt, imageSrc }) => (
            <button
              key={name}
              onClick={scrollToTop}
              aria-label={alt}
              className="w-[140px] aspect-[287/100] flex flex-col items-center justify-center border border-black rounded-lg p-2 bg-white transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Image
                src={imageSrc}
                alt={alt}
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="mt-2 text-sm font-medium text-gray-800 text-center leading-tight line-clamp-2 h-[2.5rem]">
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
