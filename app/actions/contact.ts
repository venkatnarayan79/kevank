"use server"

import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not defined in the environment variables.");
}

const resend = new Resend(resendApiKey);

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Use your verified domain in production
      to: "contact@kavenk.com", // Company email address
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #555;">Message:</h3>
            <p style="white-space: pre-line;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
            <p>This email was sent from the contact form on RentEasy website.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data: emailData,
    }
  } catch (error) {
    console.error("Unexpected error sending email:", error)
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    }
  }
}
