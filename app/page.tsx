import { Hero } from "@/components/hero";
import { SearchForm } from "@/components/search-form";
import { CategoryIcons } from "@/components/category-icons";
import { FeaturedItems } from "@/components/featured-items";
import { HowItWorks } from "@/components/how-it-works";
import { CallToAction } from "@/components/call-to-action";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <Hero />
        {/* SearchForm is now integrated directly in the Hero component */}
        <div className="md:hidden mt-8 px-4">
          <SearchForm />
        </div>
      </div>
      <CategoryIcons />
      <FeaturedItems />
      <HowItWorks />
      <CallToAction />
      <Testimonials />
    </main>
  );
}
