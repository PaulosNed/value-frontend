"use client";

import { toast } from "@/components/ui/use-toast";
import { Course } from "@/Models/Course";
import { useGetSingleCoursesQuery } from "@/store/courses/coursesApi";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams<{ id: string }>();

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetSingleCoursesQuery(params.id);

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

  const course: Course = response?.data;

  return <div className="w-full bg-slate-500 h-40"></div>;
};

export default Page;
