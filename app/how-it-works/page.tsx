import React from "react";
import { Search, Calendar, DollarSign } from "lucide-react";

interface StepProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ children, title, description }) => {
  return (
    <article className="flex flex-col items-center bg-background rounded-lg border p-8">
      <div className="p-6 rounded-full mb-6">
        {children}
      </div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-center text-muted-foreground">{description}</p>
    </article>
  );
};

const HowItWorksPage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-xl text-muted-foreground">
          Renting equipment from your neighbors is easy, affordable, and sustainable.
        </p>
      </header>
      {/* Responsive grid: single column on small screens, three columns on medium+ screens */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Step
          title="Find What You Need"
          description="Browse thousands of items in your area. Filter by category, price, and location to find exactly what you're looking for."
        >
          <Search className="h-10 w-10" aria-hidden="true" />
        </Step>

        <Step
          title="Book Your Rental"
          description="Select your rental dates, message the owner with any questions, and book securely through our platform."
        >
          <Calendar className="h-10 w-10" aria-hidden="true" />
        </Step>

        <Step
          title="Save Money"
          description="Skip buying expensive items you'll only use occasionally. Save money and storage space by renting from your neighbors."
        >
          <DollarSign className="h-10 w-10" aria-hidden="true" />
        </Step>
      </section>
    </main>
  );
};

export default HowItWorksPage;
