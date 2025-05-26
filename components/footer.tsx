import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: '#EFF3F7' }}>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold" style={{ color: '#282D70' }}>
              Kavenk
            </Link>


            <p style={{ color: '#1668E3' }}>
              Find what you need with our easy to use platform. Search from millions of items.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#181C38' }}>Quick Links</h3>

            <ul className="space-y-2">
              <li>
                <Link href="/" style={{ color: '#1668E3' }} className="hover:text-primary transition-colors">
                  Home
                </Link>

              </li>
              <li>
                <Link
                  href="/create-listing"
                  style={{ color: '#1668E3' }}
                  className="hover:text-primary transition-colors"
                >
                  Create a Listing
                </Link>

              </li>
              <li>
                <Link href="/about" style={{ color: '#1668E3' }} className="hover:text-primary transition-colors">
                  About Us
                </Link>

              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#181C38' }}>Contact Us</h3>

            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" style={{ color: '#1668E3' }} />
                <Link
                  href="mailto:contact@kavenk.com"
                  style={{ color: '#1668E3' }}
                  className="hover:text-primary transition-colors"
                >
                  contact@kavenk.com
                </Link>

              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Border and Spacing */}
        <div className="border-t mt-12 pt-8 px-4 md:px-0" style={{ borderColor: '#DFE0E4' }}>

          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            {/* Copyright */}
            <p className="text-sm" style={{ color: 'black' }}>
              &copy; {new Date().getFullYear()} Kavenk. All rights reserved.
            </p>


            {/* Social Links */}
            <div className="flex items-center justify-center space-x-6 mt-4 md:mt-0">
              <Link
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full transition-colors"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </Link>
              <Link
                href="https://www.instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full transition-colors"
              >
                <Image
                  src="/insta.png"
                  alt="Instagram"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </Link>


            </div>

            {/* Privacy Policy on the right */}
            <div className="mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm hover:text-primary transition-colors"
                style={{ color: 'black' }}
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
