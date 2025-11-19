import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, Filter, CirclePlay } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <CircleCheck size={32} className="text-primary" />,
      title: "Discover Communities Instantly",
      description:
        "Stop searching endlessly across social media and fragmented groups. Hood aggregates all local communities in one place — from tech meetups to book clubs, creative collectives to sports groups.",
    },
    {
      icon: <Filter size={32} className="text-primary" />,
      title: "Filter by Interest & Location",
      description:
        "Find exactly what you're looking for. Filter communities by interest, city, activity level, and more. Whether you're new to a city or exploring new hobbies, we help you find your fit.",
    },
    {
      icon: <CirclePlay size={32} className="text-primary" />,
      title: "Join & Engage Seamlessly",
      description:
        "No more Google Forms or WhatsApp chaos. Join communities instantly, RSVP to events, and stay updated — all in one place. For organizers, manage everything effortlessly.",
    },
  ];

  return (
    <section className="section-spacing container-padding relative">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-foreground">
              Finding communities shouldn't be{" "}
            </span>
            <span className="gradient-text-orange-purple">this hard</span>
            <span className="text-foreground">.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Whether you're moving to a new city, exploring a hobby, or building
            connections, discovering the right community is broken. Hood fixes
            that — connecting people with verified, active communities across
            every interest.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <CardContent className="pt-6 p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Screenshot with Gradient Border */}
        <div className="relative max-w-5xl mx-auto">
          <div className="gradient-border rounded-xl sm:rounded-2xl p-1">
            <div className="bg-card rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-muted to-card flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[10px] sm:border-l-[12px] border-l-primary/60 border-y-[6px] sm:border-y-[8px] border-y-transparent ml-1" />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">Hood Platform Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
