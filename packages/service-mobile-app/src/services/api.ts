import type { RootState } from 'src/store';
import { EnvVar } from 'src/utils/loadEnv';

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

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

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
	baseQuery: baseQueryWithRetry,
	tagTypes: ['User', 'Course'],
	endpoints: () => ({}),
});
