// app/api/listings/[id]/images/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

// ─── Helper: Parse multipart/form-data into an array of File objects ───────
async function parseMultipart(request: NextRequest): Promise<File[]> {
  const formData = await request.formData();
  const files: File[] = [];
  for (const [, value] of formData.entries()) {
    if (value instanceof File) {
      files.push(value);
    }
  }
  return files;
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const listingId = params.id;

  try {
    // ─── 1) Verify the Listing exists ────────────────────────────────────────
    const existingListing = await prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!existingListing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // ─── 2) Parse incoming files ────────────────────────────────────────────
    let files: File[];
    try {
      files = await parseMultipart(request);
    } catch (err) {
      console.error("Error parsing formData:", err);
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // ─── 3) Ensure container name is set ────────────────────────────────────
    const containerName = process.env.VERCEL_BLOB_CONTAINER;
    if (!containerName) {
      return NextResponse.json(
        { error: "Missing VERCEL_BLOB_CONTAINER environment variable" },
        { status: 500 }
      );
    }

    // ─── 4) Upload all files in parallel to Vercel Blob ─────────────────────
    const uploadPromises = files.map(async (file) => {
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/\s+/g, "_");
      // We use addRandomSuffix:true to avoid collisions if same name reused
      const blobKey = `listings/${listingId}/${timestamp}-${sanitizedName}`;

      try {
        const { url } = await put(blobKey, file, {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN, // local: from .env; prod: auto-injected
          addRandomSuffix: true,
        });
        return {
          key: blobKey + "-" + url.split("/").pop()!.split(".").shift()!, 
          // NOTE: blobKey plus the random suffix, 
          // or you can store the entire URL in `key` if preferred.
          url,
          sizeBytes: file.size,
        };
      } catch (err: any) {
        console.error("Vercel Blob upload error for", sanitizedName, "→", err);
        throw new Error("Failed to upload image: " + sanitizedName + ". " + (err.message || err));
      }
    });

    let uploadResults: Array<{ key: string; url: string; sizeBytes: number }>;
    try {
      uploadResults = await Promise.all(uploadPromises);
    } catch (uploadError: any) {
      // If any single upload fails, we return that error immediately
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // ─── 5) Create Image records in MongoDB in parallel ─────────────────────
    // Build an array of data objects for prisma.image.create()
    const createImageData = uploadResults.map((u) => ({
      key: u.key,
      url: u.url,
      width: null as number | null,   // adjust if you want to compute dimensions
      height: null as number | null,
      sizeBytes: u.sizeBytes,
      listing: { connect: { id: listingId } },
    }));

    // Run all creations in parallel, but wrap each in try/catch to identify which fails
    const creationPromises = createImageData.map((dataObj) =>
      prisma.image
        .create({ data: dataObj })
        .then((created) => created)
        .catch((dbErr) => {
          console.error("DB error creating Image for key:", dataObj.key, "→", dbErr);
          // Rethrow with a more descriptive message
          throw new Error(`Failed to save metadata for ${dataObj.key}: ${dbErr.message}`);
        })
    );

    try {
      await Promise.all(creationPromises);
    } catch (dbError: any) {
      // Return whichever error was thrown first
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // ─── 6) Fetch and return the updated Listing (including images[] relation) ─
    const updatedListing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { images: true },
    });

    return NextResponse.json(updatedListing, { status: 200 });
  } catch (err: any) {
    console.error("Unexpected error in /images route:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
