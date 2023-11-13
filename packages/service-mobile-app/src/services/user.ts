import { api } from 'src/services/api';

export interface GetUserRequest {
	firstname: string;
	lastname: string;
	email: string;
}

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query<GetUserRequest, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
	}),
});

export const { useGetUserQuery } = userApi;
