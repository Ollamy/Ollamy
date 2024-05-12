import { api } from 'src/services/api';
import type {
  GetLessonLectureRequest,
  GetLessonQuestionsRequest,
  LessonResponse,
} from 'src/services/lesson/lesson.dto';

export const lessonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLessonById: build.query<LessonResponse, string>({
      query: (id) => ({
        url: `/lesson/${id}`,
        method: 'GET',
      }),
      providesTags: (result, _error, id) => (result ? [{ type: 'Lesson', id }] : [{ type: 'Lesson', id: 'LIST' }]),
    }),
    joinLesson: build.mutation<unknown, string>({
      query: (id) => ({
        url: `/lesson/${id}/join`,
        method: 'POST',
      }),
    }),
    getLessonQuestions: build.query<GetLessonQuestionsRequest[], { id: string }>({
      query: ({ id }) => ({
        url: `lesson/questions/${id}`,
        method: 'GET',
      }),
      providesTags: ['Lesson', 'Question'],
    }),
    getLessonLecture: build.query<GetLessonLectureRequest, { id: string }>({
      query: ({ id }) => ({
        url: `lesson/lecture/${id}`,
        method: 'GET',
      }),
      providesTags: ['Lesson', 'lecture'],
    }),
  }),
});

export const { useGetLessonByIdQuery, useJoinLessonMutation, useGetLessonQuestionsQuery, useGetLessonLectureQuery } =
  lessonApi;
