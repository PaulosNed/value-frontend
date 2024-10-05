import { Course } from "./Course";

export type Week = {
    id: string;
    title: string;
    description: string;
    courses: Course[];
}