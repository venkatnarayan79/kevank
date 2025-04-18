import { Hero } from "@/components/hero";
import { SearchForm } from "@/components/search-form";

export default function Home() {

  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Find Your Perfect Rental</h2>
          <SearchForm />
        </div>
      </div>
    </main>
  );
}
