"use client";

import WeekAccordion from "@/components/course/WeekAccordion";
import { toast } from "@/components/ui/use-toast";
import { Week } from "@/Models/Week";
import { useGetAllCoursesQuery } from "@/store/courses/coursesApi";
import React from "react";

import { FaStar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";


const Page = () => {
  
  const { data: response, isLoading, isFetching, isError, error, isSuccess } = useGetAllCoursesQuery();

  // console.log("weeks", weeks);
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  else if (isError) {
    {
      console.log(error, status, isError);
      toast({
        variant: "destructive",
        title: "Unable to fetch Courses",
        description: (error as any)?.data?.detail,
      });
    }
    return <div>Error</div>;
  }

  const weeks: Week[] = response?.data;


  return (
    <main>
      <div className="md:w-9/12 md:mx-auto px-10">
        <h1 className="text-3xl md:text-4xl text-primary font-bold capitalize text-center">
          The complete advanced 6 weeks course
        </h1>

        <div className="mt-8">
          <div className="md:w-9/12 mx-auto flex justify-between">
            {/* Rating */}
            <div className="flex gap-3 items-center">
              <FaStar fill="#FFD233" />

              <div>
                <span className="text-primary font-bold text-sm">4.8</span>

                <span className="ml-1 text-primary text-sm">
                  Rating(225,456)
                </span>
              </div>
            </div>

            {/* Students count */}
            <div className="flex gap-3 items-center">
              <FaUsers fill="#010A4B" />

              <div>
                <span className="text-primary font-bold text-sm">
                  1,234,567
                </span>

                <span className="ml-1 text-primary text-sm">Students</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex gap-3 items-center">
              <FaChalkboardTeacher fill="#0053CE" />

              <div>
                <span className="text-primary font-bold text-sm">
                  Mr. Nahom Eyouel
                </span>

                {/* <span className="ml-1 text-primary text-sm">
                  Rating(225,456)
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-slate-500">
            This course is designed to equip students with the essential skills
            and knowledge needed to confidently enter college. Through a
            well-structured curriculum, students will strengthen their academic
            foundations, enhance critical thinking, and develop effective study
            habits. The course also covers time management and personal
            development strategies to help students transition smoothly into the
            demands of college life, ensuring they are well-prepared for
            academic success and personal growth.
          </p>
        </div>

        <div className="mt-8 md:mt-16">
          <h1 className="text-2xl md:text-3xl text-primary font-bold capitalize text-center">
            Course Content
          </h1>
        </div>
        <div className="mt-8">
          {weeks?.length !== 0 &&
            weeks?.map((week: Week) => (
              <WeekAccordion
                key={week.id}
                id={week.id}
                title={week.title}
                description={week.description}
                courses={week.courses}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
