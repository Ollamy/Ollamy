import { api } from 'src/services/api';
import { CourseResponse } from 'src/services/course/course.dto';

export const courseApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCourseById: build.query<CourseResponse, string>({
			query: (id) => ({
				url: `/course/${id}`,
				method: 'GET',
			}),
			providesTags: (result) => result ? [{ type: 'Course', id: result.id }] : [{ type: 'Course', id: 'LIST' }],
		}),
		joinCourse: build.mutation<CourseResponse, string>({
			query: (id) => ({
				url: `/course/${id}/join`,
				method: 'POST',
			}),
		}),
	}),
});

export const { useGetCourseByIdQuery } = courseApi;
