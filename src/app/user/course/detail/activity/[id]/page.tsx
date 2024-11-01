"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useGetActivityQuery } from "@/store/courses/coursesApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface Activity {
  id: number;
  description: string;
  week: number;
}

const ActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useGetActivityQuery(id);

  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please add at least one file before submitting.",
      });
      return;
    }

    // Send API request to backend here
    console.log(selectedFiles);

    toast({
      variant: "default",
      title: "Activity Submitted successfully",
      description: "Please click Next to start the next week",
    });
    setSubmitted(true);
  };

  if (isError) {
    {
      console.log(error, isError);
      toast({
        variant: "destructive",
        title: "Unable to fetch Quiz",
        description: (error as any)?.data?.detail,
      });
    }
    return <div>Error</div>;
  }

  const activity: Activity = data?.data;

  //   const activity: Activity = {
  //     id: 1,
  //     description:
  //       "Please submit all your documents in the space provided. Please include your passport if you have it, transcripts, bank statements, recommendation letter, test scores, essay drafts, and a list of your extra curricular activities such as school clubs, volunteering, sports, music, art, writing..etc",
  //     week: 1,
  //   };

  return (
    <div className="w-full m-4 border px-20 flex flex-col py-8 gap-8">
      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[50px]" />
          <Skeleton className="h-[200px]" />
        </div>
      )}
      {!isLoading && !isFetching && (
        <div>
          <h1 className="text-center text-3xl font-bold mb-4">
            Week {activity.week} Activity
          </h1>
          <h1 className="mb-8">{activity.description}</h1>
          <div className="w-full max-w-lg">
            <input
              id="activityFiles"
              type="file"
              multiple
              className="text-primary file:bg-primary file:text-white rounded-md border h-12 file:h-12 mb-4"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant={submitted ? "outline" : "default"}
              onClick={handleSubmit}
              disabled={submitted}
              className="text-center mt-10 md:w-44 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Activity
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityPage;
