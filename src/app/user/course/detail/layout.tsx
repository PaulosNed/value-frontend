"use client"

import WeekAccordion from "@/components/course/WeekAccordion";
import { toast } from "@/components/ui/use-toast";
import { Week } from "@/Models/Week";
import { useGetAllCoursesQuery } from "@/store/courses/coursesApi";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

  return (
    <div className="flex">
      {/* Nav section */}
      <div className="z-10 w-4/12 px-10 bg-gray-50 rounded-r-md">
        {/* Add side nav */}
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

      {/* Body */}
      <div className="w-8/12">{children}</div>

    </div>
  );
};

export default Layout;
