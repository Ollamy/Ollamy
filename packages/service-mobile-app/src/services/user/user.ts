import { api } from 'src/services/api';
import { GetUserCoursesResponse, GetUserResponse } from 'src/services/user/user.dto';

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query<GetUserResponse, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
		getUserCourses: build.query<GetUserCoursesResponse, void>({
			query: () => ({
				url: '/user/courses',
				method: 'GET',
			}),
			providesTags: ['Course'],
		}),
	}),
});

export const { useGetUserQuery, useGetUserCoursesQuery } = userApi;
