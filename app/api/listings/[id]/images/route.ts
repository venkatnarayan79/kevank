// app/api/listings/[id]/images/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

/** Extract all File objects from a multipart/form-data request */
async function parseMultipart(req: NextRequest): Promise<File[]> {
  const formData = await req.formData();
  return Array.from(formData.values()).filter((v): v is File => v instanceof File);
}

// Route handler – uploads images, stores metadata, and returns updated listing
export async function POST(
  request: NextRequest
) {
  const url = new URL(request.url);
  const listingId = url.pathname.split('/')[3]; // Extract id from /api/listings/[id]/images

  try {
    // 1️⃣ Ensure listing exists
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });

    // 2️⃣ Parse uploaded files
    const files = await parseMultipart(request);
    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // 3️⃣ Upload to Vercel Blob in parallel
    const uploads = await Promise.all(
      files.map(async (file) => {
        const key = `listings/${listingId}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const { url } = await put(key, file, {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
          addRandomSuffix: true,
        });
        return { key, url, sizeBytes: file.size } as const;
      })
    );

    // 4️⃣ Persist metadata in one transaction
    await prisma.$transaction(
      uploads.map((u) =>
        prisma.image.create({
          data: {
            key: u.key,
            url: u.url,
            sizeBytes: u.sizeBytes,
            listing: { connect: { id: listingId } },
          },
        })
      )
    );

    // 5️⃣ Return updated listing
    const updated = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { images: true },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[images‑route]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
