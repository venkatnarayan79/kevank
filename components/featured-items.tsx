"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RentalItem {
  id: number;
  title: string;
  image: string;
  price: number;
  period: string;
}

const rentalItems: RentalItem[] = [
  {
    id: 1,
    title: "Single Door Fridge (190 Lt)",
    image: "/vacuum-cleaner-657719_1280.jpg",
    price: 100,
    period: "month",
  },
  {
    id: 2,
    title: "Study Table (Walnut)",
    image: "/equipment-4521859_1920.jpg",
    price: 50,
    period: "month",
  },
  {
    id: 3,
    title: "Electric Bike",
    image: "/bike-ride-6804105_1280.jpg",
    price: 10,
    period: "day",
  },
  {
    id: 4,
    title: "Vacuum Cleaner",
    image: "/vacuum-cleaner-657719_1280.jpg",
    price: 10,
    period: "month",
  },
  {
    id: 5,
    title: "Bike",
    image: "/bike-ride-6804105_1280.jpg",
    price: 10,
    period: "month",
  },
];

const RentalItemCard: React.FC<{ item: RentalItem }> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-40 relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2">{item.title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold">
            $ {item.price}/{item.period}
          </p>
          <Button variant="outline" size="sm" className="text-xs">
            See More
          </Button>
        </div>
      </div>
    </div>
  );
};

export function FeaturedItems() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(rentalItems.length / itemsPerPage);

  const visibleItems = rentalItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-10 bg-[#ACD2B0]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            You'll Love To
            <br />
            Take These Home
          </h2>

          <div className="flex gap-2">
            <button
              onClick={prevPage}
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextPage}
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {visibleItems.map((item) => (
            <RentalItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
