import { Week } from "@/Models/Week";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";


const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const session = await getSession();
      if (session) {
       const token = (session as any).accessToken as string; 
       headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllCourses: builder.query<any, void>({
      query: () => ({
        url: `/courses/`,
        method: "GET",
      }),
    }),

    getSingleCourses: builder.query<any, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
    }),

    getQuiz: builder.query<any, string>({
      query: (id) => ({
        url: `/courses/quiz/${id}`,
        method: "GET",
      }),
    }),

    
    getActivity: builder.query<any, string>({
      query: (id) => ({
        url: `/courses/activity/${id}`,
        method: "GET",
      }),
    }),    
  }),
});

export const {
    useGetAllCoursesQuery,
    useGetSingleCoursesQuery,
    useGetQuizQuery,
    useGetActivityQuery,
} = coursesApi;
