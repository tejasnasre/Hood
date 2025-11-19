import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { ToolsSection } from "@/components/landing/ToolsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { VideoGallery } from "@/components/landing/VideoGallery";
import { LibrarySection } from "@/components/landing/LibrarySection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <FeatureSection />
        <ToolsSection />
        <StatsSection />
        <VideoGallery />
        <LibrarySection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}