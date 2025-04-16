"use client";

import { useGetDemoCoursesQuery } from "@/store/users/usersApi";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import CourseDetail from "../course/CourseDetail";

const FreeTial = () => {
  const { data, isLoading, isFetching } = useGetDemoCoursesQuery();
  const demoCourses = data?.data;
  console.log("demoCourses", demoCourses);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    console.log("index updated", idx)
  }, [idx])

  return (
    <div className="flex flex-col items-center gap-5">
      {isLoading && <Skeleton className="w-1/2 mx-auto h-20" />}
      {!isLoading && (
        <h1 className="text-3xl font-bold">
          Here is a glimpse of what we offer
        </h1>
      )}
      {!isLoading && (
        <p className="text-lg font-[200]">
          Explore a selection of our courses designed to kickstart your journey
          toward studying abroad. Here are some of the courses from the first
          week of camp with title {demoCourses.title} which focuses on{" "}
          {demoCourses.description}
        </p>
      )}
      <div className="mt-12 flex flex-col md:flex-row justify-center gap-16">
        <div className="relative bg-neutral-50 shadow-md rounded-lg p-4 w-[80vw] h-[500px] mx-auto">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <div className="absolute top-0 left-0 h-[500px] overflow-y-auto">
              <div className="w-8/12 mx-auto py-10">
                <CourseDetail
                  isLoading={isLoading}
                  isFetching={isFetching}
                  course={(demoCourses?.courses ?? [])[idx] || []}
                />
              </div>
            </div>
          )}
          {!isLoading && (
            <div className="absolute bottom-0 h-20 z-20 my-auto px-10 w-full flex justify-between">
              <Button
                disabled={idx < 1}
                onClick={() => setIdx((prev) => prev - 1)}
                className=" rounded-full w-14 h-14"
              >
                <ChevronLeft />
              </Button>
              <Button
                disabled={idx >= (demoCourses?.courses?.length ?? 0) - 1}
                onClick={() => setIdx((prev) => prev + 1)}
                className=" rounded-full w-14 h-14"
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreeTial;
