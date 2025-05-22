"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Navin Kumar",
    avatar: "/man-498473_1920.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 2,
    name: "Navin Kumar",
    avatar: "/man-498473_1920.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTestimonials = testimonials.length;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials,
    );
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Over 1.5 lac
            <br />
            happy subscribers
          </h2>
          <p className="text-gray-600 mt-2">
            Here's what they have to say about their Kavenk experience.
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={prevTestimonial}
              className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextTestimonial}
              className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-[#ACD2B0] rounded-lg p-8 relative ${
                index === currentIndex ? "block" : "hidden md:block"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden mr-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="font-medium">{testimonial.name}</span>
              </div>

              <div className="relative">
                <span className="text-6xl font-serif text-[#70C27C] absolute -top-6 left-0">
                  "
                </span>
                <p className="text-gray-700 pl-8 pr-4">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
