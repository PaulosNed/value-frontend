import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  const courses = [
    {
      id: 1,
      title: "How to Research Universities",
    },
    {
      id: 2,
      title: "Understanding Scholarships",
    },
    {
      id: 3,
      title: "Understanding Admission Timelines",
    },
    {
      id: 4,
      title: "Building Your College List",
    },
    {
      id: 5,
      title: "How to Research Universities",
    },
  ];

  return (
    <div className="space-y-8">
      {courses?.map((course, idx) => (
        <div key={course.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>C{(idx + 1).toString()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{course.title}</p>
            <p className="text-sm text-muted-foreground">
              from WEEK 3: Navigating the Application Process
            </p>
          </div>
          {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
        </div>
      ))}
    </div>
  );
}
