import { mainApi } from "../../app/mainApi";




export const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),

    getProducts: builder.query({
      query: (query) => ({
        url: '/products',
        method: 'GET',
        params: query
      }),
      providesTags: ['Product']
    }),

    createProduct: builder.mutation({
      query: (q) => ({
        url: '/products',
        method: 'POST',
        // headers: {
        //   Authorization: q.token
        // },
        body: q.data
      }),
      invalidatesTags: ['Product']
    }),

    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'PATCH',
        // headers: {
        //   Authorization: q.token
        // },
        body: q.data
      }),
      invalidatesTags: ['Product']
    }),

    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'DELETE',
        // headers: {
        //   Authorization: q.token
        // }
      }),
      invalidatesTags: ['Product']
    }),


  })

});


export const { useGetProductsQuery, useCreateProductMutation, useRemoveProductMutation, useGetProductQuery, useUpdateProductMutation } = productApi;