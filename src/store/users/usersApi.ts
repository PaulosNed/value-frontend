import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const userData = localStorage.getItem("user");
    //   const token = userData ? JSON.parse(userData)?.token : null;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/token/`,
        method: "POST",
        body: data,
      }),
    }),

    apply: builder.mutation<any, any>({
      query: (data) => ({
        url: `/users/apply/`,
        method: "POST",
        body: data,
      }),
    }),

    signup: builder.mutation<any, any>({
      query: (data) => ({
        url: `/users/register/`,
        method: "POST",
        body: data,
      }),
    }),

    getHighSchools: builder.query<{ name: string, id: number }[], void>({
      query: () => ({
        url: `/users/high-school/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useApplyMutation,
  useSignupMutation,
  useGetHighSchoolsQuery,
} = userApi;
