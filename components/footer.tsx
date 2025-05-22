import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1E352D] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand and Description */}
          <div className="max-w-xs">
            <Link href="/" className="text-2xl font-bold">
              Kavenk
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Find what you need with our easy to use platform. Search from
              millions of items.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create-listing"
                  className="hover:text-white transition-colors"
                >
                  Create a Listing
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-2">
              <a href="mailto:contact@kavenk.com" className="hover:text-white">
                contact@kavenk.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Links */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2023 Kavenk. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
