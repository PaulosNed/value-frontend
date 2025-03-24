import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Course } from "@/Models/Course";
import Link from "next/link";

interface RecentSalesProps {
  courses: any[];
}

export function RecentSales({ courses }: RecentSalesProps) {

  return (
    <div className="space-y-8">
      {courses?.map((course, idx) => (
        <Link href={`/user/course/detail/${course.id}`} key={idx} className="flex items-center hover:cursor-pointer">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback className="uppercase">{course.title.slice(0,2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{course.title}</p>
            <p className="text-sm text-muted-foreground">
              from {course.week}
            </p>
          </div>
          {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
        </Link>
      ))}
    </div>
  );
}
