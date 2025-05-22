import { Search, CalendarRange, DollarSign } from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-[#ECEFED] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 max-w-[300px]">{description}</p>
    </div>
  );
};

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>

        <div className="text-center mb-4">
          <p className="text-gray-600">
            Renting equipment from your neighbors is easy, affordable, and
            sustainable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Step
            icon={<Search size={40} stroke="#70C27C" />}
            title="Find What You Need"
            description="Browse thousands of equipment or products. Filter by category, price, and location to find exactly what you're looking for."
          />

          <Step
            icon={<CalendarRange size={40} stroke="#70C27C" />}
            title="Book Your Rental"
            description="Select your pick-up and drop-off times, message the owner with any questions, and book securely through our platform."
          />

          <Step
            icon={<DollarSign size={40} stroke="#70C27C" />}
            title="Save Money"
            description="Stop buying equipment that's rarely used, save money and storage space by renting from your neighbors."
          />
        </div>
      </div>
    </section>
  );
}
