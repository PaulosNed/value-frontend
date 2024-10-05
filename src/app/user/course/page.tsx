"use client";

import { toast } from "@/components/ui/use-toast";
import { useGetAllCoursesQuery } from "@/store/courses/coursesApi";
import { useSession } from "next-auth/react";
import React from "react";

type Course = {
  id: string;
  title: string;
  description: string;
};

const Page = () => {
  const { data: session, status } = useSession();
  const token = (session as any)?.accessToken as string;
  const {
    data: weeks,
    status: courseStatus,
    error,
  } = useGetAllCoursesQuery(token);

  if (error) {
    {
      console.log("token", token);
      console.log(error);
      toast({
        variant: "destructive",
        title: "Unable to fetch Courses",
        description: (error as any)?.data?.detail,
      });
    }
    return <div>Error</div>;
  }

  return <main>
    <div className="md:w-10/12 md:mx-auto px-10">
      
    </div>
  </main>;
};

export default Page;
