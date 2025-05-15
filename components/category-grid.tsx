import React from "react";

const categories = [
  {
    name: "Furniture",
    alt: "Furniture category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-600 dark:text-gray-300 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="3" y="7" width="18" height="10" rx="2" ry="2" />
        <path d="M7 17v2M17 17v2M3 7h18" />
      </svg>
    ),
  },
  {
    name: "Appliances",
    alt: "Appliances category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-600 dark:text-gray-300 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="6" y="3" width="12" height="18" rx="2" ry="2" />
        <path d="M9 7h6M9 11h6M9 15h6" />
      </svg>
    ),
  },
  {
    name: "Electronics",
    alt: "Electronics category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-600 dark:text-gray-300 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="4" y="5" width="16" height="14" rx="2" ry="2" />
        <path d="M8 9h8M8 13h8M8 17h8" />
      </svg>
    ),
  },
  {
    name: "Fitness",
    alt: "Fitness category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-600 dark:text-gray-300 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    name: "Décor",
    alt: "Décor category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-600 dark:text-gray-300 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 2l3 7h-6l3-7zM5 21h14v-2H5v2z" />
      </svg>
    ),
  },
  {
    name: "Packages",
    alt: "Packages category",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-600 dark:text-gray-300 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M3 7l9 6 9-6M3 17h18v-6H3v6z" />
      </svg>
    ),
  },
];

const CategoryGrid: React.FC = () => {
  return (
    <section
      aria-label="Product categories"
      className="w-full py-12 md:py-20"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">
        Rent Furniture&nbsp;&amp;&nbsp;Appliances
      </h2>
      <div className="flex justify-center gap-8 max-w-7xl mx-auto px-4 overflow-x-auto">
        {categories.map(({ name, alt, svg }) => (
          <a
            key={name}
            href="#"
            aria-label={alt}
            className="flex flex-col items-center border border-gray-300 dark:border-gray-700 rounded-lg p-6 min-w-[140px] aspect-square transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-t-0"
          >
            {svg}
            <span className="mt-3 text-lg font-medium text-gray-800 dark:text-gray-200 block text-center">
              {name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid; 
