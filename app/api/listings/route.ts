// app/api/listings/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // The frontend sends exactly these fields (CreateListingData), without images
    const data = await req.json();

    // Create a new Listing (images[] will be empty initially)
    const listing = await prisma.listing.create({
      data: {
        name: data.name,
        email: data.email,
        productName: data.productName,
        productDescription: data.productDescription,
        rentalPrice: data.rentalPrice,
        zipCode: data.zipCode,
        startDate: data.startDate,
        endDate: data.endDate,
        // images: [] will be added later via the other route
      },
    });

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: "Failed to save listing" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
