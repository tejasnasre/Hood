import { Separator } from "@/components/ui/separator";

export function Footer() {
  const footerLinks = {
    Product: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "For Organizers", href: "#for-organizers" },
      { label: "Communities", href: "#communities" },
      { label: "Events", href: "#events" },
    ],
    Resources: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community Guidelines", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-border py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">Hood</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover communities near you. Connect with people who share your
              interests. Build meaningful relationships.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">{title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border mb-6 sm:mb-8" />

        <div className="text-center text-xs sm:text-sm text-muted-foreground">
          © 2025 Hood. Find your tribe, wherever you are.
        </div>
      </div>
    </footer>
  );
}
