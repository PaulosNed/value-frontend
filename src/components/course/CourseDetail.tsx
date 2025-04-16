import React from "react";
import { Skeleton } from "../ui/skeleton";
import styles from "@/styles/RichTextStyles.module.css";
import parse from "html-react-parser";

interface CourseDetailProps {
  isLoading?: boolean;
  isFetching?: boolean;
  course: any;
}

const CourseDetail: React.FC<CourseDetailProps> = ({
  isLoading = false,
  isFetching = false,
  course,
}) => {
  return (
    <>
      {(isLoading || isFetching) && (
        <div className="flex flex-col space-y-4 mt-3">
          <Skeleton className="h-[80px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[500px]" />
        </div>
      )}
      <div className={styles.richTextContent}>
        {!isLoading && !isFetching && <>{parse(course.description)}</>}
      </div>
    </>
  );
};

export default CourseDetail;
