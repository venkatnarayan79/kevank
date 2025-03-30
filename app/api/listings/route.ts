import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient, type Listings } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  console.log("Received request to save listings data");

  try {
    const data: Listings = await req.json();

    console.log("Listings data:", data);

    // Save the data to MongoDB using Prisma
    const listing = await prisma.listings.create({
      data,
    });

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("Error saving listing:", error);
    return NextResponse.json({ error: "Failed to save listing" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
