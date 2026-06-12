import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),

        login: builder.mutation({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData,
            }),
        }),

        getAuthUser: builder.query({
            query: () => '/auth-user',
            providesTags: ['User'],
        })
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetAuthUserQuery } = authApi;