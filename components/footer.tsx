import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold">
              Kavenk
            </Link>
            <p className="text-muted-foreground">
              Find what you need with our easy to use platform. Search from millions of items.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create-listing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Create a Listing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                <Link
                  href="mailto:contact@kavenk.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@kavenk.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Border and Spacing */}
        <div className="border-t border-[#87a96b] mt-12 pt-8 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            {/* Copyright */}
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Kavenk. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-6 mt-4 md:mt-0">
              <Link
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#87a96b] hover:bg-[#9cbc85] transition-colors"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </Link>
              <Link
                href="https://www.instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#87a96b] hover:bg-[#9cbc85] transition-colors"
              >
                <Image
                  src="/insta.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Privacy Policy on the right */}
            <div className="mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
