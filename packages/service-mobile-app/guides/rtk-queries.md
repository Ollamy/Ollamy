# Using Redux Toolkit Queries in a React Application - A Step-by-Step Guide

Redux Toolkit Queries is a powerful library for simplifying data fetching and caching in Redux applications. In this guide, we'll walk you through the process of integrating and using Redux Toolkit Queries in a React application.

## Table of Contents

1. [Installation](#1-installation)
2. [Setting up the API Slice](#2-setting-up-the-api-slice)
3. [Dispatching Queries in Components](#3-dispatching-queries-in-components)
4. [Caching and Invalidations](#4-caching-and-invalidations)
   1. [Providing cache tags](#41-providing-cache-tags)
5. [Handling Loading and Error States](#5-handling-loading-and-error-states)
6. [How to implement a new set of queries](#6-how-to-implement-a-new-set-of-queries)

---

## 1. Installation

Start by installing Redux Toolkit and Redux Toolkit Queries in your React project using npm or yarn:

```bash
npm install @reduxjs/toolkit react-redux @reduxjs/toolkit/query react-query
# or
yarn add @reduxjs/toolkit react-redux @reduxjs/toolkit/query react-query
```

## 2. Setting up the API Slice

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }), // Set your base URL here
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUsersQuery } = api;
export default api;
```

## 3. Dispatching Queries in Components

This is an example of a component that uses the `getUsers` endpoint. Redux automatically appends the `query` suffix to queries and the `mutation` suffix to mutations.
⚠️ This example is not safe and we will see [a safe example of rendering data](#5-handling-loading-and-error-states).

```js
// ExampleComponent.js
import React from 'react';
import { useGetUsersQuery } from './apiSlice';

const ExampleComponent = () => {
  const { data: usersData } = useGetUsersQuery();

  return (
    <div>
      {usersData.map((user) => (  // This is not safe
        <span>My name is {userData.firstname}</span>
      ))}
    </div>
  );
};

export default ExampleComponent;
```

## 4. Caching and Invalidations

Redux Toolkit Queries provides automatic caching of query results, which helps improve the performance of your application by reducing unnecessary network requests. This caching behavior is highly configurable, allowing you to customize how and when data is cached.

### 4.1 Providing Cache Tags

You can provide cache tags when defining your API endpoints. Cache tags are strings or objects that uniquely identify a piece of data. When the data associated with a tag changes, it can be used to invalidate the cache for that specific piece of data.

```js
builder.query({
  query: () => '/users',
  providesTags: ['User'], // Add a tag for caching
  invalidatesTags: [{ type: 'User' }], // Invalidate cache for this type after a successful update
});
```


## 5. Handling loading and error states

With Redux Toolkit Queries hooks, you also have access to more variables: `isFetching` and `error`. As you can expect, they give you real time information about your query and can be used for safe rendering.

```js
import React from 'react';
import { useGetUsersQuery } from './apiSlice';

const ExampleComponent = () => {
  const { data: usersData, error, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {usersData.map((user) => (
        <div key={user.id}>{user.firstname}</div>
      ))}
    </div>
  );
};

export default ExampleComponent;
```


## 6. How to implement a new set of queries

To implement a new set of queries and keep a clean and splitted architecture, create a new file in the `services/` folder, for example `auth.ts`, which will declare auth-related queries and mutations.

```js
import { api } from 'src/services/api';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
}

export const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation<User, RegisterRequest>({  // the first type in the generic is the return type of the query, the second one is the body type.
			query: (body) => ({
				url: '/user/register',
				body,
				method: 'POST',  // choose the method type here
			}),
			invalidatesTags: ['User'],  // for mutations, set the tags that will be invalidated on success
		}),
		getUser: build.query<User, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			providesTags: ['User'],  // for queries, set the tags that need to be invalidated to automatically refetch this query 
		}),
	}),
});

export const { useGetUserQuery, useLoginMutation, useRegisterMutation } = authApi;
```