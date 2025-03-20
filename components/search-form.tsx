"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { addDays, format } from "date-fns"
import { Search, Loader2, CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Define a Zod schema for the form with all fields required
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
      const startDateTime = combineDateTime(data.startDate, data.startTime)
      const endDateTime = combineDateTime(data.endDate, data.endTime)
      return endDateTime > startDateTime
    },
    {
      message: "End date/time must be after start date/time",
      path: ["endDate"],
    },
  )

type SearchFormData = z.infer<typeof searchFormSchema>

// Generate time options in 30-minute intervals with AM/PM format
const generateTimeOptions = () => {
  const options = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const period = hour < 12 ? "AM" : "PM"
      const displayHour = hour % 12 === 0 ? 12 : hour % 12
      const formattedMinute = minute.toString().padStart(2, "0")
      options.push(`${displayHour}:${formattedMinute} ${period}`)
    }
  }
  return options
}

const timeOptions = generateTimeOptions()

// Helper function to combine date and time
function combineDateTime(date: Date, timeString: string): Date {
  const [timePart, period] = timeString.split(" ");
  const [hoursStr, minutesStr] = timePart.split(":");
  let hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  // Convert to 24-hour format
  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const result = new Date(date);
  result.setHours(hours);
  result.setMinutes(minutes);
  return result;
}


export function SearchForm() {
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
  })

  // Watch start date to ensure end date is never before it
  const startDate = watch("startDate")

  const onSubmit = async (data: SearchFormData) => {
    // Combine date and time
    const startDateTime = combineDateTime(data.startDate, data.startTime)
    const endDateTime = combineDateTime(data.endDate, data.endTime)

    const formattedData = {
      ...data,
      startDateTime: format(startDateTime, "PPP p"),
      endDateTime: format(endDateTime, "PPP p"),
    }

    console.log("Form submitted with data:", formattedData)

    // Simulate an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert(
        `Search submitted!\n\nSearch Query: ${data.searchQuery}\nZip Code: ${data.zipCode}\nStart: ${formattedData.startDateTime}\nEnd: ${formattedData.endDateTime}`,
      )
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div id="search-form" className="bg-background rounded-lg shadow-lg p-6 max-w-fit mx-auto">
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
              {errors.searchQuery && <p className="text-red-500 text-xs mt-1">{errors.searchQuery.message}</p>}
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
              {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>}
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-4">
            {/* Start Date and Time */}
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              errors.startDate && "border-red-500",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <div className="w-full sm:w-[140px]">
                  <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={cn(errors.startTime && "border-red-500")}>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={`start-time-${time}`} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              {(errors.startDate || errors.startTime) && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate?.message || errors.startTime?.message}</p>
              )}
            </div>

            {/* End Date and Time */}
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              errors.endDate && "border-red-500",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < startDate || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <div className="w-full sm:w-[140px]">
                  <Controller
                    control={control}
                    name="endTime"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={cn(errors.endTime && "border-red-500")}>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={`end-time-${time}`} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              {(errors.endDate || errors.endTime) && (
                <p className="text-red-500 text-xs mt-1">{errors.endDate?.message || errors.endTime?.message}</p>
              )}
            </div>
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
  )
}

