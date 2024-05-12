import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'main';
import type { AnswerModel, GetAnswerRequest } from 'services/api/out';
import { AnswerApi } from 'services/api/out';
import { GET_ANSWER_KEY } from 'services/api/routes/question';
import { GET_SECTION_LESSONS_KEY } from 'services/api/routes/section';

const GET_LESSON_KEY = 'getAnswer';

export const answerActions = {
  useAnswer: (
    requestParameters: GetAnswerRequest,
    config?: UseQueryOptions<AnswerModel>
  ) =>
    useQuery({
      queryKey: [GET_LESSON_KEY, requestParameters.id],
      queryFn: () => AnswerApi.getAnswer(requestParameters),
      ...config,
    }),
  useCreateAnswer: () =>
    useMutation(AnswerApi.registerAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_ANSWER_KEY);
      },
    }),
  useGetAnswer: () =>
    useMutation(AnswerApi.getAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useUpdateAnswer: () =>
    useMutation(AnswerApi.updateAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_ANSWER_KEY);
      },
    }),
  useRemoveAnswer: () =>
    useMutation(AnswerApi.deleteAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
};
