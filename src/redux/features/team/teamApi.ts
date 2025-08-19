import { templateApi } from "@/redux/api/baseApi";

const TeamApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddTeam: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/team/create",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleFindTeam: builder.query<any, any>({
      query: ({ page = 1, limit = 10, search = "" }) => {
        return {
          url: "/team/",
          method: "GET",
          params: { page: page, limit: limit, name: search },
        };
      },
    }),
    handleFindSingleTeam: builder.query<any, any>({
      query: (slug) => {
        return {
          url: `/team/${slug}`,
          method: "GET",
        };
      },
    }),
    handleDeleteTeam: builder.mutation<any, any>({
      query: (TeamMemberId) => {
        return {
          url: `/team/${TeamMemberId}`,
          method: "DELETE",
        };
      },
    }),
    handleUpdateTeam: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `/team/${payload.id}`,
          method: "PUT",
          body: { ...payload },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleAddTeamMutation,
  useHandleDeleteTeamMutation,
  useHandleFindTeamQuery,
  useHandleFindSingleTeamQuery,
  useHandleUpdateTeamMutation,
} = TeamApi;
