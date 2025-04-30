"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Shield, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Kavenk</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {`We're on a mission to transform how people access and share equipment, making renting more accessible,
            affordable, and sustainable for everyone.`}
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <div className="bg-background rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4">
                <p>
                  {`Kavenk was founded in 2025 with a simple idea: most people have equipment and tools they rarely use,
                  while others need these items but don't want to purchase them for occasional use.`}
                </p>
                <p>
                  {`Our founders experienced this firsthand. Needing power tools for a project they faced the choice of
                  buying expensive equipment or struggling without
                  the right tools. This experience sparked the idea for a platform where neighbors could safely and
                  conveniently share resources.`}
                </p>
                <p>
                  {`Starting with just a few dozen listings in one neighborhood, Kavenk has grown into a thriving
                  community marketplace connecting thousands of people across multiple cities. Our platform has helped
                  users save money, reduce waste, and build stronger community connections.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community First</h3>
                  <p className="text-muted-foreground">
                    We believe in the power of community and sharing. Our platform is designed to foster connections
                    between neighbors and build stronger local networks.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Environmental Responsibility</h3>
                  <p className="text-muted-foreground">
                    {`By encouraging sharing over buying, we're reducing waste and the environmental impact of
                    manufacturing new products that will only be used occasionally.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                  <p className="text-muted-foreground">
                    {`We prioritize creating a secure platform where users can rent with confidence. Our verification
                    processes and review system help build trust within our community.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    {`We're committed to making equipment accessible to everyone, regardless of budget. Our platform
                    helps democratize access to tools and resources.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-background rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {`Whether you're looking to rent equipment or share your own items, Kavenk makes it easy to get started.
            Join thousands of users who are already saving money and resources.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Browse Rentals</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/create-listing">List Your Items</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;