import { mainApi } from "../../app/mainApi";

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data
      })
    }),


    register: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        body: data
      })
    }),


    updateUser: builder.mutation({
      query: (q) => ({
        url: '/users/update',
        method: 'PATCH',
        body: q.data,
        headers: {
          Authorization: q.token
        }
      }),
      invalidatesTags: ['User']
    }),
    getUser: builder.query({
      query: (token) => ({
        url: '/users/me',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),




  })

});



export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation, useGetUserQuery } = authApi;