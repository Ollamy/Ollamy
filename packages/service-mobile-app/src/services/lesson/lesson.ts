import { api } from 'src/services/api';
import { LessonResponse } from 'src/services/lesson/lesson.dto';

export const lessonApi = api.injectEndpoints({
	endpoints: (build) => ({
		getLessonById: build.query<LessonResponse, string>({
			query: (id) => ({
				url: `/lesson/${id}`,
				method: 'GET',
			}),
			providesTags: (result, _error, id) => (result ? [{ type: 'Lesson', id }] : [{ type: 'Lesson', id: 'LIST' }]),
		}),
	}),
});

export const { useGetLessonByIdQuery } = lessonApi;
