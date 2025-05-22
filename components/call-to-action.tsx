import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-16 bg-[url('/bike-ride-6804105_1280.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="bg-[#1E352D] p-10 rounded-lg text-center max-w-xs">
            <div className="mb-4 flex justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M19 5h-7V3H6v6h8v12h7V5z" />
                <path d="M9 3h1v4" />
                <path d="M14 15h1v4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">For Rent</h3>
            <Link href="/listings">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E352D] mt-2"
              >
                Browse Items
              </Button>
            </Link>
          </div>

          <div className="bg-[#1E352D] p-10 rounded-lg text-center max-w-xs">
            <div className="mb-4 flex justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <circle cx="9" cy="9" r="1" />
                <path d="m21 15-3.5-3.5a2.12 2.12 0 0 0-3 0L3 23" />
                <path d="M21 19H3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              List Your Product
            </h3>
            <Link href="/create-listing">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#1E352D] mt-2"
              >
                List Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
