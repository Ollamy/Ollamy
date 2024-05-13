import { useMutation } from 'react-query';
import { queryClient } from 'main';
import { AnswerApi } from 'services/api/out';
import { GET_QUESTION_ANSWERS_KEY } from 'services/api/routes/question';

const GET_ANSWER_KEY = 'getAnswerKey';

export const answerActions = {
  useCreateAnswer: () =>
    useMutation(AnswerApi.registerAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUESTION_ANSWERS_KEY);
        queryClient.invalidateQueries(GET_ANSWER_KEY);
      },
    }),
  useUpdateAnswer: () =>
    useMutation(AnswerApi.updateAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUESTION_ANSWERS_KEY);
      },
    }),
  useRemoveAnswer: () =>
    useMutation(AnswerApi.deleteAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUESTION_ANSWERS_KEY);
      },
    }),
};
