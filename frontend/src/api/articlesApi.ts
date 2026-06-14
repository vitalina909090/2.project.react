import type { ArticlesResponse, ArticleResponse, ArticleFormData } from "./articles.types";
import { baseApi } from "./baseApi";


export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, void>({
      query: () => "/articles",
      providesTags: ["Article"],
    }),
    
    getArticleById: builder.query<ArticleResponse, number>({
      query: (id) => `/articles/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Article", id }],
    }),

    createArticle: builder.mutation<ArticleResponse, ArticleFormData>({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Article"],
    }),

    updateArticle: builder.mutation<ArticleResponse, ArticleFormData & { id: number } >({
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