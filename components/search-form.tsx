"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, isValid } from "date-fns";
import { CalendarIcon, Loader2, Search } from "lucide-react";

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
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------
   HELPER: Format a Date into "hh:mm AM/PM" form
---------------------------------------------------------*/
function formatTimeIn12Hour(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let period = "AM";

  if (hours === 0) {
    hours = 12; // 12 AM
  } else if (hours === 12) {
    period = "PM"; // 12 PM
  } else if (hours > 12) {
    hours -= 12;
    period = "PM";
  }

  const minutesStr = String(minutes).padStart(2, "0");
  return `${hours}:${minutesStr} ${period}`;
}

/* -------------------------------------------------------
   HELPER: Combine date + "hh:mm AM/PM" into a single Date
---------------------------------------------------------*/
function combineDateTime(date: Date | null, timeStr: string): Date | null {
  if (!date || !isValid(date) || !timeStr) {
    return date;
  }

  const [timePart, ampm] = timeStr.split(" ");
  if (!timePart || !ampm) {
    return date;
  }

  const [hrsStr, minsStr] = timePart.split(":");
  if (!hrsStr || !minsStr) {
    return date;
  }

  let hours = parseInt(hrsStr);
  const minutes = parseInt(minsStr);
  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

/* -------------------------------------------------------
   HELPER: Generate time options in 30-min increments,
           plus an empty string for "no selection".
---------------------------------------------------------*/
function generateTimeOptions(): string[] {
  const options: string[] = [""];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const minutesStr = String(minute).padStart(2, "0");
      options.push(`${displayHour}:${minutesStr} ${period}`);
    }
  }
  return options;
}

/* -------------------------------------------------------
   SCHEMA & TYPES
---------------------------------------------------------*/
const formSchema = z
  .object({
    searchQuery: z
      .string()
      .min(1, "Search query is required"),
    zipCode: z
      .string()
      .min(1, "Zip code is required")
      .regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
    startDate: z.date({ required_error: "Start date is required" }),
    startTime: z.string({ required_error: "Start time is required" }),
    endDate: z.date().nullable().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      const { startDate, startTime, endDate, endTime } = data;
      // Only check "end must be after start" if user picks both endDate + endTime
      if (!endDate || !endTime) {
        return true;
      }
      const sdt = combineDateTime(startDate, startTime);
      const edt = combineDateTime(endDate, endTime);
      if (!sdt || !edt) {
        return true;
      }
      return edt > sdt;
    },
    {
      message: "End date/time must be after start date/time",
      path: ["endDate"],
    }
  );

export type SearchFormData = z.infer<typeof formSchema>;

/* -------------------------------------------------------
   DATE PICKER
---------------------------------------------------------*/
interface DatePickerPopoverProps {
  value: Date | null;
  onChange: (val: Date | null) => void;
  error?: string;
  placeholder?: string;
  minDate?: Date;
}

function DatePickerPopover(props: DatePickerPopoverProps) {
  const {
    value,
    onChange,
    error,
    placeholder = "Select date",
    minDate,
  } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full text-xs truncate justify-start text-left font-normal",
            error && "border-red-500",
            !value && "text-muted-foreground"
          )}
          style={{
            borderColor: "#191E3B",
            backgroundColor: "#FDDB32",
            color: "#564A0B",
          }}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          showOutsideDays
          selected={value ?? undefined}
          disabled={(dayToCheck) => {
            if (minDate && dayToCheck < minDate) return true;
            return false;
          }}
          onDayClick={(selectedDay) => {
            if (!selectedDay) return;
            if (minDate && selectedDay < minDate) return;
            onChange(selectedDay);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

/* -------------------------------------------------------
   TIME SELECT
---------------------------------------------------------*/
interface TimeSelectProps {
  value?: string;
  onChange: (v: string) => void;
  error?: string;
}

function TimeSelect(props: TimeSelectProps) {
  const { value = "", onChange, error } = props;
  const timeOptions = React.useMemo(() => generateTimeOptions(), []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn("w-full text-xs", error && "border-red-500")}
        style={{
          borderColor: "#191E3B",
          backgroundColor: "#FDDB32",
          color: "#564A0B",
        }}
      >
        <SelectValue placeholder="Select time (optional)" />
      </SelectTrigger>
      <SelectContent>
        {timeOptions.map((t) => (
          <SelectItem key={t} value={t}>
            {t || "— No time selected —"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* -------------------------------------------------------
   MAIN SEARCH FORM
---------------------------------------------------------*/
// Use stable defaults
const now = new Date();
const defaultStartTime = formatTimeIn12Hour(now);
const defaultEndDate: Date | null = null;
const defaultEndTime = "";

/**
 * The main SearchForm component, to be used in hero.tsx as <SearchForm />.
 * Must return a valid React element.
 */
export function SearchForm(): React.ReactElement {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
      zipCode: "",
      startDate: now,
      startTime: defaultStartTime,
      endDate: defaultEndDate,
      endTime: defaultEndTime,
    },
  });

  const startDateVal = watch("startDate");
  const endDateVal = watch("endDate");

  const onSubmit = (data: SearchFormData) => {
    // Merge start date/time
    const sdt = combineDateTime(data.startDate, data.startTime);
    // Merge end date/time (optional)
    let edt: Date | null = null;
    if (data.endDate) {
      edt = combineDateTime(data.endDate, data.endTime || "");
    }
    // Construct query string
    const params = new URLSearchParams();
    params.append("searchQuery", data.searchQuery);
    params.append("zipCode", data.zipCode);
    if (sdt) {
      params.append("startDateTime", sdt.toISOString());
    }
    if (edt) {
      params.append("endDateTime", edt.toISOString());
    }
    router.push(`/request-details?${params.toString()}`);
  };

  return (
    <div
      id="search-form"
      className="w-full max-w-md mx-auto px-4"
      style={{
        maxWidth: "calc(100% + 5%)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 className="text-foreground font-bold text-lg sm:text-xl leading-tight mb-3">
        FIND YOUR PERFECT
        <br />
        RENTAL
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* SEARCH & ZIPCODE */}
        <div className="space-y-4">
          {/* Search Query */}
          <div>
            <Label htmlFor="search" className="mb-1 block">
              What are you looking for? <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search for products..."
                {...register("searchQuery")}
                className={cn("pl-9", errors.searchQuery && "border-red-500")}
                style={{ borderColor: "#191E3B", color: "#564A0B" }}
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
          <div>
            <Label htmlFor="zipcode" className="mb-1 block">
              Zip Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zipcode"
              placeholder="Enter zip code"
              {...register("zipCode")}
              className={errors.zipCode && "border-red-500"}
              style={{ borderColor: "#191E3B", color: "#564A0B" }}
              required
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>

        {/* START DATE & TIME */}
        <div className="space-y-2">
          <Label className="mb-1">
            Start Date &amp; Time <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Start Date */}
            <div className="w-full sm:w-3/5 min-w-0">
              <Controller
                name="startDate"
                control={control}
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
            {/* Start Time */}
            <div className="w-full sm:w-2/5 min-w-0">
              <Controller
                name="startTime"
                control={control}
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
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </p>
          )}
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startTime.message}
            </p>
          )}
        </div>

        {/* END DATE & TIME (OPTIONAL) */}
        <div className="space-y-2">
          <Label className="mb-1">
            End Date &amp; Time <span className="text-yellow-500">(Optional)</span>
          </Label>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* End Date */}
            <div className="w-full sm:w-3/5 min-w-0">
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePickerPopover
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="No end date"
                    error={errors.endDate?.message}
                    minDate={startDateVal || new Date("1900-01-01")}
                  />
                )}
              />
            </div>
            {/* End Time */}
            <div className="w-full sm:w-2/5 min-w-0">
              <Controller
                name="endTime"
                control={control}
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

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          style={{ backgroundColor: "#191E3B", color: "#FFFFF1" }}
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
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

      {/* Debug info */}
      <pre className="text-xs mt-4">
        Start: {JSON.stringify(startDateVal, null, 2)}
        {"\n"}End: {JSON.stringify(endDateVal, null, 2)}
      </pre>
    </div>
  );
}
