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
import { FaCheckCircle, FaUserGraduate, FaUsers } from "react-icons/fa";
import { MdPieChartOutline, MdBarChart } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";

interface Stat {
  icon: React.ReactNode;
  number: string;
  title: string;
}
const StatSection = () => {
  const stats: Stat[] = [
    {
      icon: <FaUsers size={40} className="w-20 h-20 md:w-fit md:h-fit text-slate-600" />,
      number: "400+",
      title: "Students Admitted",
    },
    {
      icon: <FaCheckCircle size={40} className="w-20 h-20 md:w-fit md:h-fit text-slate-600" />,
      number: "99%",
      title: "Acceptance Rate",
    },
    {
      icon: <FaChartLine size={40} className="w-20 h-20 md:w-fit md:h-fit text-slate-600" />,
      number: "6",
      title: "Average Acceptances per Student",
    },
  ];
  return (
    <div className="w-8/12 mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-20">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="md:w-4/12 flex flex-col items-center justify-center md:gap-2 shadow-md"
          >
            <CardHeader>{stat.icon}</CardHeader>
            <CardContent className="flex flex-col items-center">
              <CardTitle className="">{stat.number}</CardTitle>
              <CardDescription className="text-center md:text-start">
                {stat.title}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatSection;
