"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu as MenuIcon, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#1E352D] text-white relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold">
              Kavenk
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
            <Link
              href="/create-listing"
              className="bg-white text-[#1E352D] px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
            >
              Create a Listing
            </Link>
            <ModeToggle />
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1E352D] border-b border-gray-700 shadow-lg z-40">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium px-4 py-2 hover:bg-[#2A4A3D] rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium px-4 py-2 hover:bg-[#2A4A3D] rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium px-4 py-2 hover:bg-[#2A4A3D] rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/create-listing"
              onClick={() => setIsMenuOpen(false)}
              className="bg-white text-[#1E352D] px-4 py-2 rounded-md text-sm font-medium text-center"
            >
              Create a Listing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
