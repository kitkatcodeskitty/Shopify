import { mainApi } from "../../app/mainApi";



export const orderApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET'
      }),
      providesTags: ['Order']
    }),


    getOrders: builder.query({
      query: (token) => ({
        url: '/orders',
        headers: {
          Authorization: token
        },
        method: 'GET'
      }),
      providesTags: ['Order']
    }),

    createOrder: builder.mutation({
      query: (q) => ({
        url: '/orders',
        method: 'POST',
        headers: {
          Authorization: q.token
        },
        body: q.data
      }),
      invalidatesTags: ['Order']
    }),


  })

});


export const { useGetOrdersQuery, useCreateOrderMutation, useGetOrderQuery } = orderApi;