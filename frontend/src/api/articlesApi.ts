import { baseApi } from "./baseApi";

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "/articles",
      providesTags: ["Article"],
    }),
    
    getArticleById: builder.query({
      query: (id) => `/articles/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Article", id }],
    }),

    createArticle: builder.mutation({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Article"],
    }),

    updateArticle: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Article", id }, "Article"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} = articlesApi;