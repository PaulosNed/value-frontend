import React from "react";

const HeroSection = () => {
    const bgImageUrl = "/images/home/hero.svg";
  return (
    <div
      className="w-full h-96 mt-20"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full md:w-1/2 mx-auto h-full flex flex-col justify-center items-center">
        {/* Main text */}
        <h1 className="text-4xl text-primary font-bold text-center">Value is a college prepping service which puts the power back into the students.</h1>
        {/* secondary text */}
        <p className="text-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus explicabo cupiditate eos asperiores quidem nihil corporis repudiandae! Sit nobis numquam ratione minima inventore omnis quisquam dolorem minus, voluptate nam! Inventore?</p>
        {/* two action buttons */}
      </div>
    </div>
  );
};

export default HeroSection;
