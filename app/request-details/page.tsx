"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RequestDetailsForm } from "@/components/request-details-form";

// Define a type for the search data extracted from URL params.
export interface SearchData {
  searchQuery: string;
  zipCode: string;
  startDateTime: Date;
  endDateTime: Date;
}

export default function RequestDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  useEffect(() => {
    // Get search data from URL params
    const searchQuery = searchParams.get("searchQuery");
    const zipCode = searchParams.get("zipCode");
    const startDateTime = searchParams.get("startDateTime");
    const endDateTime = searchParams.get("endDateTime");

    // If any search data is missing, redirect back to home
    if (!searchQuery || !zipCode || !startDateTime || !endDateTime) {
      router.push("/");
      return;
    }

    setSearchData({
      searchQuery,
      zipCode,
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime),
    });
  }, [searchParams, router]);

  console.log(searchData);

  if (!searchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Complete Your Request</h1>
          <p className="text-muted-foreground">
            We found matches for your search. Please provide your contact information to receive details about
            available rentals.
          </p>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg mb-8">
          <h2 className="font-semibold mb-2">Your Search</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-medium">Looking for:</span> {searchData.searchQuery}
            </li>
            <li>
              <span className="font-medium">Location:</span> {searchData.zipCode}
            </li>
            <li>
              <span className="font-medium">From:</span>{" "}
              {searchData.startDateTime.toLocaleDateString()} at{" "}
              {searchData.startDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
            <li>
              <span className="font-medium">To:</span>{" "}
              {searchData.endDateTime.toLocaleDateString()} at{" "}
              {searchData.endDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
          </ul>
        </div>

        <RequestDetailsForm searchData={searchData} />
      </div>
    </main>
  );
}
