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
        <div className="absolute top-32 right-10 md:right-20 max-w-md z-40">
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
