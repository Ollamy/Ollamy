import { api } from 'src/services/api';
import { GetUserResponse } from 'src/services/user/user.dto';

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query<GetUserResponse, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
	}),
});

export const { useGetUserQuery } = userApi;
