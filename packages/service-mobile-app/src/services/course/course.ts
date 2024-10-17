import { api } from 'src/services/api';
import type { CourseResponse, GetCourseHpResponse } from 'src/services/course/course.dto';
import type { SectionResponse } from 'src/services/section/section.dto';

export const courseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCourseById: build.query<CourseResponse, string>({
      query: (id) => ({
        url: `/course/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => (result ? [{ type: 'Course', id: result.id }] : [{ type: 'Course', id: 'LIST' }]),
    }),
    joinCourse: build.mutation<CourseResponse, { id?: string; code?: string }>({
      query: ({ id, code }) => ({
        url: `/course/join?${id ? `id=${id}` : ''}${code ? `code=${code}` : ''}`,
        body: { code },
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
    getCourseUserHp: build.query<GetCourseHpResponse, string>({
      query: (id) => ({
        url: `/course/${id}/user/hp`,
        method: 'GET',
      }),
      providesTags: ['HP'],
      forceRefetch: () => true,
    }),
  }),
});

export const { useGetCourseByIdQuery, useJoinCourseMutation, useGetCourseSectionsQuery, useGetCourseUserHpQuery } =
  courseApi;
