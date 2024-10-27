import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Todo'], // Add tagTypes here

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    getTodos: builder.query({
      query: (email) => `todos/email/${email}`,
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteAllTodo: builder.mutation({
      query: (email) => ({
        url: `todos/email/${email}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterUserMutation,
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useDeleteAllTodoMutation,
} = todoApi;
