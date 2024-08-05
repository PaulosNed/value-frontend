/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Uni {
  icon: string;
  title: string;
  description: string;
}

const UniveristiesList = () => {
  const unis: Uni[] = [
    {
      icon: "/images/home/yale.svg",
      title: "Yale University",
      description: "Acceptance rate: 4.5%",
    },
    {
      icon: "/images/home/harvard.svg",
      title: "Harvard University",
      description: "Acceptance rate: 4.5%",
    },
    {
      icon: "/images/home/columbia.svg",
      title: "Columbia University",
      description: "Acceptance rate: 4.5%",
    },
    {
      icon: "/images/home/princeton.svg",
      title: "Princeton University",
      description: "Acceptance rate: 4.5%",
    },
    {
      icon: "/images/home/brown.svg",
      title: "Brown University",
      description: "Acceptance rate: 4.5%",
    },
    {
      icon: "/images/home/cornell.svg",
      title: "Cornell University",
      description: "Acceptance rate: 4.5%",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {unis.map((stat, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <div className="shadow-md p-4 md:p-8">
                <img
                  src={stat.icon}
                  alt={stat.title}
                  className="w-12 h-12 md:w-24 md:h-24 object-cover"
                />
                <div className="mt-10">
                  <h1 className="font-bold md:text-xl">{stat.title}</h1>
                  <p className="mt-1 text-xs md:text-sm">{stat.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default UniveristiesList;
