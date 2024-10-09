"use client"

import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import HowWeWork from "@/components/home/HowWeWork";
import Pricing from "@/components/home/Pricing";
import StatSection from "@/components/home/StatSection";
import UniveristiesList from "@/components/home/UniveristiesList";
import WhatWeDo from "@/components/home/WhatWeDo";
import NavBar from "@/components/layout/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter()
  
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/user/dashboard");
    }
  }, [sessionStatus, router]);
  
  return (
    <main className="relative">
      {/* Nav section */}
      <div className="fixed inset-0 z-40 h-20 md:h-24">
        <NavBar />
      </div>

      <div id="home" className="mt-32 md:mt-40 pt-10">
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

      <div
        className="p-4 w-full md:w-9/12 md:mx-auto pt-12 md:pt-32"
        id="prices"
      >
        <Pricing />
      </div>

      <div className="h-20"></div>
    </main>
  );
}
