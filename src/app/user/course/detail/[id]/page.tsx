"use client";

import { Course } from "@/Models/Course";
import { useGetSingleCoursesQuery } from "@/store/courses/coursesApi";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/styles/RichTextStyles.module.css";

import parse from "html-react-parser";
import ErrorPage from "@/app/ErrorPage";
import CourseDetail from "@/components/course/CourseDetail";

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
      <CourseDetail isLoading={isLoading} isFetching={isFetching} course={course} />
    </div>
  );
};

export default Page;
