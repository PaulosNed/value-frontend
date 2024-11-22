"use client";

import { Course } from "@/Models/Course";
import { useGetSingleCoursesQuery } from "@/store/courses/coursesApi";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/styles/RichTextStyles.module.css";

import parse from "html-react-parser";
import ErrorPage from "@/app/ErrorPage";

const Page = () => {
  const params = useParams<{ id: string }>();

  const {
    data: response,
    isLoading,
    isFetching,
    isError
  } = useGetSingleCoursesQuery(params.id);
  // console.log("weeks", weeks);
  if (isError) {
    return <ErrorPage />;
  }

  const course: Course = response?.data;

  return (
    <div className="w-full px-10 md:px-20 mt-10">
      {(isLoading || isFetching ) && (
        <div className="flex flex-col space-y-4 mt-3">
          <Skeleton className="h-[80px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[500px]" />
        </div>
      )}
      <div className={styles.richTextContent}>
        {!isLoading && !isFetching && (
          <>
            {parse(course.description)}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
