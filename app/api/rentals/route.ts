import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient, type Rental } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data: Rental = await req.json();

    console.log("Rental data:", data);

    // Save the data to MongoDB using Prisma
    const rental = await prisma.rental.create({
      data,
    });

    return NextResponse.json(rental, { status: 200 });
  } catch (error) {
    console.error("Error saving rental:", error);
    return NextResponse.json({ error: "Failed to save rental" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
