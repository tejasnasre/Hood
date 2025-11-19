import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";

export function LibrarySection() {
  const features = [
    {
      title: "All Communities, One Place",
      description:
        "From tech meetups to book clubs, creative collectives to fitness groups — discover every active community near you.",
    },
    {
      title: "Verified & Trusted",
      description:
        "Every community is verified. No ghost groups, no spam. Just real, active communities with engaged members.",
    },
    {
      title: "Free to Explore & Join",
      description:
        "Browse communities for free. Join instantly. Explore events. Connect with organizers. Build your social circle.",
    },
  ];

  const pricingFeatures = [
    "Discover communities near you",
    "Join instantly with one tap",
    "Explore upcoming events",
    "Connect with organizers",
    "Free forever for members",
  ];

  return (
    <section className="section-spacing container-padding bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Library Features */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              <span className="text-foreground">Every type of </span>
              <span className="gradient-text-orange-purple">community</span>
              <span className="text-foreground"> you can imagine</span>
            </h2>

            <div className="space-y-5 sm:space-y-6 mt-6 sm:mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0"
                  >
                    <CircleCheck size={20} className="text-primary sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Pricing Card */}
          <div className="mt-8 lg:mt-0">
            <Card className="bg-card/80 border-border backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader className="p-6 sm:p-8">
                <Badge className="bg-gradient-to-r from-primary to-purple-500 text-primary-foreground border-none w-fit mb-4">
                  For Community Seekers
                </Badge>
                <div className="flex items-baseline gap-2">
                  <CardTitle className="text-4xl sm:text-5xl font-bold text-foreground">
                    Free
                  </CardTitle>
                  <span className="text-muted-foreground">forever</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Find your people, no payment needed
                </p>
              </CardHeader>
              <CardContent className="space-y-6 p-6 sm:p-8 pt-0">
                <div className="space-y-3">
                  {pricingFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CircleCheck
                        size={18}
                        className="text-primary shrink-0 sm:w-5 sm:h-5"
                      />
                      <span className="text-sm sm:text-base text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  variant="default"
                >
                  Start Exploring Communities
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
