import { UseQueryOptions, useMutation, useQuery } from 'react-query';
import {
  GetQuestionAnswersRequest,
  GetQuestionModel,
  GetQuestionRequest,
  QuestionAnswerModel,
  QuestionApi,
} from 'services/api/out';
import { queryClient } from 'main';
import { GET_LESSON_QUESTION_KEY } from 'services/api/routes/lesson';

const GET_QUESTION_KEY = 'getQuestion';
export const GET_ANSWER_KEY = 'getAnswer';

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
  useGetAnswer: (
    requestParameters: GetQuestionAnswersRequest,
    config?: UseQueryOptions<QuestionAnswerModel[]>,
  ) =>
    useQuery({
      queryKey: [GET_ANSWER_KEY, requestParameters.id],
      queryFn: () => QuestionApi.getQuestionAnswers(requestParameters),
      ...config,
    }),
  useDeleteQuestion: () =>
    useMutation(QuestionApi.deleteQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUESTION_KEY);
        queryClient.invalidateQueries(GET_LESSON_QUESTION_KEY);
      },
    }),
};
