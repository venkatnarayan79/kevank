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
import { cn } from "../lib/utils";

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

// ----- Helpers -----
const combineDateTime = (date: Date, timeString: string): Date => {
  const [timePart, period] = timeString.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  const result = new Date(date);
  result.setHours(hours, minutes);
  return result;
};

const generateTimeOptions = () => {
  const opts: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const period = h < 12 ? "AM" : "PM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      opts.push(`${displayHour}:${m.toString().padStart(2, "0")} ${period}`);
    }
  }
  return opts;
};
const timeOptions = generateTimeOptions();

// ----- DatePickerPopover -----
type DatePickerPopoverProps = {
  value: Date;
  onChange: (date: Date) => void;
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
          "w-full text-left font-normal border border-white justify-start",
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
        onSelect={(day) => day && onChange(day)}
        disabled={(date) => (minDate ? date < minDate : false)}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

// ----- TimeSelect -----
type TimeSelectProps = {
  value: string;
  onChange: (val: string) => void;
  error?: string;
};
const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, error }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className={cn("border border-white", error && "border-red-500")}>
      <SelectValue placeholder="Select time" />
    </SelectTrigger>
    <SelectContent>
      {timeOptions.map((t) => (
        <SelectItem key={t} value={t}>
          {t}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// ----- Main Form -----
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

  const onSubmit = (data: SearchFormData) => {
    const { hours: sh, minutes: sm } = parseTime(data.startTime);
    const { hours: eh, minutes: em } = parseTime(data.endTime);
    const sd = new Date(data.startDate);
    const ed = new Date(data.endDate);
    sd.setHours(sh, sm, 0, 0);
    ed.setHours(eh, em, 0, 0);

    const params = new URLSearchParams({
      searchQuery: data.searchQuery,
      zipCode: data.zipCode,
      startDateTime: sd.toISOString(),
      endDateTime: ed.toISOString(),
    });

    router.push(`/request-details?${params.toString()}`);
  };

  function parseTime(timeStr: string) {
    const [time, modifier] = timeStr.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (modifier === "PM" && h < 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;
    return { hours: h, minutes: m };
  }

  return (
    <div id="search-form" className="bg-transparent border-none p-6 w-full max-w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="mb-1 block font-semibold">
            What are you looking for? <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search for products..."
              {...register("searchQuery")}
              className={cn("pl-9 border border-white", errors.searchQuery && "border-red-500")}
            />
          </div>
          {errors.searchQuery && (
            <p className="text-red-500 text-xs mt-1">{errors.searchQuery.message}</p>
          )}
        </div>

        {/* Zip */}
        <div>
          <Label htmlFor="zipcode" className="mb-1 block font-semibold">
            Zip Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="zipcode"
            placeholder="Enter Zip code"
            {...register("zipCode")}
            className={cn("border border-white", errors.zipCode && "border-red-500")}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
          )}
        </div>

        {/* Start */}
        <div>
          <Label className="mb-1 block font-semibold">
            Start Date &amp; Time <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
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
            <div className="w-[140px]">
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
        </div>

        {/* End */}
        <div>
          <Label className="mb-1 block font-semibold">
            End Date &amp; Time <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
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
            <div className="w-[140px]">
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
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
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
    </div>
  );
}
