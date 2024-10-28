import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Course } from "@/Models/Course";
import { Week } from "@/Models/Week";
import Link from "next/link";
import { MdDescription } from "react-icons/md";

const WeekAccordion = ({
  id,
  title,
  count,
  description,
  courses,
  currCourseId,
}: Week) => {

  console.log("in week accordion", id)
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="py-4 text-start">
        <AccordionTrigger className="text-xl text-primary ">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="md:px-2 pt-4 pb-6 flex flex-col gap-5">
            {courses.map((course: Course) => (
              <Link
                href={`/user/course/detail/${course.id}`}
                key={course.id}
                className="flex justify-between hover:cursor-pointer hover:text-blue-700 group"
              >
                <div className="flex gap-2 items-center">
                  <MdDescription />
                  <p className="text-[15px] group-hover:underline">
                    {course.title}
                  </p>
                </div>
                <p className="text-[15px]">{course.duration} mins</p>
              </Link>
            ))}

            {/* Current week's quiz */}
            <Link
              href={`/user/course/detail/quiz/${id}`}
              className="flex justify-between hover:cursor-pointer hover:text-blue-700 group"
            >
              <div className="flex gap-2 items-center">
                <MdDescription />
                <p className="text-[15px] group-hover:underline">
                  Week {count} Quiz
                </p>
              </div>
              <p className="text-[15px]"></p>
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WeekAccordion;
