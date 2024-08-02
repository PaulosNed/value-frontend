import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
    const bgImageUrl = "/images/home/hero.svg";
  return (
    <div
      className="w-full min-h-96 mt-5 md:mt-20"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full px-6 md:w-2/3 mx-auto h-full flex flex-col pt-6 items-center">
        {/* Main text */}
        <h1 className="text-3xl md:text-4xl text-primary font-bold text-center">Value is a college prepping service which puts the power back into the students.</h1>
        {/* secondary text */}
        <p className="text-primary-opacity-25 text-opacity-25 mt-8 md:mt-4 text-center">Redefining the College Application process in Ethiopia.</p>
        {/* two action buttons */}
        <div className="mt-12 flex flex-col md:flex-row w-full md:w-fit gap-3 md:gap-8">
            <Button className="px-12">Learn More</Button>
            <Button variant="outline" className="px-12 border border-primary">Apply Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
