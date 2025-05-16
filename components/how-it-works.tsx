"use client";

import React from "react";
import { Search, CalendarClock, DollarSign } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section aria-label="How it works" className="py-24 bg-white">
      <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works</h2>
      <p className="mt-2 text-center max-w-xl mx-auto text-gray-600">
        Renting equipment from your neighbors is easy, affordable, and sustainable.
      </p>
      <div className="mt-14 grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center rounded-lg border border-[#8FD0A8] p-8 hover:shadow-lg transition">
          <Search className="h-12 w-12 stroke-[#8FD0A8]" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Find What You Need</h3>
          <p className="mt-2 text-sm text-gray-600">
            Browse thousands of items by category, price, and location to find exactly what you’re looking for.
          </p>
        </div>
        <div className="flex flex-col items-center text-center rounded-lg border border-[#8FD0A8] p-8 hover:shadow-lg transition">
          <CalendarClock className="h-12 w-12 stroke-[#8FD0A8]" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Book Your Rental</h3>
          <p className="mt-2 text-sm text-gray-600">
            Select your rental dates, message the owner with any questions, and book securely through our platform.
          </p>
        </div>
        <div className="flex flex-col items-center text-center rounded-lg border border-[#8FD0A8] p-8 hover:shadow-lg transition">
          <DollarSign className="h-12 w-12 stroke-[#8FD0A8]" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Save Money</h3>
          <p className="mt-2 text-sm text-gray-600">
            Bring big-ticket items home easily & affordably by renting from your neighbors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
