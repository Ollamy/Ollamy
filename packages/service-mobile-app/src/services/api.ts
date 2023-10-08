import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { RootState } from 'src/store';
import { EnvVar } from 'src/utils/loadEnv';

const baseQuery = fetchBaseQuery({
	baseUrl: EnvVar.backendUrl,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set('authentication', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
	baseQuery: baseQueryWithRetry,
	tagTypes: ['User'],
	endpoints: () => ({}),
});
