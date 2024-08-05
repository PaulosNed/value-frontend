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

interface Stat {
  icon: string;
  number: string;
  title: string;
}
const StatSection = () => {
  const stats: Stat[] = [
    {
      icon: "/images/home/studentsAdmitted.svg",
      number: "500+",
      title: "Students Admitted",
    },
    {
      icon: "/images/home/database.svg",
      number: "99%",
      title: "Acceptance Rate",
    },
    {
      icon: "/images/home/student.svg",
      number: "700+",
      title: "Students Trained",
    },
  ];
  return (
    <div className="w-8/12 mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-20">
        {stats.map((stat, index) => (
          <Card key={index} className="md:w-4/12 flex flex-col items-center justify-center md:gap-4 shadow-md">
            <CardHeader>
              <img src={stat.icon} alt={stat.title} className="w-8 h-8 md:w-fit md:h-fit"/>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CardTitle className="">{stat.number}</CardTitle>
              <CardDescription className="">{stat.title}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatSection;
