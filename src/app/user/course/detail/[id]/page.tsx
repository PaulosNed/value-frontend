"use client";

import { toast } from "@/components/ui/use-toast";
import { Course } from "@/Models/Course";
import { useGetSingleCoursesQuery } from "@/store/courses/coursesApi";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/styles/RichTextStyles.module.css";

import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSetDashboardDataMutation } from "@/store/dashboard/dashboardApi";
import ErrorPage from "@/app/ErrorPage";

const Page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetSingleCoursesQuery(params.id);

  const [setDashboardData, { data, isLoading: settingDashboard }] =
    useSetDashboardDataMutation();

  // console.log("weeks", weeks);
  if (isError) {
    return <ErrorPage />;
  }

  const course: Course = response?.data;

  async function NavigateToNextPage(
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    const response: any = await setDashboardData({ course: course });
    console.log("sent request to api", response.message);
    router.push(`/user/course/detail/${course?.id + 1}`);
  }

  return (
    <div className="w-full px-10 md:px-20 mt-10">
      {(isLoading || isFetching || settingDashboard) && (
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
            {/* <div className="h-4"></div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="px-12 border border-primary"
                asChild
              >
                <Link
                  href={`/user/course/detail/${Math.max(1, course?.id - 1)}`}
                >
                  Back
                </Link>
              </Button>
              <Button
                className="px-12 border border-primary"
                onClick={NavigateToNextPage}
              >
                <Link href={`/user/course/detail/${course?.id + 1}`}>Next</Link>
              </Button>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
