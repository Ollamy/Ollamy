import { api } from 'src/services/api';
import { CourseResponse } from 'src/services/course/course.dto';

export const courseApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCourseById: build.query<CourseResponse, string>({
			query: (id) => ({
				url: `/course/${id}`,
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'Course', id: result.id }] : [{ type: 'Course', id: 'LIST' }]),
		}),
		joinCourse: build.mutation<CourseResponse, string>({
			query: (id) => ({
				url: `/course/user/${id}`,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Course', id: 'LIST' }],
		}),
		getCourseSections: build.query<CourseResponse, string>({
			query: (id) => ({
				url: `/course/section/${id}`,
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'Course', id: result.id }] : [{ type: 'Course', id: 'LIST' }]),
		}),
	}),
});

export const { useGetCourseByIdQuery, useJoinCourseMutation, useGetCourseSectionsQuery } = courseApi;
