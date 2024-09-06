import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import HowWeWork from "@/components/home/HowWeWork";
import Pricing from "@/components/home/Pricing";
import StatSection from "@/components/home/StatSection";
import UniveristiesList from "@/components/home/UniveristiesList";
import WhatWeDo from "@/components/home/WhatWeDo";

export default function Home() {
  return (
    <main className="">
      <div id="home" className="pt-10">
        <HeroSection />
      </div>

      <div className="pt-10">
        <StatSection />
      </div>

      <div className="p-4 md:w-9/12 mx-auto pt-8 md:pt-32" id="about">
        <AboutSection />
      </div>

      <div className="w-8/12 md:w-10/12 mx-auto pt-12 md:pt-40" id="unis">
        <UniveristiesList />
      </div>

      <div className="mt-12 md:mt-32" id="workflow">
        <HowWeWork />
      </div>

      <div className="p-4 w-full md:w-9/12 md:mx-auto mt-12 md:mt-32">
        <WhatWeDo />
      </div>

      <div className="p-4 w-full md:w-9/12 md:mx-auto pt-12 md:pt-32" id="prices">
        <Pricing />
      </div>

      <div className="h-20"></div>
    </main>
  );
}
