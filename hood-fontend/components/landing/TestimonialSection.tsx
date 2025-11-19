import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestimonialSection() {
  return (
    <section className="section-spacing container-padding">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/80 border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 hover:shadow-xl transition-shadow">
            <div className="text-5xl sm:text-6xl text-primary mb-4 sm:mb-6">"</div>
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-foreground mb-6 sm:mb-8 leading-relaxed">
              I moved to Bangalore for work and knew no one. Hood helped me find
              a design community, a weekend hiking group, and even a book club
              nearby. Within a month, I had friends and a social life. It's like
              having a local guide in your pocket.
            </blockquote>
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                <AvatarImage src="https://i.pravatar.cc/100?u=priya" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-foreground text-sm sm:text-base">Priya Sharma</div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Product Designer, New to Bangalore
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}