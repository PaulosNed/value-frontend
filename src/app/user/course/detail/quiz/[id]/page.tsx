"use client";

import ErrorPage from "@/app/ErrorPage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useGetQuizQuery } from "@/store/courses/coursesApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface Choice {
  id: number;
  description: string;
  is_correct: boolean;
  question: number;
}

interface Question {
  description: string;
  choices: Choice[];
}

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useGetQuizQuery(id);

  const [selectedChoices, setSelectedChoices] = useState<{
    [key: number]: number;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (isError) {
    return <ErrorPage />;
  }

  const questions: Question[] = data?.data;

  const handleChoiceChange = (questionIndex: number, choiceId: number) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [questionIndex]: choiceId,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      const selectedChoiceId = selectedChoices[index];
      const selectedChoice = question.choices.find(
        (choice) => choice.id === selectedChoiceId
      );
      if (selectedChoice && selectedChoice.is_correct) {
        newScore += 1; // Increment score if the selected choice is correct
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="md:w-10/12 mx-auto border px-20 flex flex-col py-8 gap-8">
      <p className="text-3xl font-semibold mb-6">Weekly Quiz</p>
      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      )}
      {!isLoading &&
        !isFetching &&
        questions.map((question, index) => (
          <div key={index} className="">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {question.description}
            </h3>
            <ul className="space-y-2">
              {question.choices.map((choice) => {
                const isSelected = selectedChoices[index] === choice.id;
                const isCorrect = choice.is_correct;
                const isSubmitted = submitted;
                let choiceClass = "text-gray-700";

                if (isSubmitted) {
                  if (isSelected && isCorrect) {
                    choiceClass = "text-green-500"; // Selected and correct
                  } else if (isSelected && !isCorrect) {
                    choiceClass = "text-red-500"; // Selected but incorrect
                  } else if (!isSelected && isCorrect) {
                    choiceClass = "text-green-500"; // Correct but not selected
                  }
                }

                return (
                  <li key={choice.id} className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id={`choice-${choice.id}`}
                      name={`question-${index}`}
                      value={choice.id}
                      checked={isSelected}
                      onChange={() => handleChoiceChange(index, choice.id)}
                      className="radio-input"
                    />
                    <label
                      htmlFor={`choice-${choice.id}`}
                      className={`cursor-pointer ${choiceClass}`}
                    >
                      {choice.description}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

      {!submitted && (
        <Button
          variant={submitted ? "outline" : "default"}
          onClick={handleSubmit}
          // className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Finish Quiz
        </Button>
      )}

      {/* Show score and Next button after submission */}
      {submitted && (
        <div className="mt-4">
          <p className="text-lg font-semibold text-primary">
            {`You scored ${score} out of ${questions.length}. please click the
            "Next" button to continue to this week's activity`}
          </p>
        </div>
      )}
      {/* <div className="h-4"></div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          className="px-12 border border-primary"
          asChild
        >
          <Link
            href={"/user/course/detail/1"}
            //   href={`/user/course/detail/${Math.max(1, course?.id - 1)}`}
          >
            Back
          </Link>
        </Button>
        <Button
          className="px-12 border border-primary"
          // onClick={NavigateToNextPage}
        >
          <Link
            href={"/user/course/detail/1"}
            // href={`/user/course/detail/${course?.id + 1}`}
          >
            Next
          </Link>
        </Button>
      </div> */}
    </div>
  );
};

export default QuizPage;
