"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendContactEmail } from "@/app/actions/contact"

// Define schema for the form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await sendContactEmail(data)

      if (result.success) {
        setFormStatus("success")
        reset() // Clear the form
      } else {
        setFormStatus("error")
        setErrorMessage(result.error || "Failed to send message. Please try again later.")
      }
    } catch (error) {
      setFormStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again later.")
      console.error("Contact form error:", error)
    }
  }

  if (formStatus === "success") {
    return (
      <div className="bg-background rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
        <p className="text-muted-foreground mb-6">
          {`Thank you for contacting us. We'll get back to you as soon as possible.`}
        </p>
        <Button onClick={() => setFormStatus("idle")}>Send Another Message</Button>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      {formStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-600 dark:text-red-400">Error</h3>
            <p className="text-red-600/90 dark:text-red-400/90 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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

          <div>
            <Label htmlFor="subject" className="mb-1 block">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              placeholder="What is your message about?"
              {...register("subject")}
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <Label htmlFor="message" className="mb-1 block">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              {...register("message")}
              className={`min-h-[180px] ${errors.message ? "border-red-500" : ""}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}
