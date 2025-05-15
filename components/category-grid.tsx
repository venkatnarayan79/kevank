"use client";

import React from "react";

/* ─── category data ────────────────────────────────────────────── */
const categories = [
  {
    name: "Furniture",
    alt: "Furniture category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-7a4 4 0 014-4h8a4 4 0 014 4v7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4m-4 0h8" />
      </svg>
    ),
  },
  {
    name: "Appliances",
    alt: "Appliances category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="3" y="7" width="18" height="10" rx="2" ry="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" />
      </svg>
    ),
  },
  {
    name: "Electronics",
    alt: "Electronics category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    name: "Fitness",
    alt: "Fitness category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    name: "Décor",
    alt: "Décor category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
      </svg>
    ),
  },
  {
    name: "Packages",
    alt: "Packages category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-600 dark:text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7" />
      </svg>
    ),
  },
];

/* ─── component ────────────────────────────────────────────────── */
const CategoryGrid: React.FC = () => {
  return (
    <section aria-label="Product categories" className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center dark:text-white">
          Rent What You Need
        </h1>
        <hr className="border-t-2 border-[#1c2a1f] dark:border-white w-24 mx-auto mb-10" />

        <div className="flex justify-center gap-8">
          {categories.map(({ name, alt, svg }) => (
            <a
              key={name}
              href="#"
              aria-label={alt}
              className="flex flex-col items-center border border-gray-300 dark:border-gray-700 rounded-lg p-6 min-w-[140px] aspect-square transition duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
            >
              {svg}
              <span className="mt-3 text-lg font-medium text-gray-800 dark:text-gray-200 block text-center">
                {name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
