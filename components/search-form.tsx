"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDays, format } from "date-fns";
import { Search, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

// Define a Zod schema for the form with all fields required
const searchFormSchema = z.object({
  searchQuery: z.string().min(1, { message: "Search query is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }).refine(
    (val) => /^\d{5}(-\d{4})?$/.test(val),
    { message: "Please enter a valid zip code (5 digits or 5+4 format)" }
  ),
  dateRange: z.object({
    from: z.date({ required_error: "Start date is required" }),
    to: z.date({ required_error: "End date is required" }),
  }),
});

type SearchFormData = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
      zipCode: "",
      dateRange: {
        from: new Date(new Date().getFullYear(), 0, 12),
        to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
      },
    },
  });

  const onSubmit = async (data: SearchFormData) => {
    const formattedData = {
      ...data,
      dateRange: {
        from: format(data.dateRange.from, "yyyy-MM-dd"),
        to: format(data.dateRange.to, "yyyy-MM-dd"),
      },
    };

    console.log("Form submitted with data:", formattedData);

    // Simulate an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(
        `Search submitted!\n\nSearch Query: ${data.searchQuery}\nZip Code: ${data.zipCode}\nDate Range: ${formattedData.dateRange.from} to ${formattedData.dateRange.to}`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div id="search" className="bg-background rounded-lg shadow-lg p-6 max-w-fit mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Label htmlFor="search" className="mb-1 block">
                What are you looking for? <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search for products..."
                  {...register("searchQuery")}
                  className={`pl-9 ${errors.searchQuery ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.searchQuery && (
                <p className="text-red-500 text-xs mt-1">{errors.searchQuery.message}</p>
              )}
            </div>

            <div className="w-full sm:w-[180px]">
              <Label htmlFor="zipcode" className="mb-1 block">
                Zip Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zipcode"
                placeholder="Enter zip code"
                {...register("zipCode")}
                className={errors.zipCode ? "border-red-500" : ""}
                required
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="mb-1 block">
              Date Range <span className="text-red-500">*</span>
            </Label>
            <div className="flex justify-center">
              <Controller
                control={control}
                name="dateRange"
                render={({ field }) => (
                  <Calendar
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={field.value as DateRange}
                    onSelect={(selectedRange) => {
                      // Ensure we always have both from and to dates
                      if (selectedRange?.from && !selectedRange.to) {
                        field.onChange({
                          from: selectedRange.from,
                          to: addDays(selectedRange.from, 7)
                        });
                      } else {
                        field.onChange(selectedRange || {
                          from: new Date(),
                          to: addDays(new Date(), 7)
                        });
                      }
                    }}
                    numberOfMonths={2}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    className="rounded-md border shadow-sm max-w-full overflow-auto"
                  />
                )}
              />
            </div>
            {errors.dateRange?.from && (
              <p className="text-red-500 text-xs mt-1">{errors.dateRange.from.message}</p>
            )}
            {errors.dateRange?.to && (
              <p className="text-red-500 text-xs mt-1">{errors.dateRange.to.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Search Rentals"
          )}
        </Button>
      </form>
    </div>
  );
}