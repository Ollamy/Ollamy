import { api } from 'src/services/api';

export interface GetLessonQuestionsRequest {
	id: string;
	lessonId: string;
	title: string;
	description: string;
	typeAnswer: string;
	typeQuestion: string;
	order: number;
}

export const lessonApi = api.injectEndpoints({
	endpoints: (build) => ({
		getLessonQuestions: build.query<GetLessonQuestionsRequest[], { id: string }>({
			query: ({ id }) => ({
				url: `lesson/questions/${id}`,
				method: 'GET',
			}),
			providesTags: ['Lesson', 'Question'],
		}),
	}),
});

export const { useGetLessonQuestionsQuery } = lessonApi;
