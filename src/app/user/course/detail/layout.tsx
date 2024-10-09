"use client"

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
      {/* Body */}
      <div className="w-9/12">{children}</div>

      {/* Nav section */}
      <div className="top-0 right-0 z-40 w-3/12 h-40 bg-black">
        {/* Add side nav */}
        {/* <AuthedNavBar /> */}
      </div>
    </div>
  );
};

export default Layout;
