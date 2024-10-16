import { api } from 'src/services/api';

import type {
  GetAnswerRequest,
  GetQuestionResponse,
  ValidateAnswerRequest,
  ValidateAnswerResponse,
} from './question.dto';

export const lessonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestion: build.query<GetQuestionResponse, { id: string }>({
      query: ({ id }) => ({
        url: `question/${id}`,
        method: 'GET',
      }),
      transformResponse: (data: GetQuestionResponse, _, { id }) => ({
        ...data,
        id,
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
      invalidatesTags: ['User', 'HP', 'Course'],
    }),
  }),
});

export const { useGetAnswerQuery, useValidateAnswerMutation, useGetQuestionQuery } = lessonApi;
