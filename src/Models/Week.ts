import { Course } from "./Course";

export type Week = {
    id: number;
    title: string;
    count: number;
    description: string;
    courses: Course[];
    currCourseId?: string;
}