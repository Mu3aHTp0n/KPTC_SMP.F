import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_HOST }),
	endpoints: () => ({}),
});