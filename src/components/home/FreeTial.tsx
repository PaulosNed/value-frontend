"use client";

import { useGetDemoCoursesQuery } from "@/store/users/usersApi";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import CourseDetail from "../course/CourseDetail";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRouter } from "next/navigation";

const FreeTrial = () => {
  const { data, isLoading, isFetching } = useGetDemoCoursesQuery();
  const router = useRouter();
  const demoCourses = {
    ...data?.data,
    courses: data?.data?.courses?.slice(0, 3),
  };
  const [idx, setIdx] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const handleNext = () => {
    if (idx >= (demoCourses?.courses?.length ?? 0) - 1) {
      setShowDialog(true);
    } else {
      setIdx((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {isLoading && <Skeleton className="w-1/2 mx-auto h-20" />}
      {!isLoading && (
        <h1 className="text-3xl font-bold">
          Here is a glimpse of what we offer
        </h1>
      )}
      {!isLoading && (
        <p className="text-lg font-[200]">
          Explore a selection of our courses designed to kickstart your journey
          toward studying abroad. Here are some of the courses from the first
          week of camp which focuses on{" "}
          <span className="font-medium">{demoCourses.title}</span>.
          {demoCourses.description}
        </p>
      )}
      <div className="mt-12 flex flex-col md:flex-row justify-center gap-16">
        <div className="relative bg-neutral-50 shadow-md rounded-lg w-[80vw] h-[500px] mx-auto">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <ScrollArea className="absolute top-0 left-0 h-[500px]">
              <div className="w-9/12 mx-auto py-10">
                <CourseDetail
                  isLoading={isLoading}
                  isFetching={isFetching}
                  course={(demoCourses?.courses ?? [])[idx] || []}
                />
              </div>
            </ScrollArea>
          )}
          {!isLoading && (
            <div className="absolute bottom-0 h-20 z-20 my-auto px-10 w-full flex justify-between">
              <Button
                disabled={idx < 1}
                onClick={() => setIdx((prev) => prev - 1)}
                className="rounded-full w-14 h-14"
              >
                <ChevronLeft />
              </Button>
              <Button onClick={handleNext} className="rounded-full w-14 h-14">
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Dialog for full course application */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-0 shadow-xl">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
              <Rocket className="h-6 w-6 text-blue-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Ready to Launch Your Journey?
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              {"You've"} completed the free trial. Now take the next step
              towards your dream of studying abroad with our full course!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="gap-2">
              <h3 className="font-semibold text-lg text-center mb-4">
                What {"you'll"} get:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Full course access
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Expert guidance
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Personalized support
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Study materials
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Progress tracking
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Certificate of completion
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="mt-6 mb-2">
            <div className="w-full flex flex-col gap-3">
              <Button
                variant={"default"}
                onClick={() => {
                  // Handle application logic here
                  router.push("/apply");
                }}
                className="w-full py-6 font-medium shadow-lg"
              >
                Apply for Full Course
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="w-full py-5 outline outline-1 outline-neutral-300 font-medium bg-transparent hover:bg-transparent"
              >
                Maybe Later
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FreeTrial;
