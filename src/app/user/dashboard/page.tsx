"use client";

import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { FaCheckCircle } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaDotCircle } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { useGetDashboardDataQuery } from "@/store/dashboard/dashboardApi";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "@/Models/Course";

export default function DashboardPage() {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetDashboardDataQuery();

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-12 gap-5 px-10 md:mt-32">
        <Skeleton className="col-span-3 h-[200px]" />
        <Skeleton className="col-span-3 h-[200px]" />
        <Skeleton className="col-span-3 h-[200px]" />
        <Skeleton className="col-span-3 h-[200px]" />
        <Skeleton className="col-span-7 h-[500px]" />
        <Skeleton className="col-span-5 h-[500px]" />
      </div>
    );
  }

  if (isError) {
    {
      console.log(error, isError);
      toast({
        variant: "destructive",
        title: "Unable to fetch Dashboard",
        description: (error as any)?.data?.detail,
      });
    }
    return <div>Error</div>;
  }

  const dashboardData = response?.data;
  const chartData = response?.chart_data;
  const recentCourses: Course[] = response?.recent_courses;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        {/* <div className="border-b">
          <div className="flex h-16 items-center px-4">
            
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div> */}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            {/* <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div> */}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Weeks Completed
                    </CardTitle>
                    <FaCheckCircle className="text-slate-500" size={22} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${dashboardData.weeks_completed} Weeks`}</div>
                    <p className="text-xs text-muted-foreground">
                      {`you have completed ${
                        (dashboardData.weeks_completed / 4) * 100
                      }% of the course`}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Weeks Remaining
                    </CardTitle>
                    <FaHourglassHalf className="text-slate-500" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`${dashboardData.weeks_remaining} Weeks`}</div>
                    <p className="text-xs text-muted-foreground">
                      {`${
                        (dashboardData.weeks_remaining / 4) * 100
                      }% of the course has not been covered yet`}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Week
                    </CardTitle>
                    <FaDotCircle className="text-slate-500" size={22} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{`Week ${dashboardData.current_week.count}`}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardData.current_week.title}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Course
                    </CardTitle>
                    <AiFillPlayCircle className="text-slate-500" size={24} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {dashboardData.current_course.title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {`Course number ${dashboardData.current_course.count} from ${dashboardData.current_week.title}`}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Consistency Tracker</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={chartData} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Courses</CardTitle>
                    <CardDescription>
                      Here are the courses you have recently completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales courses={recentCourses} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
