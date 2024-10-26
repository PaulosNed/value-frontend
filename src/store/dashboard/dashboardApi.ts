import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";


const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
    getDashboardData: builder.query<any, void>({
      query: () => ({
        url: `/dashboard/`,
        method: "GET",
      }),
    }),

    
  }),
});

export const {
    useGetDashboardDataQuery,
} = dashboardApi;
