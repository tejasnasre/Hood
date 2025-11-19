import { Users } from "lucide-react";

export function VideoGallery() {
  const communityTypes = [
    "Tech & Startups",
    "Book Clubs",
    "Fitness & Sports",
    "Creative Arts",
    "Gaming",
    "Music & Dance",
    "Language Exchange",
    "College Clubs",
    "Professional Networks",
    "Outdoor & Adventure",
    "Food & Cooking",
    "Volunteering",
  ];

  return (
    <section className="section-spacing container-padding">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Explore communities across </span>
            <span className="gradient-text-orange-purple">every interest</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
            Whether you're into tech, fitness, arts, gaming, or just want to
            make friends — there's a community waiting for you.
          </p>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {communityTypes.map((type, index) => (
            <div
              key={index}
              className="aspect-video bg-gradient-to-br from-muted to-card rounded-lg border border-border overflow-hidden group hover:border-primary/50 transition-all cursor-pointer relative hover:shadow-lg"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4">
                <Users
                  size={40}
                  className="text-muted-foreground/60 group-hover:text-primary transition-colors mb-2 sm:mb-3"
                />
                <p className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                  {type}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}