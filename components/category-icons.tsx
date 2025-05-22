import { BikeIcon, Laptop, Tent } from "lucide-react";
import { IconGolf } from "@tabler/icons-react";
import { IconTools } from "@tabler/icons-react";
import { IconSnowflake } from "@tabler/icons-react";
import { IconWashMachine } from "@tabler/icons-react";

interface CategoryItemProps {
  icon: React.ReactNode;
  label: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center p-3">
      <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium text-center">{label}</span>
    </div>
  );
};

export function CategoryIcons() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Rent What You Need
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          <CategoryItem icon={<BikeIcon size={32} />} label="Bike" />
          <CategoryItem icon={<IconGolf size={32} />} label="Golf" />
          <CategoryItem icon={<IconTools size={32} />} label="Tools" />
          <CategoryItem icon={<IconSnowflake size={32} />} label="Skating" />
          <CategoryItem icon={<IconWashMachine size={32} />} label="Brew Kit" />
          <CategoryItem icon={<Laptop size={32} />} label="Laptop" />
          <CategoryItem icon={<IconWashMachine size={32} />} label="Machine" />
          <CategoryItem icon={<Tent size={32} />} label="Camping Tent" />
        </div>
      </div>
    </section>
  );
}
