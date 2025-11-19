import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorderTrail } from "../ui/border-trail";

export function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <Badge variant="secondary" className="w-fit">
              Find Your Tribe. Build Your Community.
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-foreground">
                Discover Communities
              </span>
              <br />
              <span className="text-foreground">
                Near You.
              </span>
              <br />
              <span className="gradient-text-orange-purple">
                Join Your Hood.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Hood connects you with verified local communities across all
              interests — tech meetups, hobby groups, creative collectives,
              college clubs, fitness communities, and more. Find your people,
              wherever you are.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                Explore Communities
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                For Organizers
              </Button>
            </div>
          </div>

          {/* Right content - Video Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0">
            {[1, 2, 3, 4].map((item) => (
              <div
                className="relative flex h-[160px] sm:h-[200px] w-full flex-col items-center justify-center rounded-lg bg-card border border-border px-4 py-3 hover:border-primary/50 transition-colors"
                key={item}
              >
                <BorderTrail
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgb(99 102 241 / 30%), 0 0 100px 60px rgb(0 0 0 / 50%)",
                  }}
                  size={100}
                />
                <div
                  className="flex h-full animate-pulse flex-col items-start justify-center space-y-2 w-full"
                  role="status"
                  aria-label="Loading..."
                >
                  <div className="h-1 w-1/4 rounded-sm bg-muted"></div>
                  <div className="h-1 w-2/5 rounded-sm bg-muted"></div>
                  <div className="h-1 w-1/2 rounded-sm bg-muted"></div>
                  <div className="h-1 w-1/2 rounded-sm bg-muted"></div>
                  <div className="h-1 w-1/2 rounded-sm bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
