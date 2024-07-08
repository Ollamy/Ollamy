import { api } from 'src/services/api';
import { CreateSessionResponse, GetSessionResponse, ValidateQuestionSessionRequest, ValidateQuestionSessionResponse } from './session.dto';

export const sessionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSession: build.query<GetSessionResponse, string>({
      query: (id) => ({
        url: `/session/${id}`,
        method: 'GET',
      }),
      providesTags: (resp, err, id) => [{ type: 'Session', id: id }],
    }),
    createSession: build.mutation<CreateSessionResponse, string>({
      query: (id) => ({
        url: `/session/create/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Session', id: 'LIST' }],
    }),
    validateQuestion: build.mutation<ValidateQuestionSessionResponse, ValidateQuestionSessionRequest>({
      query: (arg) => ({
        url: `/session/validate-question/${arg.sessionId}`,
        body: arg.body,
        method: 'POST',
      }),
      invalidatesTags: (resp, err, arg) => [{ type: 'HP' }, { type: 'Statistic' }],
    }),
  }),
});

export const { useValidateQuestionMutation, useCreateSessionMutation, useGetSessionQuery } = sessionApi;
