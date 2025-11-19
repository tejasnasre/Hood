export function ToolsSection() {
  return (
    <section className="section-spacing container-padding">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Built for </span>
            <span className="gradient-text-purple-blue">
              community organizers
            </span>
            <span className="text-foreground"> too</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Stop juggling WhatsApp groups, Google Forms, and spreadsheets. Hood
            gives you everything you need to manage members, events, RSVPs,
            payments, and engagement — all in one powerful dashboard.
          </p>
        </div>

        {/* Product Images Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Member Management",
              desc: "Track members, verify profiles, and manage access effortlessly",
            },
            {
              title: "Event Planning",
              desc: "Create events, manage RSVPs, and send automated reminders",
            },
            {
              title: "Analytics & Growth",
              desc: "Understand engagement, track growth, and reach more people",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="aspect-video bg-gradient-to-br from-muted to-card rounded-lg sm:rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg group"
            >
              <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/40 rounded group-hover:bg-primary/60 transition-colors" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}