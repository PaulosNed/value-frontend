import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import StatSection from "@/components/home/StatSection";

export default function Home() {
  return (
    <main className="">
      <HeroSection />

      <div className="mt-10">
        <StatSection />
      </div>

      <div className="p-4 md:px-20 pt-8 md:pt-20">
        <AboutSection />
      </div>

      <div className="h-20"></div>
    </main>
  );
}
