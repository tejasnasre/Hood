export function StatsSection() {
  const stats = [
    {
      value: "85%",
      title: "Feel More Connected",
      description:
        "People who join local communities report stronger social ties, better mental health, and a greater sense of belonging in their city.",
    },
    {
      value: "3x",
      title: "Faster Community Growth",
      description:
        "Organizers using centralized platforms see 3x faster member growth and higher event attendance compared to fragmented manual systems.",
    },
  ];

  return (
    <section className="section-spacing container-padding bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Communities </span>
            <span className="gradient-text-orange-purple">thrive</span>
            <span className="text-foreground"> when people connect</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Whether it's professional networking, creative collaboration, or
            simply finding friends who share your interests — belonging to a
            community transforms how you experience your city. Hood makes
            discovering and joining these communities effortless.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 sm:p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text-purple-blue mb-4">
                {stat.value}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                {stat.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}