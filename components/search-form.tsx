"use client";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDays, format } from "date-fns";
import { Search, Loader2, CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// ----- Schema & Types -----
const searchFormSchema = z
  .object({
    searchQuery: z.string().min(1, { message: "Search query is required" }),
    zipCode: z
      .string()
      .min(1, { message: "Zip code is required" })
      .refine((val) => /^\d{5}(-\d{4})?$/.test(val), {
        message: "Please enter a valid zip code (5 digits or 5+4 format)",
      }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    startTime: z.string({ required_error: "Start time is required" }),
    endTime: z.string({ required_error: "End time is required" }),
  })
  .refine(
    (data) => {
      const startDateTime = combineDateTime(data.startDate, data.startTime);
      const endDateTime = combineDateTime(data.endDate, data.endTime);
      return endDateTime > startDateTime;
    },
    {
      message: "End date/time must be after start date/time",
      path: ["endDate"],
    }
  );

export type SearchFormData = z.infer<typeof searchFormSchema>;

// ----- Helper Functions & Constants -----
const combineDateTime = (date: Date, timeString: string): Date => {
  const [timePart, period] = timeString.split(" ");
  const [hoursStr, minutesStr] = timePart.split(":");
  let hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (period === "PM" && hours < 12) hours += 12;
  else if (period === "AM" && hours === 12) hours = 0;

  const result = new Date(date);
  result.setHours(hours, minutes);
  return result;
};

const generateTimeOptions = () => {
  const options: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedMinute = minute.toString().padStart(2, "0");
      options.push(`${displayHour}:${formattedMinute} ${period}`);
    }
  }
  return options;
};
const timeOptions = generateTimeOptions();

// ----- Reusable UI Components -----
type DatePickerPopoverProps = {
  value: Date;
  onChange: (value: Date) => void;
  error?: string;
  minDate?: Date;
};

const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  value,
  onChange,
  error,
  minDate,
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          error && "border-red-500",
          !value && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, "PPP") : "Select date"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={value}
        onSelect={(day) => {
          if (day) onChange(day); // Only call onChange if a valid date is returned.
        }}
        disabled={(date) => (minDate ? date < minDate : false)}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

type TimeSelectProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, error }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className={cn(error && "border-red-500")}>
      <SelectValue placeholder="Select time" />
    </SelectTrigger>
    <SelectContent>
      {timeOptions.map((time) => (
        <SelectItem key={time} value={time}>
          {time}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// ----- Main Component -----
export function SearchForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
      zipCode: "",
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      startTime: "9:00 AM",
      endTime: "5:00 PM",
    },
  });

  const startDate = watch("startDate");

  const onSubmit = async (data: SearchFormData) => {
    const formattedData = {
      searchQuery: data.searchQuery,
      zipCode: data.zipCode,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      startTime: data.startTime,
      endDate: format(data.endDate, "yyyy-MM-dd"),
      endTime: data.endTime,
    };

    console.log("Search form submitted with data:", formattedData);

    const params = new URLSearchParams();
    Object.entries(formattedData).forEach(([key, value]) => {
      params.append(key, value);
    });

    router.push(`/request-details?${params.toString()}`);
  };

  return (
    <div
      id="search-form"
      className="bg-background rounded-lg shadow-lg p-6 max-w-fit mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Query */}
            <div className="relative flex-1">
              <Label htmlFor="search" className="mb-1 block">
                What are you looking for?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search for products..."
                  {...register("searchQuery")}
                  className={cn("pl-9", errors.searchQuery && "border-red-500")}
                  required
                />
              </div>
              {errors.searchQuery && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.searchQuery.message}
                </p>
              )}
            </div>

            {/* Zip Code */}
            <div className="w-full sm:w-[180px]">
              <Label htmlFor="zipcode" className="mb-1 block">
                Zip Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zipcode"
                placeholder="Enter zip code"
                {...register("zipCode")}
                className={errors.zipCode && "border-red-500"}
                required
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-4">
            {/* Start Date & Time */}
            <div>
              <Label className="block mb-1">
                Start Date & Time <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePickerPopover
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.startDate?.message}
                        minDate={new Date("1900-01-01")}
                      />
                    )}
                  />
                </div>
                <div className="w-full sm:w-[140px]">
                  <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                      <TimeSelect
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.startTime?.message}
                      />
                    )}
                  />
                </div>
              </div>
              {(errors.startDate || errors.startTime) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startDate?.message || errors.startTime?.message}
                </p>
              )}
            </div>

            {/* End Date & Time */}
            <div>
              <Label className="block mb-1">
                End Date & Time <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePickerPopover
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.endDate?.message}
                        minDate={startDate || new Date("1900-01-01")}
                      />
                    )}
                  />
                </div>
                <div className="w-full sm:w-[140px]">
                  <Controller
                    control={control}
                    name="endTime"
                    render={({ field }) => (
                      <TimeSelect
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.endTime?.message}
                      />
                    )}
                  />
                </div>
              </div>
              {(errors.endDate || errors.endTime) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.endDate?.message || errors.endTime?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
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
