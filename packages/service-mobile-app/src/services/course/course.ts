import { api } from 'src/services/api';
import { CourseResponse } from 'src/services/course/course.dto';
import { SectionResponse } from 'src/services/section/section.dto';

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
				url: `/course/${id}/user`,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Course', id: 'LIST' }],
		}),
		getCourseSections: build.query<SectionResponse[], string>({
			query: (id) => ({
				url: `/course/${id}/sections`,
				method: 'GET',
			}),
			providesTags: (result, _err, arg) => (result ? [{ type: 'Course', id: arg }] : [{ type: 'Course', id: 'LIST' }]),
		}),
	}),
});

export const { useGetCourseByIdQuery, useJoinCourseMutation, useGetCourseSectionsQuery } = courseApi;
