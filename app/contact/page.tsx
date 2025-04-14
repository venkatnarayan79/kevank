import { ContactForm } from "@/components/contact-form";
// import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {`Have questions about our rental platform? We're here to help.
            Fill out the form below or use our contact information to get in
            touch with our team.`}
          </p>
        </div>
        
        <ContactForm />
      </div>
    </main>
  );
}
