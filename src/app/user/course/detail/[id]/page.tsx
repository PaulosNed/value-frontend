"use client";

import { toast } from "@/components/ui/use-toast";
import { Course } from "@/Models/Course";
import { useGetSingleCoursesQuery } from "@/store/courses/coursesApi";
import { useParams } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/styles/RichTextStyles.module.css";

import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  return (
    <div className="w-full px-20 mt-10">
      {(isLoading || isFetching) && (
        <div className="flex flex-col space-y-4 mt-3">
          <Skeleton className="h-[80px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[500px]" />
          {/* <Skeleton className="h-[80px]" />
          <Skeleton className="h-[80px]" /> */}
        </div>
      )}
      <div className={styles.richTextContent}>
        {!isLoading && !isFetching && (
          <>
            {parse(course.description)}
            <div className="h-4"></div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="px-12 border border-primary"
                asChild
              >
                <Link href={`/user/course/detail/${Math.max(1, course?.id - 1)}`}>Back</Link>
              </Button>
              <Button className="px-12 border border-primary" asChild>
                <Link href={`/user/course/detail/${course?.id + 1}`}>Next</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
