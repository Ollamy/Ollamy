import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/store';
import { EnvVar } from 'src/utils/loadEnv';

const baseQuery = fetchBaseQuery({
  baseUrl: EnvVar.backendUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('authentication', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  tagTypes: ['User', 'Course', 'Section', 'Lesson'],
  endpoints: () => ({}),
});
