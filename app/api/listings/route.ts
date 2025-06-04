// app/api/listings/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
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
      },
    });
    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("Error saving listing:", error);
    return NextResponse.json({ error: "Failed to save listing" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
