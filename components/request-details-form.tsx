"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SearchData } from "@/app/request-details/page";

// ----- Schema Definition -----
const requestDetailsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  comments: z.string().optional(),
});

type RequestDetailsData = z.infer<typeof requestDetailsSchema>;

interface RequestDetailsFormProps {
  searchData: SearchData;
}

// ----- Confirmation Message Component -----
const ConfirmationMessage: React.FC = () => (
  <div className="bg-background rounded-lg shadow-lg p-8 text-center">
    <div className="flex justify-center mb-4">
      <CheckCircle className="h-16 w-16 text-green-500" />
    </div>
    <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
    <p className="text-muted-foreground mb-6">
      Thank you for your interest. It looks like this item is no longer available. We&apos;ll send you information about available rentals matching your criteria shortly.
    </p>
    <Button asChild className="gap-2">
      <Link href="/">
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  </div>
);

// ----- Main Form Component -----
export function RequestDetailsForm({ searchData }: RequestDetailsFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestDetailsData>({
    resolver: zodResolver(requestDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      comments: "",
    },
  });

  const onSubmit = async (requestDetailsData: RequestDetailsData) => {
    // Merge the combined fields with other search data and form data
    const fullData = {
      ...searchData,
      ...requestDetailsData,
    };

    console.log("Full request data:", fullData);

    try {
      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isSubmitted) return <ConfirmationMessage />;

  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-1 block">
              Full Name <span className="text-red-500">*</span>
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

          <div>
            <Label htmlFor="comments" className="mb-1 block">
              Additional Comments
            </Label>
            <Textarea
              id="comments"
              placeholder="Tell us more about what you're looking for..."
              {...register("comments")}
              className="min-h-[120px]"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            By submitting this form, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
