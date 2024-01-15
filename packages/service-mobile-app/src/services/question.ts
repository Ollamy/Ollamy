import { api } from 'src/services/api';

export interface GetQuestionResponse {
	id: string;
	lessonId: string;
	title: string;
	description: string;
	typeAnswer: 'TEXT';
	typeQuestion: 'TEXT';
	trustAnswerId: string;
	pictureId?: string;
	difficulty?: string;
	order: number;
}

export interface GetAnswerRequest {
	id: string;
	questionId: string;
	data?: string;
	picture?: string;
}

export interface ValidateAnswerRequest {
	questionId: string;
	answerId: string;
}

export interface ValidateAnswerResponse {
	success: boolean;
	answer: string;
	end: boolean;
	nextQuestionId?: string | undefined;
}

export const lessonApi = api.injectEndpoints({
	endpoints: (build) => ({
		getQuestion: build.query<GetQuestionResponse, { id: string }>({
			query: ({ id }) => ({
				url: `question/${id}`,
				method: 'GET',
			}),
			providesTags: ['Question'],
		}),
		getAnswer: build.query<GetAnswerRequest[], { id: string }>({
			query: ({ id }) => ({
				url: `question/${id}/answers`,
				method: 'GET',
			}),
			providesTags: ['Question'],
		}),
		validateAnswer: build.mutation<ValidateAnswerResponse, ValidateAnswerRequest>({
			query: (body) => ({
				url: 'question/validate',
				body,
				method: 'POST',
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useGetAnswerQuery, useValidateAnswerMutation, useGetQuestionQuery } = lessonApi;
