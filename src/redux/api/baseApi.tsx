import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const baseApi = "https://modnity-server.vercel.app/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: baseApi,
  credentials: "include",
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Review"],
  endpoints: () => ({}),
});
