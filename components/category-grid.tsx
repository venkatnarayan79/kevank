"use client";

import React from "react";

/* ─── category data ────────────────────────────────────────────── */
const categories = [
  { name: "Base", alt: "Base", imageSrc: "/base.png" },
  { name: "Bicycle", alt: "Bicycle", imageSrc: "/bicycle.png" },
  { name: "Golf", alt: "Golf", imageSrc: "/golfing.png" },
  { name: "Tools", alt: "Tools", imageSrc: "/customer-support.png" },
  { name: "Skating", alt: "Skating", imageSrc: "/ice-skating.png" },
  { name: "Base Ball", alt: "Base Ball", imageSrc: "/camping.png" },
  { name: "Laptop", alt: "Laptop", imageSrc: "/laptop.png" },
  { name: "Machine", alt: "Machine", imageSrc: "/washing.png" },
];

/* ─── component ────────────────────────────────────────────────── */
const CategoryGrid: React.FC = () => {
  const scrollToHero = () => {
    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Product categories"
      className="w-full py-12 md:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Rent What You Need
        </h1>
        {/* Updated HR color to match #9dd1a8 */}
        <hr className="border-t-2 border-[#9dd1a8] w-24 mx-auto mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 justify-items-center">
          {categories.map(({ name, alt, imageSrc }) => (
            <button
              key={name}
              onClick={scrollToHero}
              aria-label={alt}
              className="w-full aspect-square flex flex-col items-center justify-center border border-black rounded-lg p-6 bg-white transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img src={imageSrc} alt={alt} className="h-10 w-10 object-contain" />
              <span className="mt-3 text-lg font-medium text-gray-800 text-center">
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
