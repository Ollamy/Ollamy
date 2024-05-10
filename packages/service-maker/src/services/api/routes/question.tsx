import { UseQueryOptions, useMutation, useQuery } from 'react-query';
import {
  GetQuestionRequest,
  QuestionApi,
  QuestionModel,
} from 'services/api/out';
import { queryClient } from 'main';
import { GET_LESSON_QUESTION_KEY } from 'services/api/routes/lesson';

const GET_QUESTION_KEY = 'getQuestion';

export const questionActions = {
  useQuestion: (
    requestParameters: GetQuestionRequest,
    config?: UseQueryOptions<QuestionModel>,
  ) =>
    useQuery({
      queryKey: [GET_QUESTION_KEY, requestParameters.id],
      queryFn: () => QuestionApi.getQuestion(requestParameters),
      ...config,
    }),
  useCreateQuestion: () =>
    useMutation(QuestionApi.registerQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_QUESTION_KEY);
      },
    }),
  useUpdateQuestion: () =>
    useMutation(QuestionApi.updateQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUESTION_KEY);
        queryClient.invalidateQueries(GET_LESSON_QUESTION_KEY);
      },
    }),
  useRemoveQuestion: () =>
    useMutation(QuestionApi.deleteQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUESTION_KEY);
        queryClient.invalidateQueries(GET_LESSON_QUESTION_KEY);
      },
    }),
};
