import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


let baseUrl;
const { hostname } = window.location;
if (hostname === 'localhost' || hostname === '127.0.0.1') {
    baseUrl = "http://localhost:3001/api/v2";
} else {
    baseUrl = "https://dipronil-expense-app.onrender.com/api/v2";
}

export const expensesApi = createApi({
    reducerPath: 'expensesApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getExpenses: builder.query({
            query: () => ({
                url: '/expenses',
                method: 'GET'
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetExpensesQuery } = expensesApi