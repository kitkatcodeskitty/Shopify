

// export const base = 'http://192.168.1.116:5000';
// export const baseUrl = 'http://192.168.1.116:5000/api';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use environment variables with fallback for development
export const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: 'include' }),
  endpoints: (builder) => ({})
});

