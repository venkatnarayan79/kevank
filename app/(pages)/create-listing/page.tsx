"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RecommendedCarousel } from "@/components/ui/RecommendedCarousel";

// ─── 1. Zod Schema Definition ────────────────────────────────────────────────────
const createListingSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    productName: z
      .string()
      .min(3, { message: "Product name must be at least 3 characters" }),
    productDescription: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    rentalPrice: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive({ message: "Price must be a positive number" })
    ),
    zipCode: z
      .string()
      .min(1, { message: "Zip code is required" })
      .refine((val) => /^\d{5}(-\d{4})?$/.test(val), {
        message: "Please enter a valid zip code (5 digits or 5+4 format)",
      }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type CreateListingData = z.infer<typeof createListingSchema>;

// ─── 2. Success Message Component ────────────────────────────────────────────────
function ListingSuccess() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-background rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Listing Created!</h2>
          <p className="text-muted-foreground mb-6">
            Your listing has been successfully created and will be reviewed by
            our team shortly.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

// ─── 3. Main Page Component ─────────────────────────────────────────────────────
export default function CreateListingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateListingData>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      name: "",
      email: "",
      productName: "",
      productDescription: "",
      rentalPrice: 0,
      zipCode: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  // ─── 3.3. handleFileSelect Implementation ─────────────────────────────────
  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const newlySelected = Array.from(event.target.files || []);
    const maxFilesAllowed = 4;

    // If total (existing + new) exceeds limit, show error and abort
    if (imagesToUpload.length + newlySelected.length > maxFilesAllowed) {
      setUploadErrors([`You can upload a maximum of ${maxFilesAllowed} images.`]);
      return;
    }

    // Validate MIME types on newlySelected
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const invalid = newlySelected.filter((f) => !validTypes.includes(f.type));
    if (invalid.length > 0) {
      setUploadErrors(["Only JPEG, PNG, or WebP formats are allowed."]);
      return;
    }

    // Combine existing + new files
    const combined = [...imagesToUpload, ...newlySelected];

    // Compress & generate previews for all combined files
    const compressedList: File[] = [];
    const previewList: string[] = [];

    for (const file of combined) {
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressed = await imageCompression(file, options);
        compressedList.push(compressed);
        previewList.push(URL.createObjectURL(compressed));
      } catch {
        compressedList.push(file);
        previewList.push(URL.createObjectURL(file));
      }
    }

    setImagesToUpload(compressedList);
    setPreviewURLs(previewList);
    setUploadErrors([]);
  }

  // ─── 3.4. removeImageAtIndex Implementation ─────────────────────────────────
  function removeImageAtIndex(index: number) {
    setImagesToUpload((prev) => prev.filter((_, i) => i !== index));
    setPreviewURLs((prev) => prev.filter((_, i) => i !== index));
    setUploadErrors([]);
  }

  // ─── 3.5. onSubmit Implementation ───────────────────────────────────────────
  async function onSubmit(data: CreateListingData) {
    setUploadErrors([]);

    try {
      // Create listing record
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const listing = await response.json();
      const listingId = listing.id;

      // Upload images if any selected
      if (imagesToUpload.length > 0) {
        setIsUploadingImages(true);
        const formData = new FormData();
        imagesToUpload.forEach((file) => formData.append("images", file));

        const uploadRes = await fetch(`/api/listings/${listingId}/images`, {
          method: "POST",
          body: formData,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadJson.error || "Image upload failed");
        }

        setIsUploadingImages(false);
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error in onSubmit:", error);
      setUploadErrors([error.message || "Submission error"]);
      setIsUploadingImages(false);
    }
  }

  if (isSubmitted) {
    return <ListingSuccess />;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Create a Rental Listing</h1>
          <p className="text-muted-foreground">
            List your item for rent on our platform. Fill out the form below with details about your rental.
          </p>
        </div>

        <RecommendedCarousel mainHeading="Recommended Listings" subHeading="Discover popular items to list" />

        <div className="bg-background rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ─── Global Errors ────────────────────────────────────────────── */}
            {uploadErrors.length > 0 && (
              <div className="mb-4 space-y-1 p-3 bg-red-50 border border-red-200 rounded">
                {uploadErrors.map((err, idx) => (
                  <p key={idx} className="text-sm text-red-700">
                    {err}
                  </p>
                ))}
              </div>
            )}
            {/* ────────────────────────────────────────────────────────────────── */}

            <div className="space-y-4">
              {/* ─── Owner Information ───────────────────────────────────────── */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-1 block">
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
              </div>
              {/* ────────────────────────────────────────────────────────────── */}

              {/* ─── Rental Information ─────────────────────────────────────── */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Rental Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productName" className="mb-1 block">
                      Product Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="productName"
                      placeholder="What are you renting out?"
                      {...register("productName")}
                      className={errors.productName ? "border-red-500" : ""}
                    />
                    {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="productDescription" className="mb-1 block">
                      Product Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Describe your rental item in detail..."
                      {...register("productDescription")}
                      className={`min-h-[120px] ${errors.productDescription ? "border-red-500" : ""}`}
                    />
                    {errors.productDescription && (
                      <p className="text-red-500 text-xs mt-1">{errors.productDescription.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rentalPrice" className="mb-1 block">
                        Rental Price Per Day ($) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="rentalPrice"
                        placeholder="Enter price per day"
                        {...register("rentalPrice")}
                        className={errors.rentalPrice ? "border-red-500" : ""}
                        type="number"
                        step="0.01"
                        min="0"
                      />
                      {errors.rentalPrice && (
                        <p className="text-red-500 text-xs mt-1">{errors.rentalPrice.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="zipCode" className="mb-1 block">
                        Zip Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        placeholder="Enter zip code"
                        {...register("zipCode")}
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="startDate" className="mb-1 block">
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        {...register("startDate", { valueAsDate: true })}
                        className={errors.startDate ? "border-red-500" : ""}
                      />
                      {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="endDate" className="mb-1 block">
                        End Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="endDate"
                        type="date"
                        {...register("endDate", { valueAsDate: true })}
                        className={errors.endDate ? "border-red-500" : ""}
                      />
                      {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
              {/* ────────────────────────────────────────────────────────────── */}
            </div>

            {/* ─── Image Upload Section (With Matching Heading Styling) ───────────────── */}
            <div>
              <Label htmlFor="image-upload" className="mb-1 block text-xl font-semibold">
                Upload Photos <span className="text-red-500">*</span>
              </Label>
              <input
                type="file"
                accept="image/*"
                multiple
                id="image-upload"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploadErrors.map((err, idx) => (
                <p key={idx} className="text-red-500 text-xs mt-1">
                  {err}
                </p>
              ))}
              <div className="mt-4 flex flex-wrap gap-2">
                {previewURLs.map((url, idx) => (
                  <div key={idx} className="relative h-24 w-24 border rounded overflow-hidden">
                    <img src={url} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImageAtIndex(idx)}
                      className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-600 text-white text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* ────────────────────────────────────────────────────────────────── */}

            {/* ─── Submit Button & Spinner ─────────────────────────────────── */}
            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting || isUploadingImages}>
                {isSubmitting || isUploadingImages ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploadingImages ? "Creating and Uploading…" : "Creating Listing…"}
                  </>
                ) : (
                  "Create Listing"
                )}
              </Button>

              {isUploadingImages && (
                <div className="mt-4 flex justify-center items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                  <span className="ml-2 text-gray-600">Uploading images...</span>
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting this form, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            {/* ────────────────────────────────────────────────────────────────── */}
          </form>
        </div>
      </div>
    </main>
  );
}
