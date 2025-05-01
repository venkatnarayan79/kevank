"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RecommendedCarousel } from "@/components/ui/RecommendedCarousel";


// Define schema for the form
const createListingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  productName: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  productDescription: z.string().min(10, { message: "Description must be at least 10 characters" }),
  rentalPrice: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    },
    z.number().positive({ message: "Price must be a positive number" })
  ),
  zipCode: z
    .string()
    .min(1, { message: "Zip code is required" })
    .refine((val) => /^\d{5}(-\d{4})?$/.test(val), {
      message: "Please enter a valid zip code (5 digits or 5+4 format)",
    }),
  
    // Added start date
    startDate: z.date({
      required_error: "Start date is required",
    }),

    // Added end date
    endDate: z.date({
      required_error: "End date is required",
    }),

    // Added below validation
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type CreateListingData = z.infer<typeof createListingSchema>;

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
            Your listing has been successfully created and will be reviewed by our team shortly.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function CreateListingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const onSubmit = async (data: CreateListingData) => {
    console.log("Full Listings data:", data);

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

        <RecommendedCarousel />

        <div className="bg-background rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Owner Information */}
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

              {/* Listing Information */}
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
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Listing...
                  </>
                ) : (
                  "Create Listing"
                )}
              </Button>
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
          </form>
        </div>
      </div>
    </main>
  );
}
