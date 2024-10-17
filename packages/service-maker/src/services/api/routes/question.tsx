import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'main';
import type {
  GetQuestionAnswersRequest,
  GetQuestionModel,
  GetQuestionRequest,
  QuestionAnswerModel,
} from 'services/api/out';
import { QuestionApi } from 'services/api/out';
import { GET_LESSON_QUESTIONS_KEY } from 'services/api/routes/lesson';

const GET_QUESTION_KEY = 'getQuestionKey';
export const GET_QUESTION_ANSWERS_KEY = 'getQuestionAnswersKey';

export const questionActions = {
  useQuestion: (
    requestParameters: GetQuestionRequest,
    config?: UseQueryOptions<GetQuestionModel>,
  ) =>
    useQuery({
      queryKey: [GET_QUESTION_KEY, requestParameters.id],
      queryFn: () => QuestionApi.getQuestion(requestParameters),
      ...config,
    }),
  useCreateQuestion: () =>
    useMutation(QuestionApi.registerQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_QUESTIONS_KEY);
      },
    }),
  useUpdateQuestion: () =>
    useMutation(QuestionApi.updateQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUESTION_KEY);
        queryClient.invalidateQueries(GET_LESSON_QUESTIONS_KEY);
      },
    }),
  useGetQuestionAnswers: (
    requestParameters: GetQuestionAnswersRequest,
    config?: UseQueryOptions<QuestionAnswerModel[]>,
  ) =>
    useQuery({
      queryKey: [GET_QUESTION_ANSWERS_KEY, requestParameters.id],
      queryFn: () => QuestionApi.getQuestionAnswers(requestParameters),
      ...config,
    }),
  useRemoveQuestion: () =>
    useMutation(QuestionApi.deleteQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_QUESTIONS_KEY);
        queryClient.invalidateQueries(GET_QUESTION_KEY);
      },
    }),
};
