import { Week } from "@/Models/Week";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = localStorage.getItem("access_token");
    //   headers.set("Authorization", `Bearer ${token}`);
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    getAllCourses: builder.query<Week[], string>({
      query: (accessToken) => ({
        url: `/courses/`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
      }),
    }),

    
  }),
});

export const {
    useGetAllCoursesQuery,
} = coursesApi;
