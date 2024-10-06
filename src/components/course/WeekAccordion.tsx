import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Course } from "@/Models/Course";
import { Week } from "@/Models/Week";
import Link from "next/link";
import { MdDescription } from 'react-icons/md';



const WeekAccordion = ({ id, title, description, courses }: Week) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="py-4">
        <AccordionTrigger className="text-xl text-primary">{title}</AccordionTrigger>
        <AccordionContent>
          <div className="md:px-2 pt-4 pb-6 flex flex-col gap-5">
            {courses.map((course: Course) => (
              <Link href={`/user/course/${course.id}`} key={course.id} className="flex justify-between hover:cursor-pointer group">
                <div className="flex gap-2 items-center">
                  <MdDescription />
                  <p className="text-[15px] group-hover:underline">{course.title}</p>
                </div>
                <p className="text-[15px]">{course.duration} mins</p>
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WeekAccordion;
