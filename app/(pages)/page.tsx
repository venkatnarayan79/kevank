import { Hero } from "@/components/hero";
import CategoryGrid from "@/components/category-grid";
import TakeHomeCarousel from "@/components/take-home-carousel";
import HowItWorks from "@/components/how-it-works";
import CtaBanner from "@/components/cta-banner";
import Testimonials from "@/components/testimonials";


export default function Home() {

  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryGrid />
      <TakeHomeCarousel />
      <HowItWorks />
      <CtaBanner />
      <Testimonials />
    </main>
  );
}
