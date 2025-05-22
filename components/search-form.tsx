"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDays, format } from "date-fns";
import { Search, CalendarIcon } from "lucide-react";

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

// ----- Schema & Types -----
const searchFormSchema = z
  .object({
    searchQuery: z.string().min(1, { message: "Search query is required" }),
    zipCode: z
      .string()
      .min(1, { message: "Zip code is required" })
      .refine((val) => /^\d{5}(-\d{4})?$/.test(val), {
        message: "Please enter a valid zip code",
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
    },
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
    function parseTime(timeStr: string) {
      const [time, modifier] = timeStr.split(" ");
      const [rawHours, rawMinutes] = time.split(":").map(Number);
      let hours = rawHours;
      const minutes = rawMinutes;
      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }
      return { hours, minutes };
    }

    const startDateTime = new Date(data.startDate);
    const endDateTime = new Date(data.endDate);

    const { hours: startHours, minutes: startMinutes } = parseTime(
      data.startTime,
    );
    const { hours: endHours, minutes: endMinutes } = parseTime(data.endTime);

    startDateTime.setHours(startHours, startMinutes, 0, 0);
    endDateTime.setHours(endHours, endMinutes, 0, 0);

    const params = new URLSearchParams();
    params.append("searchQuery", data.searchQuery);
    params.append("zipCode", data.zipCode);
    params.append("startDateTime", startDateTime.toISOString());
    params.append("endDateTime", endDateTime.toISOString());

    router.push(`/request-details?${params.toString()}`);
  };

  return (
    <div className="bg-[#1E352D] rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">
        FIND YOUR PERFECT RENTAL
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-white text-sm mb-1 block">
            What are you looking for?
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search for products..."
              {...register("searchQuery")}
              className="pl-9 bg-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="zipcode" className="text-white text-sm mb-1 block">
            Zip Code
          </Label>
          <Input
            id="zipcode"
            placeholder="Enter zip code"
            {...register("zipCode")}
            className="bg-white"
          />
        </div>

        <div>
          <Label className="text-white text-sm mb-1 block">
            Start Date & Time
          </Label>
          <div className="flex flex-col space-y-2">
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal bg-white w-full"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(field.value, "MMM dd, yyyy")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            <Controller
              control={control}
              name="startTime"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white">
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
              )}
            />
          </div>
        </div>

        <div>
          <Label className="text-white text-sm mb-1 block">
            End Date & Time
          </Label>
          <div className="flex flex-col space-y-2">
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal bg-white w-full"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(field.value, "MMM dd, yyyy")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            <Controller
              control={control}
              name="endTime"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white">
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
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#70C27C] hover:bg-[#5BB068] text-white"
        >
          Search Rentals
        </Button>
      </form>
    </div>
  );
}
