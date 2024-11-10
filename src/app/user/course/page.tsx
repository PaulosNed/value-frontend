/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import WeekAccordion from "@/components/course/WeekAccordion";
import { toast } from "@/components/ui/use-toast";
import { Week } from "@/Models/Week";
import { useGetAllCoursesQuery } from "@/store/courses/coursesApi";
import React, { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "@/Models/Course";

const Page = () => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetAllCoursesQuery();

  // console.log("weeks", weeks);
  if (isError) {
    {
      console.log(error, isError);
      toast({
        variant: "destructive",
        title: "Unable to fetch Courses",
        description: (error as any)?.data?.detail,
      });
    }
    return <div>Error</div>;
  }

  const weeks: Week[] = response?.data;
  const [pageOrder, setPageOrder] = useState<string[]>([]);

  useEffect(() => {
    let order: string[] = [];
    weeks?.map((week: Week) => {
      const courses: Course[] = week.courses;
      courses?.map((course: Course) => {
        order.push(`/user/course/detail/${course.id}`);
      });
      order.push(`/user/course/detail/quiz/${week.id}`);
      order.push(`/user/course/detail/activity/${week.id}`);
    });
    console.log("order from useEffect", order);
    setPageOrder(order);
  }, [weeks]);

  return (
    <main>
      <div className="md:w-9/12 md:mx-auto px-10">
        <h1 className="text-3xl md:text-4xl text-primary font-bold capitalize text-center">
          The complete 4 weeks college application guide
        </h1>

        <div className="mt-8">
          <div className="md:w-9/12 mx-auto flex justify-between">
            {/* Rating */}
            <div className="flex gap-3 items-center">
              <FaStar fill="#FFD233" />

              <div>
                <span className="text-primary font-bold text-sm">4.8</span>

                <span className="ml-1 text-primary text-sm">
                  Rating(400)
                </span>
              </div>
            </div>

            {/* Students count */}
            <div className="flex gap-3 items-center">
              <FaUsers fill="#010A4B" />

              <div>
                <span className="text-primary font-bold text-sm">
                  700+
                </span>

                <span className="ml-1 text-primary text-sm">Students</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex gap-3 items-center">
              <FaChalkboardTeacher fill="#0053CE" />

              <div>
                <span className="text-primary font-bold text-sm">
                  Mr. Nahom Jemberu
                </span>

                {/* <span className="ml-1 text-primary text-sm">
                  Rating(225,456)
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* <h1 className="text-3xl font-semibold mb-6">What is Value College Prep?</h1> */}
          <p className="text-slate-500 mb-4">
            At Value College Prep, we don’t just apply to colleges for you; we
            teach you how to apply to the best schools yourself. The reason we
            empower you to take control of your application is simple: no one
            will be as passionate about your future as you are. When you hand
            off your application to someone else, they often put in the bare
            minimum effort, which can lead to getting accepted into schools that
            are a poor fit, have higher visa refusal rates, low scholarships, or
            even worse—schools that aren’t accredited.
          </p>
          <p className="text-slate-500 mb-4">
            {`Some students have faced serious issues like losing their passports,
            being blackmailed, or overcharged by consultancies. The most
            critical aspect, though, is that without demonstrating a deep
            understanding of the application process, your visa could be
            rejected. But if you're in control, you can avoid these risks and
            get into a school that’s truly right for you.`}
          </p>
          <p className="text-slate-500 mb-4">
            {`We will teach you how to apply yourself, but be prepared: this
            course requires dedication. If your goal is simply to leave your
            country without concern for the quality of the university, other
            services might be a better fit. However, if you want to improve your
            skills, understand the school and location you're going to, meet
            alumni, and secure better scholarships, then this is the right
            opportunity for you.`}
          </p>
          <p className="text-slate-500 mb-4">
            Our program maximizes your chances of acceptance by guiding you
            through the process with the necessary tools, resources, and
            knowledge. Read on to learn more about what to expect in our Safety
            Program.
          </p>
        </div>

        <div className="mt-8 md:mt-16">
          <h1 className="text-2xl md:text-3xl text-primary font-bold capitalize text-center">
            Course Content
          </h1>
        </div>
        <div className="mt-8">
          {(isLoading || isFetching) && (
            <div className="flex flex-col space-y-4 mt-3">
              <Skeleton className="h-[80px]" />
              <Skeleton className="h-[80px]" />
              <Skeleton className="h-[80px]" />
              <Skeleton className="h-[80px]" />
              <Skeleton className="h-[80px]" />
            </div>
          )}
          {weeks?.length !== 0 &&
            weeks?.map((week: Week) => (
              <WeekAccordion
                key={week.id}
                id={week.id}
                count={week.count}
                title={week.title}
                description={week.description}
                courses={week.courses}
                pageOrder={pageOrder}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
