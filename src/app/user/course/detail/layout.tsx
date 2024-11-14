/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import WeekAccordion from "@/components/course/WeekAccordion";
import { toast } from "@/components/ui/use-toast";
import { Course } from "@/Models/Course";
import { Week } from "@/Models/Week";
import { useGetAllCoursesQuery } from "@/store/courses/coursesApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementPage,
  incrementPage,
} from "@/store/navigation/navigationSlice";
import { useSetDashboardDataMutation } from "@/store/dashboard/dashboardApi";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorPage from "@/app/ErrorPage";

import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from 'react-icons/ai';

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
    return <ErrorPage />;
  }

  const weeks: Week[] = response?.data;
  const [pageOrder, setPageOrder] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPage = useSelector((state: any) => state.navigation.currentPage);
  const [collapsed, setCollapsed] = useState(true);

  const [setDashboardData, { data, isLoading: settingDashboard }] =
    useSetDashboardDataMutation();

  const pathname = usePathname();

  useEffect(() => {
    let order: string[] = [];
    weeks?.map((week: Week) => {
      const courses: Course[] = week.courses;
      courses?.map((course: Course) => {
        order.push(`/user/course/detail/${course.id}`);
      });
      order.push(`/user/course/detail/quiz/${week.id}`);
      order.push(`/user/course/detail/activity/${week.id}`);
    });
    console.log("order from useEffect", order);
    setPageOrder(order);
  }, [weeks]);

  const NavigateToPreviousPage = () => {
    const updatedPage = Math.max(0, currentPage - 1);
    dispatch(decrementPage());
    router.push(pageOrder[updatedPage]);
  };

  const NavigateToNextPage = async () => {
    const pathList = pathname.split("/");
    const courseId = pathList[pathList.length - 1];
    console.log("courseID", courseId);

    if (pathList.length === 5) {
      const response: any = await setDashboardData({ id: courseId });
      console.log("sent request to api", response.message);
    }

    const maxPage = pageOrder.length - 1;
    const updatedPage = Math.min(maxPage, currentPage + 1);
    dispatch(incrementPage({ maxPage }));
    router.push(pageOrder[updatedPage]);
  };

  return (
    <div className="flex">
      {/* Nav section */}
      <div className="hidden md:block z-10 w-4/12 px-10 bg-gray-50 rounded-r-md">
        {/* Add side nav */}
        {weeks?.length !== 0 &&
          weeks?.map((week: Week) => (
            <WeekAccordion
              key={week.id}
              id={week.id}
              count={week.count}
              title={week.title}
              description={week.description}
              courses={week.courses}
              pageOrder={pageOrder}
              collapsed={false}
              setCollapsed={() => {}}
            />
          ))}
      </div>

      <div
        className={`${
          collapsed ? "hidden" : "fixed top-16 left-0 h-screen md:hidden"
        } z-30 w-full shadow-custom-blue-lg pl-5 pr-16 bg-gray-50 rounded-r-md`}
      >
        {/* Add side nav */}
        {weeks?.length !== 0 &&
          weeks?.map((week: Week) => (
            <WeekAccordion
              key={week.id}
              id={week.id}
              count={week.count}
              title={week.title}
              description={week.description}
              courses={week.courses}
              pageOrder={pageOrder}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          ))}
      </div>

      <div
        className={`fixed md:hidden z-40 top-20 ${collapsed ? "left-4" : "right-4"}`}
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
      >
        {collapsed ? <HiMenu size={24} /> : <AiOutlineClose size={24} />}
      </div>

      {/* Body */}
      <div className="w-full md:w-8/12">
        <div className="w-full">
          {settingDashboard && <Skeleton className="w-full h-full" />}
          {!settingDashboard && children}
        </div>
        <div className="px-10 md:px-20 mt-20 flex justify-between">
          <Button
            variant="outline"
            className="px-12 border border-primary"
            onClick={NavigateToPreviousPage}
          >
            Back
          </Button>
          <Button
            className="px-12 border border-primary"
            onClick={NavigateToNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
