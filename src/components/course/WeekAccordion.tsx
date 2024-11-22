"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Course } from "@/Models/Course";
import { Week } from "@/Models/Week";
import { setCurrentPage } from "@/store/navigation/navigationSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdAccessTime, MdDescription } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

type WeekAccordionProps = {
  id: number;
  title: string;
  count: number;
  description: string;
  courses: Course[];
  currCourseId?: string;
  pageOrder: string[];
  collapsed: boolean;
  setCollapsed: any;
};
const WeekAccordion = ({
  id,
  title,
  count,
  description,
  courses,
  currCourseId,
  pageOrder,
  collapsed,
  setCollapsed,
}: WeekAccordionProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPage = useSelector((state: any) => state.navigation.currentPage);

  console.log("in week accordion", id);
  const navigateToCourse = (url: string): void => {
    const updatedIdx = pageOrder.indexOf(url);
    dispatch(setCurrentPage(updatedIdx));
    router.push(url);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="py-4 text-start">
        <AccordionTrigger className="text-xl text-primary ">
          Week {count}: {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="md:px-2 pt-4 pb-6 flex flex-col gap-5">
            {courses.map((course: Course) => (
              <div
                onClick={(e) => {
                  navigateToCourse(`/user/course/detail/${course.id}`);
                  setCollapsed(true);
                }}
                key={course.id}
                className={`grid grid-cols-12 hover:cursor-pointer hover:text-blue-700 group ${
                  pageOrder.indexOf(`/user/course/detail/${course.id}`) ===
                  currentPage
                    ? "text-blue-700 underline font-semibold"
                    : ""
                }`}
              >
                <div className="col-span-10 flex gap-2 items-center">
                  <MdDescription />
                  <p className="text-md group-hover:underline">
                    {course.title}
                  </p>
                </div>
                <div className="col-span-2 text-md flex items-center gap-1">
                  {course.duration} mins
                </div>
              </div>
            ))}

            {/* Current week's quiz */}
            <div
              onClick={(e) =>
                navigateToCourse(`/user/course/detail/quiz/${id}`)
              }
              className={`flex justify-between hover:cursor-pointer hover:text-blue-700 group ${
                pageOrder.indexOf(`/user/course/detail/quiz/${id}`) ===
                currentPage
                  ? "text-blue-700 underline font-semibold"
                  : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <MdDescription />
                <p className="text-md group-hover:underline">
                  Week {count} Quiz
                </p>
              </div>
              <p className="text-md"></p>
            </div>

            {/* Current week's activity */}
            <div
              onClick={(e) =>
                navigateToCourse(`/user/course/detail/activity/${id}`)
              }
              className={`flex justify-between hover:cursor-pointer hover:text-blue-700 group ${
                pageOrder.indexOf(`/user/course/detail/activity/${id}`) ===
                currentPage
                  ? "text-blue-700 underline font-semibold"
                  : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <MdDescription />
                <p className="text-md group-hover:underline">
                  Week {count} Activity
                </p>
              </div>
              <p className="text-md"></p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WeekAccordion;
