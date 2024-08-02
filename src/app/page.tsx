import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import StatSection from "@/components/home/StatSection";
import UniveristiesList from "@/components/home/UniveristiesList";

export default function Home() {
  return (
    <main className="">
      <HeroSection />

      <div className="mt-10">
        <StatSection />
      </div>

      <div className="p-4 md:w-9/12 mx-auto pt-8 md:pt-20">
        <AboutSection />
      </div>

      
      <div className="w-8/12 md:w-10/12 mx-auto mt-12 md:mt-40">
        <UniveristiesList />
      </div>

      <div className="h-20"></div>
    </main>
  );
}
