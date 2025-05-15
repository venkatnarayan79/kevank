"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { KeyRound, ClipboardList } from "lucide-react";

const CtaBanner: React.FC = () => {
  return (
    <section aria-label="CTA banner" className="relative w-full">
      <Image
        src="/man-498473_1920.jpg"
        alt="Electric scooter"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#8FD0A8]/70 dark:bg-[#05230F]/80 backdrop-brightness-90"></div>
      <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-12 py-28 mx-auto max-w-6xl">
        <Link
          href="#hero"
          className="flex flex-col items-center justify-center w-96 h-72 rounded-xl bg-[#00170A] text-white hover:scale-105 transition"
        >
          <KeyRound className="h-14 w-14 stroke-[#8FD0A8]" aria-hidden="true" />
          <span className="mt-6 text-2xl font-semibold">For Rent</span>
        </Link>
        <Link
          href="/dashboard/listing/new"
          className="flex flex-col items-center justify-center w-96 h-72 rounded-xl bg-[#00170A] text-white hover:scale-105 transition"
        >
          <ClipboardList className="h-14 w-14 stroke-[#8FD0A8]" aria-hidden="true" />
          <span className="mt-6 text-2xl font-semibold">List Your Product</span>
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;
